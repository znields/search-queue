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

    // display the keyboard shortcuts
    chrome.commands.getAll(function (commands) {

        // restore the text of the keyboard shortcuts to their proper containers
        document.getElementById('next-keyboard-shortcut').innerText = commands[1]['shortcut'];
        document.getElementById('previous-keyboard-shortcut').innerText = commands[2]['shortcut'];

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

function editShortcuts()
{
    // navigates the user to the page to edit shortcuts
    chrome.tabs.create({'url': 'chrome://extensions/shortcuts'});
}

function resetIntro()
{
    chrome.storage.local.set({'intro-step': 1}, save);
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // restores the page with the user's settings
    restore();

    // links the buttons on the queue editor page to their respective functions
    document.getElementById('save').addEventListener('click', save);
    document.getElementById('cancel').addEventListener('click', cancel);
    document.getElementById('edit-keyboard-shortcuts').addEventListener('click', editShortcuts)
    document.getElementById('restart-introduction').addEventListener('click', resetIntro);

    // if the intro step is 4, run the settings intro
    chrome.storage.local.get('intro-step', function(items) {
        if (items['intro-step'] === 4)
        {
            intro4();
        }
        else
        {
            chrome.storage.local.set({'intro-step': -1});
        }
    });
});

// the fourth step of the introduction
function intro4()
{
    let intro = introJs();
    intro.setOptions({overlayOpacity: 0.2, showStepNumbers: false, showBullets: false, hideNext: true, hidePrev: true});
    intro.onexit(function () {chrome.tabs.getSelected(null, function(tab) {chrome.tabs.reload(tab.id);});});
    window.setTimeout(function () {
        intro.addSteps([
            {
                element: document.getElementById('prepend-constant'),
                intro: "Enter a prepended constant. This phrase will be added to beginning of every search."
            },
            {
                element: document.getElementById('append-constant'),
                intro: "Enter an appended constant. This phrase will be added to the end of every search."
            },
            {
                element: document.getElementById('search-engine-container'),
                intro: "Select the search engine you would like to use."
            },
            {
                element: document.getElementById('next-keyboard-shortcut-container'),
                intro: "In order to make the next search in the queue, you can use this keyboard shortcut."
            },
            {
                element: document.getElementById('previous-keyboard-shortcut-container'),
                intro: "In order to make the previous search in the queue, you can use this keyboard shortcut."
            },
            {
                element: document.getElementById('save'),
                intro: "Click the save button."
            }
        ]);
        intro.start();
    }, 200);
    chrome.storage.local.set({'intro-step': 5});
}