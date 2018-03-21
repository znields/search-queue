function openHelp() {
    chrome.tabs.create({'url': 'https://github.com/isaiahnields/SearchQueue'});
}

function start() {
    chrome.storage.local.get(null, function (items) {
        search(items["search" + items["index"]], items["prepend"], items["append"]);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('edit').addEventListener('click', openQueue);
    document.getElementById('help').addEventListener('click', openHelp);
});