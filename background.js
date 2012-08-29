chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setup") {
	var r = [];
	
	sendResponse({'liberal'     : (localStorage['liberal'] != "false"),
		      'conservative': (localStorage['conservative'] != "false"),
		      'topics'      : (localStorage['topics'] != "false")
		     });
    }
    else {
	sendResponse({});
    }
});
