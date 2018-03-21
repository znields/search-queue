function openQueue() {
    chrome.tabs.create({'url': chrome.extension.getURL('queue.html')});
}

function notify(message) {
    var options = {
        type: "basic",
        title: "Search Queue",
        message: message,
        iconUrl: "resources/images/icon.png"
    };
    chrome.notifications.create("0", options, function () {  });
}

function search(search, prepend, append) {
    var google = "https://www.google.com/search?q=";
    chrome.tabs.update({"url": google + prepend + "+" + search + "+" + append});
}

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

function command(string) {
    if (string === 'next') {
        next();
    }
    else if (string === 'previous') {
        previous();
    }
}

chrome.runtime.onInstalled.addListener(function (object) {
    openQueue()
});

chrome.commands.onCommand.addListener(command);