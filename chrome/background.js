chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "filter") {
	sendResponse({"filter" : JSON.parse(localStorage['filter'])});
    }
    else {
	sendResponse({});
    }
});
