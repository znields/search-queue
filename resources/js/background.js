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
function search(search, prepend, append)
{
    // creates a constant for the google search
    const google = "https://www.google.com/search?q=";

    // updates the current tab to load the google search
    chrome.tabs.update({"url": google + prepend + "+" + search + "+" + append});
}

// searches the next term in the search queue
function next()
{
    // loads all items from storage
    chrome.storage.local.get(null, function (items)
    {

        // if the index value is at the last value in the queue
        if (items["index"] + 1 >= items["searchCount"])
        {
            // alert the user that they are at the end of the queue
            notify("You have reached the end of your queue!")
        }
        else
        {
            // search the next search term with google search
            search(items["search" + (items["index"] + 1)], items["prepend"], items["append"]);

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
        if (items["index"] <= 0)
        {
            // alert the user that they are at the beginning of the queue
            notify("You are already at the beginning of your queue!")
        }
        else {
            // search the previous search term with google search
            search(items["search" + (items["index"] - 1)], items["prepend"], items["append"]);

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
    openQueue()
});

// adds a listener for keyboard shortcuts
chrome.commands.onCommand.addListener(function (command_) {
    command(command_);
});