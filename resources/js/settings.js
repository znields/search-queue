// when the packet is done being saved
chrome.storage.local.get(['prepended-constant', 'appended-constant', 'search-engine'], function (items)
{
    // restore the constant prepended and appended values
    document.getElementById('prepended-constant').value = items['prepended-constant'];
    document.getElementById('appended-constant').value = items['appended-constant'];

    // restore the search engine selector
    document.getElementById('search-engine-selector').value = items['search-engine'];
});


// if the prepended phrase has no value
if (items['prepended-constant'] === undefined)
{
    // set the prepended constant to empty string
    packet['prepended-constant'] = "";
}

// if the appended phrase has no value
if (items['appended-constant'] === undefined)
{
    // set the appended constant to empty string
    packet['appended-constant'] = "";
}


// retrieves the constant phrases from editor.html
const constantPhrases = document.getElementsByClassName('constant-input');

// adds the prepended and appended phrases to the packaet
packet['prepended-constant'] = constantPhrases[0].value;
packet['appended-constant'] = constantPhrases[1].value;

// retrieves the search engine type select
const searchEngineSelect = document.getElementById('search-engine-selector');

// adds the selected option to the packet to be saved
packet['search-engine'] = searchEngineSelect.options[searchEngineSelect.selectedIndex].value;

// removes terms from the constant appended and prepended phrases
document.getElementById('prepended-constant').value = "";
document.getElementById('appended-constant').value = "";

document.getElementById('settings-save').addEventListener('click', saveSettings);


// saves the settings that the user entered
function saveSettings()
{
    // makes the the settings container invisible to the user
    document.getElementById('settings-container').style.display = 'none';

    // save the values in all input fields
    save();
}