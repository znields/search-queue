/* editor.js contains all of the functions that are solely used on the editor.html page. */

// restores the queue editor page on load
function restore()
{
    // retrieves all items from storage and passes them into function
    chrome.storage.local.get(null, function (items)
    {
        const packet = {};

        // if the index has no value
        if (items['index'] === undefined)
        {
            // set the index variables to be one
            packet['index'] = 1;
        }

        // if the search engine has no value
        if (items['search-engine'] === undefined)
        {
            // set the search engine to google
            packet['search-engine'] = 'https://www.google.com/search?q=';
        }

        // set the number of searches to be zero
        packet['search-count'] = 0;

        // save the packet to storage
        chrome.storage.local.set(packet);

        // while there is another term to be loaded from storage
        let i = 1;
        while (items['search' + i] !== undefined) {

            // adds the term to editor.html
            add(items['search' + i], i);

            // increments i by 1
            i += 1;
        }

        // updates the search-count to the number of searches
        chrome.storage.local.set({'search-count' : i - 1});
    });

}

// saves the prepended and appended phrases, as well as all terms
function save()
{

    const packet = {};

    // retrieves the user entered search terms from editor.html
    const searches = document.getElementsByClassName('search-input');

    // adds prepend, append, and search-count to the packet for saving
    packet['search-count'] = searches.length;

    // iterates over the search terms
    for (let i = 0; i < searches.length; i++)
    {
        // adds each search term to the packet
        packet['search' + (i+ 1)] =  searches[i].value;
    }

    // saves the packet to storage
    chrome.storage.local.set(packet);
}

// navigates to the import page
function openImport()
{
    // navigates the user to import.html
    chrome.tabs.update({'url': chrome.extension.getURL('import.html')});
}

// navigates to the settings page
function openSettings()
{
    // makes the the settings container visible to the user
    chrome.tabs.update({'url': chrome.extension.getURL('settings.html')});
}

// clears all queued search terms
function clear()
{

    // retrieves main div containing all search divs
    const searches = document.getElementById('container-search');

    // continues until there are no more children in the main search div
    while (searches.firstChild)
    {
        // removes the first search div from the main div
        searches.removeChild(searches.firstChild);
    }

    // clears all items from storage
    chrome.storage.local.clear();

    // resets search count and index values in storage
    chrome.storage.local.set({'search-count': 0, 'index': 1});
}

// removes the term at the ith index from the search queue
function remove(i)
{
    // retrieves all term divs from editor.html
    const searchContainers = document.getElementsByClassName('container-search');

    // removes the last search term from the list of terms
    searchContainers[0].parentNode.removeChild(document.getElementById('container-search-' + i));

    // retrieves the number of searches and the search term variable from storage
    chrome.storage.local.get('search-count', function (items)
    {
        // saves the deletion to the search queue
        chrome.storage.local.set({'search-count': items['search-count'] - 1});
        chrome.storage.local.remove('search' + items['search-count']);
    });

    // adjusts the term numbers so that they are in order
    adjustTermNumbers();

    // saves the current terms to the database
    save();

}

// adds a new search term
function add(term, i)
{
    // retrieves the number of searches from storage and passes it into function
    chrome.storage.local.get('search-count', function (items)
    {

        // defines a boolean as to whether a button pressed is causing the add
        const button_pressed = i === undefined;

        // defines i depending on whether a button press took place
        i = i === undefined ? (items['search-count'] + 1) : i;

        // creates a div to contain search term and number
        const container = document.createElement('div');
        container.classList.add('container-search');
        container.id = 'container-search-' + i;
        container.draggable = true;
        addDragHandlers(container);

        // create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button-delete');
        deleteButton.id = 'button-delete-' + i;
        deleteButton.innerText = i;
        deleteButton.addEventListener('click', function () {remove(i);});

        // creates an input term
        const input = document.createElement('input');
        input.classList.add('search-input');
        input.type = 'text';
        input.addEventListener('change', save);
        input.value = typeof term === 'object' ? "" : term;

        // appends the search items to div
        container.appendChild(deleteButton);
        container.appendChild(input);

        // appends div to the searches list
        const searchContainer = document.getElementById('container-search');
        searchContainer.insertBefore(container, searchContainer.children[i - 1]);

        if (button_pressed)
        {
            // increment search count by 1
            chrome.storage.local.set({'search-count' : items['search-count'] + 1});

            // sets the focus to the most recently added term
            input.focus();
            input.select();
        }

        // saves the new configuration
        save();

    });
}

// adjusts the term numbers to be in order
function adjustTermNumbers()
{
    // retrieve all delete buttons
    const deleteTermButtons = document.getElementsByClassName('button-delete');

    // iterate over all of the delete buttons
    for (let i = 0; i < deleteTermButtons.length; i++)
    {
        // change the inner text to match the ordering of the buttons
        deleteTermButtons[i].innerText = i + 1;
    }
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the queue editor page
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('import-open').addEventListener('click', openImport);
    document.getElementById('settings').addEventListener('click', openSettings);
    document.getElementById('add-term').addEventListener('click', add);
});

// saves the queue editor terms before closing
window.addEventListener('beforeunload', save, false);

/* This portion of editor.js allows the search terms to be rearranged. */


// initializes a variable that keeps track of which element is being dragged
let draggedDiv = null;

// runs when a div is picked up
function handleDragStart(e)
{
    // sets the dragged div to the drag div variable
    draggedDiv = this;

    // marks the data transfer as a move rather than a copy
    e.dataTransfer.effectAllowed = 'move';
}

// runs when an element is dragged over another element
function handleDragOver(e)
{
    // allows the user to drop the element
    if (e.preventDefault)
    {
        e.preventDefault();

        // marks the element as being dragged over
    }

    if (draggedDiv !== this)
    {
        this.classList.add("dragged-over");
    }

    return false;
}

// runs when the user drags an element away
function handleDragLeave()
{
    // marks the element as no longer being dragged over
    this.classList.remove('dragged-over');
}

// runs when an element is dropped
function handleDrop()
{
    // if the element is dropped in a different area
    if (draggedDiv !== this)
    {
        this.classList.remove('dragged-over');

        draggedDiv.parentNode.insertBefore(draggedDiv, this);

        adjustTermNumbers();

        save();

    }

    return false;
}

// adds the drag and drop handlers to an element
function addDragHandlers(elem)
{
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragleave', handleDragLeave, false);

}

// function startIntro()
// {
//
//     // starts introducing the user to the software
//     const intro = introJs();
//
//     intro.setOptions({showBullets:false, overlayOpacity:0.1});
//
//     document.getElementById('import-open').addEventListener('click', nextStep);
//
//     intro.onexit(function () {document.getElementById('import-open').removeEventListener('click', nextStep);});
//
//     intro.addSteps([
//         {
//             intro: "Welcome to Search Queue! Let's do a quick test drive.",
//             step: 1
//         },
//         {
//             element: document.getElementById('import-open'),
//             intro: "Click here to import terms.",
//             step: 2
//         },
//         {
//             element: document.getElementById('import-text'),
//             intro: "Enter the searches you would like to make seperated by new lines.",
//             step: 3
//         }
//     ]);
//
//     intro.start();
//
//
//     function nextStep() {
//         intro.nextStep();
//     }
//
// }