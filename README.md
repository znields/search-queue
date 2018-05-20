# <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/icon.png" width="24"> Search Queue
A queue for Google search!

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/ipcifbklbbpchinpdfcfbhpghnknioff.svg)](https://goo.gl/e464Sz)
![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/isaiahnields/SearchQueue/blob/master/LICENSE)

## Table of Contents

[Purpose](#purpose)<br />
[Compatibility](#compatibility)<br />
[Setup](#setup)<br />
[Functionality](#functionality)<br />
[Use Cases](#use-cases)<br />
[Future Goals](#future-goals)<br />

## Purpose

Search Queue adds a queue to Google search! This extension can queue up multiple searches and quickly make them. It was designed with market analysis in mind, however, it has many uses. In general, it's a great tool for anyone who has to make many successive Google searches and would like to speed up the process.

## Compatibility

Search Queue is only available for Chrome. There are no plans to create versions for other web browsers.

## Setup

There are two main ways you can run this extension:

#### 1. Chrome Web Store

This extension is available in the Chrome Web Store:

[![Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_340x96.png)](https://goo.gl/e464Sz)

#### 2. Manual Installation

1. Clone this repository.
1. Open Google Chrome and navigate to chrome://extensions.
3. Check the 'Developer mode' checkbox on the top right.
4. Click the 'Load unpacked extension' button.
5. Select the root folder of the source code and click 'OK'.
6. You're done! You should now be able to use Search Queue.

## Functionality

Search Queue has a few different features, all of which are explained in detail here.

### Extension Popup

The extension popup page can be accessed by clicking the Search Queue icon on the right of the toolbar. On this page, there are a few tasks that can be completed:

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/start.png" width="16"> Start

The 'Start' button searches Google for the term in the search queue that the queue index points to.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/next.png" width="16"> Next

The 'Next' button searches Google for the next term in the search queue. The 'Next' button can also be quickly activated with the keyboard shortcut 'Alt-Up'. 

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/previous.png" width="16"> Previous

The 'Previous' button searches Google for the previous term in the search queue. The 'Previous' button can also be quickly activated with the keyboard shortcut 'Alt+Down'. 

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/view.png" width="16"> View Queue

The 'View Queue' button presents a clickable list of all the search terms in the queue. Upon clicking a term, it is immediately searched.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/edit.png" width="16"> Edit Queue

The 'Edit Queue' button navigates to the queue editor page.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/help.png" width="16"> Help

The 'Help' button navigates to the Search Queue repository.

### Queue Editor

The queue editor automatically opens after Queue Search has been installed. It can also be accessed by first clicking on the Queue Search icon in the toolbar and then on 'Edit Queue'. The queue editor's primary purpose is to allow for the addition or removal of searches from the queue. The following is a functional description of each of the input fields and buttons on the editor page:

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/import.png" width="16"> Import

The 'Import' button is used to display a popup which allows for searches to be quickly imported. The searches should be entered into the text box separated by new lines.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/clear.png" width="16"> Clear

The 'Clear' button is used to clear all entered searches and the appended and prepended phrases.

#### <img src="https://raw.githubusercontent.com/isaiahnields/SearchQueue/master/resources/images/delete.png" width="16"> Delete

Once a search has been added, it can be deleted by hovering over the search number and clicking on the delete button.

#### + Add Search

The '+ Add Search' button adds a new search to the queue.

## Use Cases

In general, Search Queue is great for anyone who needs to make many Google searches. A few specific examples of how it might be used are as follows:

#### 1. Analysis

If an analyst has a large number of Google searches that need to be made about a particular topic (e.g. business, product, software), Search Queue is helpful in making these searches in a quick, organized way.

#### 2. Research

If a researcher has a topic of interest with many different facets and would like to learn about each of these facets, Search Queue is helpful in efficiently generating searches for each facet relating to the topic of interest.

#### 3. Spreadsheet Work

If a user is doing work which involves making Google searches from a spreadsheet, instead of switching between the spreadsheet and Google for each search, the user can simply copy and paste the list of searches into Search Queue.

## Future Goals

See [Projects](https://github.com/isaiahnields/SearchQueue/projects).
