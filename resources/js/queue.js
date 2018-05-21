/* queue.js contains all of the functions that are solely used on the queue.html page. */

// displays the import page which allows the user to import multiple terms
function openImport()
{
    // makes the the import container visible to the user
    document.getElementById('import-container').style.display = 'block';
}

// processes and saves the terms entered on the import page
function saveImport()
{
    // makes the import container invisible to the user
    document.getElementById('import-container').style.display = 'none';

    // splits up the import text by line
    const searches = document.getElementById('import-text').value.split('\n');

    // retrieves the number of searches and passes into function
    chrome.storage.local.get('search-count', function (items)
    {
        // iterates over the search
        for (let i = 0; i < searches.length; i++)
        {
            // adds each search to the search queue
            add(searches[i], i + 1 + items['search-count']);
        }

        // increments the search count by the number of terms added
        chrome.storage.local.set({'search-count': items['search-count'] + searches.length});
    });


    // resets the import text area to contain no text
    document.getElementById('import-text').value = "";

    // waits for 1000 milliseconds, then saves the items that have been imported
    setTimeout(save, 1000);
}

// cancels the import that the user selected
function cancelImport()
{
    // makes the import container invisible to the user
    document.getElementById('import-container').style.display = 'none';

    // resets the import text area to contain no text
    document.getElementById('import-text').value = "";
}

// saves the prepended and appended phrases, as well as all terms
function save()
{
    // retrieves the user entered search terms from queue.html
    const searches = document.getElementsByClassName('search-term');

    // adds prepend, append, and search-count to the packet for saving
    const packet = {};
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

// clears all queued search terms
function clear()
{
    // retrieves main div containing all search divs
    const searches = document.getElementById('search-container');

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
    // retrieves all term divs from queue.html
    const searchContainers = document.getElementsByClassName('search-container');

    // removes the last search term from the list of terms
    searchContainers[0].parentNode.removeChild(document.getElementById('search-container-' + i));

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
        container.classList.add('search-container');
        container.id = 'search-container-' + i;
        container.draggable = true;
        addDragHandlers(container);

        // create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-term-button');
        deleteButton.id = 'delete-term-button-' + i;
        deleteButton.innerText = i;
        deleteButton.addEventListener('click', function () {remove(i);});

        // creates an input term
        const input = document.createElement('input');
        input.classList.add('search-term');
        input.type = 'text';
        input.addEventListener('change', save);
        input.value = typeof term === 'object' ? "" : term;

        // appends the search items to div
        container.appendChild(deleteButton);
        container.appendChild(input);

        // appends div to the searches list
        const searchContainer = document.getElementById('search-container');
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

// restores the queue editor page on load
function restore()
{
    // retrieves all items from storage and passes them into function
    chrome.storage.local.get(null, function (items)
    {
        // set the number of searches to be zero
        chrome.storage.local.set({'search-count': 0});

        // if the index variable is undefined
        if (items['index'] === undefined)
        {
            // set the index variables to be zero
            chrome.storage.local.set({'index': 1});
        }

        // while there is another term to be loaded from storage
        let i = 1;
        while (items['search' + i] !== undefined) {

            // adds the term to queue.html
            add(items['search' + i], i);

            // increments i by 1
            i += 1;
        }

        // updates the search-count to the number of searches
        chrome.storage.local.set({'search-count' : i - 1});
    });
}

// adjusts the term numbers to be in order
function adjustTermNumbers()
{
    // retrieve all delete buttons
    const deleteTermButtons = document.getElementsByClassName('delete-term-button');

    // iterate over all of the delete buttons
    for (let i = 0; i < deleteTermButtons.length; i++)
    {
        // change the inner text to match the ordering of the buttons
        deleteTermButtons[i].innerText = i + 1;
    }
}

// creates a Google search for the current search term
function start()
{
    // retrieves all items from storage
    chrome.storage.local.get(null, function (items) {

        // if the number of search terms is not zero
        if (items['search-count'] !== 0)
        {
            // search the term at the current index
            search(items['search' + items['index']]);
        }
        else
        {
            // alert the user that they have no searches in the queue
            notify("You have no items in the queue!")
        }
    });
}

// searches the term of interest
function search(search)
{
    // creates a constant for the google search
    const google = "https://www.google.com/search?q=";

    // updates the current tab to load the google search
    chrome.tabs.update({"url": google + search});
}

// sends a notification to the user given a certain message
function notify(message)
{
    // sets up the notification options
    const options = {
        type: "basic",
        title: "Search Queue",
        message: message,
        iconUrl: "resources/images/icon.png"
    };

    // alert the user with the notification
    chrome.notifications.create("0", options, function() {});
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the queue editor page
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('import-open').addEventListener('click', openImport);
    document.getElementById('import-save').addEventListener('click', saveImport);
    document.getElementById('import-cancel').addEventListener('click', cancelImport);
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('add-term').addEventListener('click', add);
    document.getElementById('start').addEventListener('click', start);
});

// saves the queue editor terms before closing
window.addEventListener('beforeunload', save, false);

/* This portion of queue.js allows the search terms to be rearranged. */

// initializes a variable that keeps track of which element is being dragged
var draggedDiv = null;

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
function handleDragLeave(e)
{
    // marks the element as no longer being dragged over
    this.classList.remove('dragged-over');
}

// runs when an element is dropped
function handleDrop(e)
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