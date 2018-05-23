document.getElementById('import-save').addEventListener('click', saveImport);

document.getElementById('import-cancel').addEventListener('click', cancelImport);


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

    // waits for 100 milliseconds, then saves the items that have been imported
    setTimeout(save, 100);
}

// cancels the import that the user selected
function cancelImport()
{
    // makes the import container invisible to the user
    document.getElementById('import-container').style.display = 'none';

    // resets the import text area to contain no text
    document.getElementById('import-text').value = "";
}