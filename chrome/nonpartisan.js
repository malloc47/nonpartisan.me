"use strict";
var nonpartisan = function(plugin) {

    function nonpartisan (watch,parent,keywords) {
	function kill (parent,removeList){
	    $(parent).each(function () {
		var el = $(this);
		if(el.css('display') !== 'none') {
		    el.find('*').each(function () {
			var toCheck = $(this).text().toLowerCase();
			if(toCheck.length > 0 &&
			   (removeList.some(function (value) {
			       return (toCheck.search("\\b"+value.toLowerCase()+"\\b") >=0);
			   }))
			  ) {
			    el.css({'display':'none'});
			    return false;
			}
		    });
		}
	    });
	}

	// if on a page with the supported elements
	if($(parent) && $(watch)) {
	    var numChildren = $(parent).children().length;
	    setInterval(function () {
		var newNumChildren = $(parent).children().length;
		if(numChildren !== newNumChildren) {
		    kill(parent,keywords);
		    numChildren = newNumChildren;
		}
	    },
			500);
	    kill(parent,keywords);
	}
    }

    chrome.extension.sendMessage({method: "config"}, function (response) {
	if(!response.sites[plugin.site]) return;
	var l = response.filter;
	if(l && l.length>0) {
	    plugin.cb(l,nonpartisan);
	}
	// default if user hasn't saved any settings
	else {
	    l = [];
	    for(var index in choices) {
		l = l.concat(choices[index]);
	    }
	    plugin.cb(l,nonpartisan);
	}
	// console.debug(l.join(', '));
    });
}(plugin);
