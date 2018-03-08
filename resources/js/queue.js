function import_() {

}

function clear() {
    var searches = document.getElementById("searches");
    while (searches.firstChild) {
        searches.removeChild(searches.firstChild);
    }
    chrome.storage.local.set({"numSearches": 1});
}

function remove() {
    var termDivs = document.getElementsByClassName("termDivs");
    termDivs[0].parentNode.removeChild(termDivs[termDivs.length - 1]);

    chrome.storage.local.get(["numSearches"], function (items) {
        chrome.storage.local.set({
            "numSearches": items.numSearches - 1
        });
    });

}

function add() {
    chrome.storage.local.get(['numSearches'], function (items) {
        // If there are no items in the queue, then set numSearches to 1
        if (items.numSearches === undefined) {
            items.numSearches = 1;
        }

        // Creates a div for each term
        var div = document.createElement("div");
        div.classList.add("termDivs");

        // Creates a p to display each term
        var text = document.createElement("p");
        text.innerText = "Search " + items.numSearches;
        text.align = "left";
        text.margin = "30px";
        document.getElementById("searches").appendChild(text);

        // Creates an input term
        var input = document.createElement("input");
        input.classList.add("searches");
        input.type = 'text';
        input.align = 'left';

        // Appends the search items to div
        div.appendChild(text);
        div.appendChild(input);

        // Appends div to the searches list
        document.getElementById("searches").appendChild(div);

        // Increments numSearches by 1
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
    document.getElementById('remove').addEventListener('click', remove);
});

