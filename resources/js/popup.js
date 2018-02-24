function openHelp() {
    chrome.tabs.create({'url': 'https://github.com/isaiahnields/SearchQueue'});
}

function start() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: '',
        indexPhrase: 1
    }, function (items) {
        if (items.xPhrase === '') {
            notify("Your queue is empty! Please add items to queue with the queue editor.")
        }
        else {
            var term = generateSearch(items.beginPhrase, items.xPhrase, items.endPhrase, items.indexPhrase - 1);
            chrome.tabs.update({'url': term});
        }

    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('edit').addEventListener('click', openQueue);
    document.getElementById('help').addEventListener('click', openHelp);
});