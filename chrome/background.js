"use strict";

function storageToggle(name) {
    if(localStorage[name]) {
	if(localStorage[name] === "true") {
	    localStorage[name] = "false";
	}
	else {
	    localStorage[name] = "true";
	}
    }
    else {
	localStorage[name] = "false";
    }
}

chrome.pageAction.onClicked.addListener(function(tab) {
    for(var i in sites) {
	if(tab.url.indexOf(sites[i]) > -1){
	    storageToggle(i);
	    break;
	}
    }

    chrome.tabs.reload(tab.id);
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "config") {
	var s = {};
	for(var i in sites) {
	    if(localStorage[i]) {
		s[i] = (localStorage[i] === "true")
	    }
	    else {
		// assume true
		s[i] = true;
	    }
	}

	var f = [];
	if(localStorage.filter) {
	    f = JSON.parse(localStorage.filter)
	}
	else {
	    for(var index in choices) {
		f = f.concat(choices[index]);
	    }
	}
	sendResponse({"filter" : f,
		      "sites"  : s});
    }
    else {
	sendResponse({});
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, change) {
    if (change.status === "complete") {
        chrome.tabs.query({active: true}, function (tabs) {
            var tab = tabs[0];
	    var found = false;
	    for(var i in sites) {
		if(tab.url.indexOf(sites[i]) > -1) {
		    if(localStorage[i] && 
		       localStorage[i] !== "true") {
			chrome.pageAction.setIcon({"tabId" : tabId,
						   "path":"icon48bw.png"});
			chrome.pageAction.setTitle({"tabId" : tabId,
						   "title":"nonpartisan.me: Click to turn on filter"});
		    }
		    else {
			chrome.pageAction.setIcon({"tabId" : tabId,
						   "path":"icon48.png"});
			chrome.pageAction.setTitle({"tabId" : tabId,
						   "title":"nonpartisan.me: Click to turn off filter"});
		    }
		    chrome.pageAction.show(tab.id);
		    found = true;
		    break;
		}
	    }
	    if(!found) chrome.pageAction.hide(tab.id); 
        });
    }
});
