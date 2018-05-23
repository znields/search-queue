/* import.js contains all of the functions that are solely used on the import.html page. */

// processes and saves the terms entered on the import page
function save()
{
    // splits up the import text by line
    const searches = document.getElementById('import-text').value.split('\n');

    // retrieves the number of searches and passes into function
    chrome.storage.local.get('search-count', function (items)
    {

        // initialize a packet with the searches to be imported
        let packet = {'search-count': items['search-count'] + searches.length};

        // iterates over the search
        for (let i = 0; i < searches.length; i++)
        {
            // adds each search to the search queue
            packet['search' + (i + 1 + items['search-count'])] = searches[i];
        }

        // save the packet to local storage
        chrome.storage.local.set(packet, function ()
        {
            // navigates the user to import.html
            chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
        });
    });
}

// cancels the import that the user selected
function cancel()
{
    // navigates the user to import.html
    chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // links the buttons on the queue editor page to their respective functions
    document.getElementById('import').addEventListener('click', save);
    document.getElementById('cancel').addEventListener('click', cancel);
});