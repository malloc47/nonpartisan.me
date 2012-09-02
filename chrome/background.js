"use strict";

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "filter" && localStorage.filter) {
	sendResponse({"filter" : JSON.parse(localStorage.filter)});
    }
    else {
	sendResponse({});
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, change) {
    if (change.status === "complete") {
        chrome.tabs.query({active: true}, function (tabs) {
            var tab = tabs[0];
            if (tab.url.indexOf("www.facebook.com") > -1 ||
		tab.url.indexOf("twitter.com") > -1) {
                chrome.pageAction.show(tab.id); 
	    } 
            else {
                chrome.pageAction.hide(tab.id); 
	    }
        });
    }   
});
