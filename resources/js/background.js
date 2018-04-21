/*
Background.js contains all functions that can be run at any time while Chrome is running.
Functions should be included in this file only if entirely necessary as to improve performance.
*/

// opens the queue page in a new tab
function openQueue() {
    chrome.tabs.create({'url': chrome.extension.getURL('queue.html')});
}

// sends a notification to the user given a certain message
function notify(message) {
    var options = {
        type: "basic",
        title: "Search Queue",
        message: message,
        iconUrl: "resources/images/icon.png"
    };
    chrome.notifications.create("0", options, function () {  });
}

// searches google for a given appended phrase, search term, and prepended phrase
function search(search, prepend, append) {
    var google = "https://www.google.com/search?q=";
    chrome.tabs.update({"url": google + prepend + "+" + search + "+" + append});
}

// searches the next term in the search queue
function next() {
    chrome.storage.local.get(null, function (items) {
        console.log(items["index"] + 1 + '>=' + items["numSearches"]);
        if (items["index"] + 1 >= items["numSearches"]) {
            notify("You have reached the end of your queue!")
        }
        else {
            search(items["search" + (items["index"] + 1)], items["prepend"], items["append"]);
            chrome.storage.local.set({"index": items["index"] + 1});
        }
    });
}

// searches the previous term in the search queue
function previous() {
    chrome.storage.local.get(null, function (items) {
        console.log(items["index"] + '<=' + '0');
        if (items["index"] <= 0) {
            notify("You are already at the beginning of your queue!")
        }
        else {
            search(items["search" + (items["index"] - 1)], items["prepend"], items["append"]);
            chrome.storage.local.set({"index": items["index"] - 1});
        }
    });
}

// sets up keyboard shortcuts
function command(string) {
    if (string === 'next') {
        next();
    }
    else if (string === 'previous') {
        previous();
    }
}

// open the queue editor when the extension is installed
chrome.runtime.onInstalled.addListener(function (object) {
    openQueue()
});

// sets up keyboard shortcuts
chrome.commands.onCommand.addListener(command);