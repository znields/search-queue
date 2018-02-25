# <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/icon.png" width="24"> Search Queue

## Purpose

Search Queue adds a queue to Google search! This extension allows the user to queue up multiple searches and quickly make them. It was designed with market analysis in mind, however it has many uses. In general, it's a great tool for anyone who has to make many successive Google searches and would like to speed up the process.

## Functionality

Search Queue has a few different features, all of which are explained in detail here.

### Queue Editor

The queue editor automatically opens after Queue Search has been installed. It can also be accessed by first clicking on the Queue Search icon in the toolbar and then on 'Edit Queue'. The queue editor's primary purpose is to allow the user to add or remove searches from the queue. The following is a functional description of each of the input fields on the editor page:

#### Constant Phrase

The two 'Constant phrase' input fields allow the user to specify constant search terms that always appear at the beginning or end of each Google search. The constant input field to the left of the search queue is added before the search queue term, while the field to the right is added after.

#### Search Queue

The 'Search queue' input field is where the user enters the terms that are to be successively searched. Each successive search should be entered one after the other separated by a comma with no extra spaces added. Example: 'Facebook,Google Plus,Snapchat,Instagram'

#### Queue Index

The queue index determines which term will be searched in the search queue. In most casees, this value will be set to 1 as to start searching from the beginning of the queue. Note that each time the user requests the next search in the queue, the queue index is incremented by 1.

#### Save

The save button saves the queue that the user has entered. If the queue index is not between 1 and the number of items in the queue, all other changes will be saved, however the new queue index value will be discarded.

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

In general, Search Queue is a great for anyone who needs to make many Google searches. A few specific examples of how it might be used are as follows:

#### 1. Analysis

If an analyst has a large number of Google searches that need to be made about a particular topic (e.g. business, product, software), Search Queue is helpful in making these searches in a quick, organized way.

#### 2. Research

If a researcher has a topic of interest with many different facets and would like to learn about each of these facets, Search Queue is helpful in efficiently generating searches for each facet relating to the topic of interest.

#### 3. Spreadsheet Work

If a user is doing work which involves making Google searches from a spreadsheet, instead of switching between the spreadsheet and Google for each search, the user can simply copy and paste the list of searches into Search Queue.

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
6. Select the root folder of the extracted source code and click 'OK'.
7. You're done! You should now be able to use Search Queue.

## Future Goals

1. Revamp the Editor page to make it more intuitive for users to add searches to the queue.
2. Create a dedicated help page that describes the functionality of Search Queue.
3. Add ability to automatically highlight queued search term.
