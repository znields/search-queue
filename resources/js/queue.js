/* Queue.js contains all of the functions that are solely used on the queue.html page. */

// displays the import page which allows the user to import multiple terms
function openImport()
{
    // makes the import-prompt div visible
    document.getElementById('import-prompt').style.display = "block";
}

// processes and saves the terms entered on the import page
function saveImport()
{
    // makes the import-prompt div invisible
    document.getElementById("import-prompt").style.display = "none";

    // splits up the import text by line
    const searches = document.getElementById("import-text").value.split("\n");

    // gets the number of searches and passes into function
    chrome.storage.local.get(["numSearches"], function (items)
    {
        for (let i = 0; i < searches.length; i++)
        {
            // adds each search to the search queue
            addHelper(searches[i], i + 1 + items["numSearches"]);
        }
        // saves the new number of searches to storage
        chrome.storage.local.set({"numSearches": items["numSearches"] + searches.length});
    });

    // resets the import text area to contain no text
    document.getElementById("import-text").value = "";
}

// saves the prepended and appended phrases, as well as all terms
function save()
{
    // adds prepend, append, and numSearches to the packet for saving
    const packet = {};
    packet["prepend"] = document.getElementById("prepend").value;
    packet["append"] = document.getElementById("append").value;
    packet["numSearches"] = searches.length;

    // retrieves the user entered search terms from queue.html
    const searches = document.getElementsByClassName("searches");

    // iterates over the search terms
    for (let i = 0; i < searches.length; i++)
    {
        // adds each search term to the packet
        packet["search" + i] =  searches[i].value;
    }

    // saves the packet to storage
    chrome.storage.local.set(packet);
}

// clears all queued search terms
function clear()
{
    // retrieves main div containing all search divs
    const searches = document.getElementById("searches");

    // continues until there are no more children in the main search div
    while (searches.firstChild)
    {
        // removes the first search div from the main div
        searches.removeChild(searches.firstChild);
    }

    // saves the new configuration
    save();
}

// removes the last term from the search queue
function remove()
{
    // retrieves all term divs from queue.html
    const termDivs = document.getElementsByClassName("termDivs");

    // removes the last search term from the list of terms
    termDivs[0].parentNode.removeChild(termDivs[termDivs.length - 1]);

    // creates a variable with the name of the search term
    const searchName = "search" + termDivs.length;

    // retrieves the number of searches and the search term variable from storage
    chrome.storage.local.get(["numSearches", searchName], function (items)
    {
        // creates packet of data to be saved
        const packet = {"numSearches": items.numSearches - 1};
        packet[items[searchName]] = "";

        // saves the deletion to the search queue
        chrome.storage.local.set(packet);
    });
}

// helps the add function add a new search term
function addHelper(value, i)
{
    // creates a div for each term
    const div = document.createElement("div");
    div.classList.add("termDivs");

    // creates a p to display each term
    const text = document.createElement("p");
    text.innerText = "Search " + i;
    text.margin = "30px";
    document.getElementById("searches").appendChild(text);

    // creates an input term
    const input = document.createElement("input");
    input.classList.add("searches");
    input.type = "text";
    input.value = value;
    input.addEventListener("change", save);

    // appends the search items to div
    div.appendChild(text);
    div.appendChild(input);

    // appends div to the searches list
    document.getElementById("searches").appendChild(div);
}

// adds a new search term
function add()
{
    // retrieves the number of searches from storage and passes it into function
    chrome.storage.local.get(["numSearches"], function (items)
    {
        // adds a new search term div to queue.html
        addHelper(null, items.numSearches + 1);

        // increments the number of searches variable by 1
        chrome.storage.local.set({
            "numSearches": items.numSearches + 1
        });
    });
}

// restores the queue editor page on load
function restore()
{
    // retrieves all items from storage and passes them into function
    chrome.storage.local.get(null, function (items)
    {
        // if the prepend variable is not undefined
        if (items["prepend"] !== undefined)
        {
            // restore the prepend value to its text box
            document.getElementById("prepend").value = items["prepend"];
        }

        // if the append variable is not undefined
        if (items["append"] !== undefined)
        {
            // restore the append variable to its text box
            document.getElementById("append").value = items["append"];
        }

        // if the number of searches variable is undefined
        if (items["numSearches"] === undefined)
        {
            // set the number of searches to be zero
            chrome.storage.local.set({"numSearches": 0});
        }

        // if the index variable is undefined
        if (items["index"] === undefined)
        {
            // set the index variables to be zero
            chrome.storage.local.set({"index": 0});
        }

        // for each term in storage
        for (let i = 0; i < items["numSearches"]; i++)
        {
            // restore the term to queue.html
            addHelper(items["search" + i], i + 1);
        }
    });
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the queue editor page
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('import').addEventListener('click', openImport);
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('add').addEventListener('click', add);
    document.getElementById('remove').addEventListener('click', remove);
    document.getElementById("save-import").addEventListener("click", saveImport);
});

// saves the queue editor terms before closing
window.addEventListener("beforeunload", function () {save();}, false);

