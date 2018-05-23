/* settings.js contains all of the functions that are solely used on the settings.html page. */

// restore the user's previous settings
function restore()
{
    chrome.storage.local.get(['prepend-constant', 'append-constant', 'search-engine'], function (items)
    {
        // restore the constant prepended and appended values
        document.getElementById('prepend-constant').value = items['prepend-constant'];
        document.getElementById('append-constant').value = items['append-constant'];

        // restore the search engine selector
        document.getElementById('search-engine-selector').value = items['search-engine'];
    });

}

// saves the settings that the user entered
function save()
{
    // initializes a packet to be saved
    let packet = {};

    // retrieves the search engine type select
    const searchEngineSelect = document.getElementById('search-engine-selector');

    // retrieves the constant phrases from editor.html
    const constantPhrases = document.getElementsByClassName('input-text');

    // adds the selected option to the packet to be saved
    packet['search-engine'] = searchEngineSelect.options[searchEngineSelect.selectedIndex].value;

    // adds the prepended and appended phrases to the packet
    packet['prepend-constant'] = constantPhrases[0].value;
    packet['append-constant'] = constantPhrases[1].value;


    // save the packet to local storage
    chrome.storage.local.set(packet, function ()
    {
        // navigates the user to import.html
        chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
    });
}

// don't save the input and return to the editor
function cancel()
{
    chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the page with the user's settings
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('save').addEventListener('click', save);
    document.getElementById('cancel').addEventListener('click', cancel);
});