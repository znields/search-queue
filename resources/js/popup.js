function openQueue() {
    chrome.tabs.create({'url': chrome.extension.getURL('queue.html')});
}

function generateSearch(beginPhrase, xPhrase, endPhrase, indexPhrase) {
    var google = "https://www.google.com/search?q=";
    var phrases = xPhrase.replace(' ', '+').split(',');
    return google + beginPhrase + "+" + phrases[indexPhrase] + "+" + endPhrase;
}

function notify(message) {
    var options = {
        type: "basic",
        title: "Search Queue",
        message: message,
        iconUrl: "resources/images/icon.png"
    };
    chrome.notifications.create("0" ,options, function () {  });
}

function start() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: '',
        indexPhrase: 1
    }, function (items) {
        var term = generateSearch(items.beginPhrase, items.xPhrase, items.endPhrase, items.indexPhrase - 1);
        chrome.tabs.update({'url': term});
    });
}

function next() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: '',
        indexPhrase: 1
    }, function (items) {
        if (parseInt(items.indexPhrase) >= items.xPhrase.split(',').length) {
            notify("You have reached the end of your queue!");
        }
        else {
            chrome.storage.sync.set({
                indexPhrase: parseInt(items.indexPhrase) + 1
            }, function () {
                var term = generateSearch(items.beginPhrase, items.xPhrase, items.endPhrase, items.indexPhrase);
                chrome.tabs.update({'url': term});
            });
        }
    });
}

function previous() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: '',
        indexPhrase: 1
    }, function (items) {
        if (parseInt(items.indexPhrase) <= 1) {
            notify("You are already at the beginning of your queue!");
        }
        else {
            chrome.storage.sync.set({
                indexPhrase: parseInt(items.indexPhrase) - 1
            }, function () {
                var term = generateSearch(items.beginPhrase, items.xPhrase, items.endPhrase, items.indexPhrase - 2);
                chrome.tabs.update({'url': term});
            });
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

chrome.commands.onCommand.addListener(command);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('edit').addEventListener('click', openQueue);

});