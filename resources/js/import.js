/* import.js contains all of the functions that are solely used on the import.html page. */

// processes and saves the terms entered on the import page
function save()
{
    // splits up the import text by line
    const searches = document.getElementById('import-text').value.split('\n');

    // retrieves the number of searches and passes into function
    chrome.storage.local.get('search-count', function (items)
    {

        // initialize a packet with the searches to be imported
        let packet = {'search-count': items['search-count'] + searches.length};

        // iterates over the search
        for (let i = 0; i < searches.length; i++)
        {
            // adds each search to the search queue
            packet['search' + (i + 1 + items['search-count'])] = searches[i];
        }

        // save the packet to local storage
        chrome.storage.local.set(packet, function ()
        {
            // navigates the user to import.html
            chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
        });
    });
}

// cancels the import that the user selected
function cancel()
{
    // navigates the user to import.html
    chrome.tabs.update({'url': chrome.extension.getURL('editor.html')});
}

// restores queue editor page and links functions to their buttons
document.addEventListener('DOMContentLoaded', function ()
{
    // links the buttons on the queue editor page to their respective functions
    document.getElementById('import').addEventListener('click', save);
    document.getElementById('cancel').addEventListener('click', cancel);

    // run the second step of the introduction, if the intro is running
    chrome.storage.local.get('intro-step', function (items)
    {
        if (items['intro-step'] === 2)
        {
            intro2();
        }
        else
        {
            chrome.storage.local.set({'intro-step': -1});
        }
    });
});

function intro2()
{
    let intro = introJs();
    intro.setOptions({overlayOpacity: 0.2, showStepNumbers: false, showBullets: false, keyboardNavigation: false, hideNext: true, hidePrev: true});
    intro.onexit(function () {chrome.tabs.getSelected(null, function(tab) {chrome.tabs.reload(tab.id);});});
    window.setTimeout(function ()
    {
        intro.addSteps([
            {
                element: document.getElementById('import-text'),
                intro: "Enter a few searches separated by new lines in the text area. You can also copy and paste searches here.",
            },
            {
                element: document.getElementById('import'),
                intro: "Click the import button.",
            }
        ]);
        intro.start();
    }, 200);
    chrome.storage.local.set({'intro-step': 3});
}