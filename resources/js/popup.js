/* Popup.js contains all functions that are solely required on the popup.html page. */

// opens the help page on GitHub
function openHelp()
{
    // opens the help page on GitHub
    chrome.tabs.create({'url': "https://github.com/isaiahnields/SearchQueue"});
}

// adds an overlay that allows the user to view the queue
function viewQueue()
{
    // makes the queue view visible to the user
    document.getElementById('queue-view').style.display = 'block';

    // restore the terms to the view queue
    restore();

    // retrieves the current search index
    chrome.storage.local.get('index', function (items) {

        // scrolls to the item at the current search index
        document.getElementById('search' + items['index']).scrollIntoView();
    });
}

// goes back to the main page of popup.html
function back()
{
    // retrieves the search terms div that contains all search terms
    const searchTerms = document.getElementById('search-terms');

    // makes the queue view invisible to the user
    document.getElementById('queue-view').style.display = 'none';

    // removes the search terms from the queue view
    while (searchTerms.firstChild)
    {
        // removes the first search div from the main div
        searchTerms.removeChild(searchTerms.firstChild);
    }
}

// adds the search term to view queue page
function add(term, i)
{
        // creates a div for each term
        const div = document.createElement('div');
        div.classList.add('button');
        div.id = 'search' + i;
        div.addEventListener('click', function () {jump(i);});

        // creates a p to display each term
        const text = document.createElement('p');
        text.innerText = term;
        text.style.margin = '0px';
        div.appendChild(text);

        // appends the search term text to div
        div.appendChild(text);

        // appends div to the searches list
        document.getElementById('search-terms').appendChild(div);
}

function jump(i)
{
    // retrieves the search term and passed into function
    chrome.storage.local.get(['search' + i, 'append', 'prepend'], function (items)
    {
        // searches for the search term
        search(items['search' + i], items['prepend'], items['append']);
    });

    // sets the index value to the value that was just browsed
    chrome.storage.local.set({'index' : i});
}

// restores the queue editor page on load
function restore()
{
    // retrieves all items from storage and passes them into function
    chrome.storage.local.get(null, function (items)
    {
        // for each term in storage
        for (let i = 1; i <= items['search-count']; i++)
        {
            // restore the term to editor.html
            add(items['search' + i], i);
        }
    });
}

// adds event listeners to buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // adds event listeners to each button
    document.getElementById('back').addEventListener('click', back);
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('view').addEventListener('click', viewQueue);
    document.getElementById('edit').addEventListener('click', openEditor);
    document.getElementById('search-all').addEventListener('click', searchAll);
    document.getElementById('help').addEventListener('click', openHelp);
});