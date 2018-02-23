function openQueue() {
    chrome.tabs.create({'url': chrome.extension.getURL('queue.html')});
}

function next() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: ''
    }, function (items) {
        document.getElementById('beginprhase').value = items.beginPhrase;
        document.getElementById('xphrase').value = items.xPhrase;
        document.getElementById('endphrase').value = items.endPhrase;
    });
}

function previous() {

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('edit').addEventListener('click', openQueue);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('next').addEventListener('click', next);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('previous').addEventListener('click', previous);
});