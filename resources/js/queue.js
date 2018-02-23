function save_options() {
    chrome.storage.sync.set({
        beginPhrase: document.getElementById('beginprhase').value,
        xPhrase: document.getElementById('xphrase').value,
        endPhrase: document.getElementById('endphrase').value,
        indexPhrase: document.getElementById('indexphrase').value
    });
}

function restore_options() {
    chrome.storage.sync.get({
        beginPhrase: '',
        xPhrase: '',
        endPhrase: '',
        indexPhrase: 1
    }, function (items) {
        document.getElementById('beginprhase').value = items.beginPhrase;
        document.getElementById('xphrase').value = items.xPhrase;
        document.getElementById('endphrase').value = items.endPhrase;
        document.getElementById('indexphrase').value = items.indexPhrase;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

window.onload = function () {
    document.getElementById('save').addEventListener('click', save_options);
}

