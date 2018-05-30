/*
Background.js contains all functions that can be run at any time while Chrome is running.
Functions should be included in this file only if entirely necessary as to improve performance.
*/

// opens the queue page in a new tab
function openEditor()
{
    // creates a new tab and loads editor.html
    chrome.tabs.create({'url': chrome.extension.getURL('editor.html')});
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
    chrome.notifications.create("0", options);

    window.setTimeout(function () {chrome.notifications.clear("0");}, 2000);
}

// searches google for a given appended phrase, search term, and prepended phrase
function search(term, newTab)
{
    // retrieves the search engine value from storage
    chrome.storage.local.get(['search-engine', 'append-constant', 'prepend-constant'], function (items)
    {
        // initializes the search variable as the user's engine of choice
        var search = items['search-engine'];

        // if the prepended constant is not null, append it to the search
        if (items['prepend-constant']) search += items['prepend-constant'] + '+';

        // append the search term to the search
        search += term;

        // if the appended constant is not null, append it to the search
        if (items['append-constant']) search += '+' + items['append-constant'];

        // make the search
        if (newTab) chrome.tabs.create({"url": search});
        else chrome.tabs.update({"url": search});
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
            search(items['search' + items['index']], true);
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

// adds a search term to storage directly
function addBackground(term)
{
    // retrieves the number of searches in the queue
    chrome.storage.local.get('search-count', function (items) {

        // constructs search term number with related term
        let packet = {};
        packet['search' + (items['search-count'] + 1)] = term;
        packet['search-count'] = items['search-count'] + 1;

        // add the search term to storage
        chrome.storage.local.set(packet);
    });
}

// open the queue editor when the extension is installed
chrome.runtime.onInstalled.addListener(function (details)
{
    // if the user just installed the programm
    if (details.reason === "install") {
        // initialize the packet that will contain the initial settings
        let packet = {};

        // set set the initial settings
        packet['search-engine'] = 'https://www.google.com/search?q=';
        packet['prepend-constant'] = "";
        packet['append-constant'] = "";
        packet['index'] = 1;
        packet['search-count'] = 0;
        packet['intro-step'] = 1;

        // save the packet to storage and then opens the
        chrome.storage.local.set(packet, openEditor);

        // add the right click option to add to queue
        chrome.contextMenus.create({id: '1', title: "Add '%s' to the Queue", contexts: ['selection']});
    }
    else if (details.reason === "update")
    {
        // add the right click option to add to queue
        chrome.contextMenus.create({id: '1', title: "Add '%s' to the Queue", contexts: ['selection']});
    }
});

// adds a listener for keyboard shortcuts
chrome.commands.onCommand.addListener(function (command_) {
    command(command_);
});

// adds a listener for right click add to queue button
chrome.contextMenus.onClicked.addListener(function (info) {addBackground(info['selectionText'])});


