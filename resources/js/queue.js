function import_() {

}

function clear() {
    var searches = document.getElementById("searches");
    while (searches.firstChild) {
        searches.removeChild(searches.firstChild);
    }
}

function delete_(term) {
    document.getElementById('text' + term).remove();
    document.getElementById('delete' + term).remove();
    document.getElementById('search' + term).remove();
}

function add() {
    chrome.storage.local.get(['numSearches'], function (items) {
        // If there are no items in the queue, then set numSearches to 1
        if (items.numSearches === undefined) {
            items.numSearches = 1;
        }

        // Creates a div for each term
        var div = document.createElement("div");
        div.id = "div" + items.numSearches;
        div.classList.add("termDivs");

        // Creates a p to display each term
        var text = document.createElement("p");
        text.id = "text" + items.numSearches;
        text.innerText = "Search " + items.numSearches;
        text.align = "left";
        text.fontFamily = "sans-serif";
        text.margin = "30px";
        document.getElementById("searches").appendChild(text);

        // Creates a button that can be used to delete term
        var button = document.createElement("input");
        button.id = "delete" + items.numSearches;
        button.type = 'image';
        button.align = 'left';
        button.src = "/resources/images/delete.png";
        button.width = "20";
        document.getElementById("searches").appendChild(button);

        // Creates an input term
        var input = document.createElement("input");
        input.id = 'search' + items.numSearches;
        input.type = 'text';
        input.align = 'left';

        // Adds an event listener to the delete button
        document.getElementById('delete' + items.numSearches).addEventListener('click', function () {
            delete_(items.numSearches);
        });

        // Appends the search items to div
        div.appendChild(text);
        div.appendChild(button);
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
});

