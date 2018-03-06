function import_() {

}

function clear() {

}

function add() {
    chrome.storage.local.get(['numSearches'], function (items) {
        if (items.numSearches === undefined) {
            items.numSearches = 1;
        }
        var text = document.createElement("p");
        text.innerText = "Search " + items.numSearches;
        text.align = "left";
        text.fontFamily = "sans-serif";
        text.margin = "30px";
        document.getElementById("searches").appendChild(text);

        var button = document.createElement("input");
        button.id = "delete" + items.numSearches;
        button.type = 'image';
        button.align = 'left';
        button.src = "/resources/images/delete.png";
        button.width = "20";
        document.getElementById("searches").appendChild(button);

        var input = document.createElement("input");
        input.id = 'search' + items.numSearches;
        input.type = 'text';
        input.align = 'left';
        document.getElementById("searches").appendChild(input);

        chrome.storage.local.set({
            "numSearches": items.numSearches + 1
        });
    });


}

function restore() {
    chrome.storage.local.set({"numSearches": 1});

}

document.addEventListener('DOMContentLoaded', function () {
    restore();
    document.getElementById('import').addEventListener('click', import_);
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('add').addEventListener('click', add);
});

