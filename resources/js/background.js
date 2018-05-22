/*
Background.js contains all functions that can be run at any time while Chrome is running.
Functions should be included in this file only if entirely necessary as to improve performance.
*/

// opens the queue page in a new tab
function openQueue()
{
    // creates a new tab and loads queue.html
    chrome.tabs.update({'url': chrome.extension.getURL('queue.html')});
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

// searches google for a given appended phrase, search term, and prepended phrase
function search(term)
{
    // retrieves the search engine value from storage
    chrome.storage.local.get(['search-engine', 'appended-constant', 'prepended-constant'], function (items)
    {
        // initializes the search variable as the user's engine of choice
        var search = items['search-engine'];

        // if the prepended constant is not null, append it to the search
        if (items['prepended-constant']) search += items['prepended-constant'] + '+';

        // append the search term to the search
        search += term;

        // if the appended constant is not null, append it to the search
        if (items['appended-constant']) search += '+' + items['appended-constant'];

        // updates the current tab to load the search
        chrome.tabs.update({"url": search});
    });
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

// searches the next term in the search queue
function next()
{
    // loads all items from storage
    chrome.storage.local.get(null, function (items)
    {

        // if the index value is at the last value in the queue
        if (items["index"] >= items["search-count"])
        {
            // alert the user that they are at the end of the queue
            notify("You have reached the end of your queue!")
        }
        else
        {
            // search the next search term with google search
            search(items["search" + (items["index"] + 1)]);

            // increment the index value by 1
            chrome.storage.local.set({"index": items["index"] + 1});
        }
    });
}

// searches the previous term in the search queue
function previous()
{
    // loads all items from storage
    chrome.storage.local.get(null, function (items)
    {
        // if index is less than or equal to zero
        if (items["index"] <= 1)
        {
            // alert the user that they are at the beginning of the queue
            notify("You are already at the beginning of your queue!")
        }
        else {
            // search the previous search term with google search
            search(items["search" + (items["index"] - 1)]);

            // decrement the index value by 1
            chrome.storage.local.set({"index": items["index"] - 1});
        }
    });
}

// sets up keyboard shortcuts
function command(string)
{
    // if the keyboard shortcut indicates next
    if (string === 'next')
    {
        // search the next search term
        next();
    }

    // if the keyboard shortcut indicates previous
    else if (string === 'previous')
    {
        // search the previous search term
        previous();
    }
}

// open the queue editor when the extension is installed
chrome.runtime.onInstalled.addListener(function ()
{
    // opens queue.html
    openQueue();

    // starts introducing the user to the software
    introJs().start();
});

// adds a listener for keyboard shortcuts
chrome.commands.onCommand.addListener(function (command_) {
    command(command_);
});