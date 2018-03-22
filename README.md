# <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/icon.png" width="24"> Search Queue

## Purpose

Search Queue adds a queue to Google search! This extension allows the user to queue up multiple searches and quickly make them. It was designed with market analysis in mind, however, it has many uses. In general, it's a great tool for anyone who has to make many successive Google searches and would like to speed up the process.

## Set Up

There are two main ways you can run this extension:

#### 1. Chrome Web Store

If you would like to support the developer, please buy this extension from the web store: https://goo.gl/e464Sz.

#### 2. Developer Installation

1. Download this repository from GitHub.
2. Extract the source code if necessary.
3. Open Google Chrome and navigate to chrome://extensions.
4. Check the 'Developer mode' checkbox on the top right.
5. Click the 'Load unpacked extension' button.
6. Select the root folder of the source code and click 'OK'.
7. You're done! You should now be able to use Search Queue.

## Functionality

Search Queue has a few different features, all of which are explained in detail here.

### Queue Editor

The queue editor automatically opens after Queue Search has been installed. It can also be accessed by first clicking on the Queue Search icon in the toolbar and then on 'Edit Queue'. The queue editor's primary purpose is to allow the user to add or remove searches from the queue. The following is a functional description of each of the input fields and buttons on the editor page:

#### Prepended Phrase

The prepended phrase is added to the beginning of every search made by SearchQueue. For example, if the prepended phrase is set to "Apple" and the first search term is set to "iPhone" when the user makes the first search, results for the phrase "Apple iPhone" will be displayed.

#### Appended Phrase

The 'Appended phrase' is added to the end of every search made by SearchQueue. For example, if the appended phrase is set to "stock price" and the first search term is set to "Apple" when the user makes the first search, results for the phrase "Apple stock price" will be displayed.

#### Import

The 'Import' button is used to display a popup that allows the user to quickly import searches. The searches should be entered into the text box separated by new lines.

#### Save

The 'Save' button is used to save all user input, including the prepend phrase, the appended phrase, and all added searches.

#### Clear

The 'Clear' button is used to clear all entered searches. Note that this button does not clear the prepend and append phrases.

#### + Add Search

The '+' button adds a new search to the queue.

#### - Remove Search

The '-' button removes the last search from the queue.

### Extension Popup

The extension popup page can be accessed by clicking the Search Queue icon on the right of the toolbar. On this page, there are few tasks that the user can do:

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/start.png" width="16"> Start

The 'Start' button searches Google for the term in the search queue that the queue index points to.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/next.png" width="16"> Next

The 'Next' button searches Google for the next term in the search queue. The 'Next' button can also be quickly activated with the keyboard shortcut 'Ctrl+Shift+Right'. 

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/previous.png" width="16"> Previous

The 'Previous' button searches Google for the previous term in the search queue. The 'Previous' button can also be quickly activated with the keyboard shortcut 'Ctrl+Shift+Left'. 

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/edit.png" width="16"> Edit Queue

The 'Edit Queue' button navigates the user to the queue editor page.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/help.png" width="16"> Help

The 'Help' button navigates the user to the Search Queue repository.

## Use Cases

In general, Search Queue is great for anyone who needs to make many Google searches. A few specific examples of how it might be used are as follows:

#### 1. Analysis

If an analyst has a large number of Google searches that need to be made about a particular topic (e.g. business, product, software), Search Queue is helpful in making these searches in a quick, organized way.

#### 2. Research

If a researcher has a topic of interest with many different facets and would like to learn about each of these facets, Search Queue is helpful in efficiently generating searches for each facet relating to the topic of interest.

#### 3. Spreadsheet Work

If a user is doing work which involves making Google searches from a spreadsheet, instead of switching between the spreadsheet and Google for each search, the user can simply copy and paste the list of searches into Search Queue.

## Future Goals

1. Revamp the Editor page to make it more intuitive for users to add searches to the queue.
2. Create a dedicated help page that describes the functionality of Search Queue.
3. Add ability to automatically highlight queued search term.
4. Clean up and enhance the search generation algorithm.
