/* Popup.js contains all functions that are solely required on the popup.html page. */

// opens the help page on GitHub
function openHelp() {
    chrome.tabs.create({'url': 'https://github.com/isaiahnields/SearchQueue'});
}

// creates a Google search for the current search term
function start() {
    chrome.storage.local.get(null, function (items) {
        search(items["search" + items["index"]], items["prepend"], items["append"]);
    });
}
// adds event listeners to buttons
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('edit').addEventListener('click', openQueue);
    document.getElementById('help').addEventListener('click', openHelp);
});