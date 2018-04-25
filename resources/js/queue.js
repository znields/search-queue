/* Queue.js contains all of the functions that are solely used on the queue.html page. */

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
    chrome.storage.local.get('searchCount', function (items)
    {
        // iterates over the search
        for (let i = 0; i < searches.length; i++)
        {
            // adds each search to the search queue
            add(searches[i], i + 1 + items['searchCount']);
        }

        //
        chrome.storage.local.set({'searchCount': items['searchCount'] + searches.length});
    });


    // resets the import text area to contain no text
    document.getElementById('import-text').value = "";

    // waits for 1000 milliseconds, then saves the items that have been imported
    setTimeout(save, 1000);
}

// saves the prepended and appended phrases, as well as all terms
function save()
{
    // retrieves the user entered search terms from queue.html
    const searches = document.getElementsByClassName('search-term');

    // adds prepend, append, and searchCount to the packet for saving
    const packet = {};
    packet['prepend'] = document.getElementById('prepend').value;
    packet['append'] = document.getElementById('append').value;
    packet['searchCount'] = searches.length;

    // iterates over the search terms
    for (let i = 0; i < searches.length; i++)
    {
        // adds each search term to the packet
        packet['search' + i] =  searches[i].value;
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

    // clears append and prepend phrases from queue.html
    document.getElementById('append').value = "";
    document.getElementById('prepend').value = "";

    // clears all items from storage
    chrome.storage.local.clear();

    // resets search count and index values in storage
    chrome.storage.local.set({'searchCount': 0, 'index': 0});
}

// removes the last term from the search queue
function remove(i)
{
    // retrieves all term divs from queue.html
    const searchContainers = document.getElementsByClassName('search-container');

    // if the function is called from the remove button, set i to the number of terms
    if (typeof i === "object")
    {
        i = searchContainers.length;
    }

    // removes the last search term from the list of terms
    searchContainers[0].parentNode.removeChild(searchContainers[i - 1]);

    // creates a variable with the name of the search term
    const searchName = 'search' + searchContainers.length;

    // removes the search term from storage
    chrome.storage.local.remove(searchName);

    // retrieves the number of searches and the search term variable from storage
    chrome.storage.local.get('searchCount', function (items)
    {
        // saves the deletion to the search queue
        chrome.storage.local.set({'searchCount': items['searchCount'] - 1});
    });
}

// adds a new search term
function add(term, i)
{
    // retrieves the number of searches from storage and passes it into function
    chrome.storage.local.get('searchCount', function (items)
    {
        // creates a div to contain search term and number
        const container = document.createElement('div');
        container.classList.add('search-container');

        // creates a p to display each term
        const text = document.createElement('p');
        text.classList.add('input-title');
        text.innerText = i === undefined ? "Search " + (items['searchCount'] + 1) : "Search " + i;

        // creates an input term
        const input = document.createElement('input');
        input.classList.add('search-term');
        input.type = 'text';
        input.addEventListener('change', save);
        input.value = typeof term === 'object' ? "" : term;

        // appends the search items to div
        container.appendChild(text);
        container.appendChild(input);

        // appends div to the searches list
        document.getElementById('search-container').appendChild(container);

        // if the function was called from the + button
        if (i === undefined)
        {
            // increment search count by 1
            chrome.storage.local.set({'searchCount' : items['searchCount'] + 1});
        }

    });
}

// restores the queue editor page on load
function restore()
{
    // retrieves all items from storage and passes them into function
    chrome.storage.local.get(null, function (items)
    {
        // if the prepend variable is not undefined
        if (items['prepend'] !== undefined)
        {
            // restore the prepend phrase value to its text box
            document.getElementById('prepend').value = items['prepend'];
        }

        // if the append variable is not undefined
        if (items['append'] !== undefined)
        {
            // restore the append variable to its text box
            document.getElementById('append').value = items['append'];
        }

        // if the number of searches variable is undefined
        if (items['searchCount'] === undefined)
        {
            // set the number of searches to be zero
            chrome.storage.local.set({'searchCount': 0});
        }

        // if the index variable is undefined
        if (items['index'] === undefined)
        {
            // set the index variables to be zero
            chrome.storage.local.set({'index': 0});
        }

        // while there is another term to be loaded from storage
        let i = 0;
        while (items['search' + i] !== undefined) {

            // adds the term to queue.html
            add(items['search' + i], i + 1);

            // increments i by 1
            i += 1;
        }
    });
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the queue editor page
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('import-open').addEventListener('click', openImport);
    document.getElementById('import-save').addEventListener('click', saveImport);
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('add').addEventListener('click', add);
    document.getElementById('remove').addEventListener('click', remove);

    // links the prepend and append phrases input boxes to the save function
    document.getElementById('prepend').addEventListener('change', save);
    document.getElementById('append').addEventListener('change', save);
});

// saves the queue editor terms before closing
window.addEventListener('beforeunload', function () {save();}, false);