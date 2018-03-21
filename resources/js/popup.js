function openHelp() {
    chrome.tabs.create({'url': 'https://github.com/isaiahnields/SearchQueue'});
}

function start() {

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('previous').addEventListener('click', previous);
    document.getElementById('edit').addEventListener('click', openQueue);
    document.getElementById('help').addEventListener('click', openHelp);
});