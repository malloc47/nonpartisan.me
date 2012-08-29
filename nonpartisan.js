function nonpartisan(watch,parent,keywords) {

    function kill(parent,removeList){
	$(parent).each(function() {
	    var el = $(this);
	    if(el.css('display') != 'none') {
    		el.find('*').each(function () {
		    var toCheck = $(this).text().toLowerCase();
		    if(toCheck.length > 0 &&
		       (removeList.some(function(value) {
			   return (toCheck.indexOf(value.toLowerCase()) >= 0);
		       }))
		      ) {
			el.css({'display':'none'});
			return false;
		    }
		});
	    }
	});
    };

    // if on a page with the supported elements
    if($(parent) && $(watch)) {

	var numChildren = $(parent).children().length
	
	setInterval(function () {
	    var newNumChildren = $(parent).children().length;
	    if(numChildren != newNumChildren) {
		kill(parent,keywords);
	    }
	},
		   500);

	kill(parent,keywords);
    }
}

function fb_nonpartisan(keywords) {
    // newsfeed
    nonpartisan('#content','li.genericStreamStory',keywords);
    // newsticker
    nonpartisan('#content','div.fbFeedTickerStory',keywords);
    // timeline
    nonpartisan('#content','li.fbTimelineUnit',keywords);
}

choices = {
    "liberal"      : ['obama','health care','pro-choice','liberal'],
    "conservative" : ['mitt','romney','paul ryan','pro-life','conservative','gop','rnc','ron paul'],
    "topics"       : ['abortion','election','government','contraception','taxes'],
};

var selected = [];

chrome.extension.sendMessage({method: "setup"}, function(response) {
    for(var i in response) {
	if(response[i]) {
	    selected = selected.concat(choices[i]);
	}
    }
    fb_nonpartisan(selected);
    console.debug(selected.join(' '));
});


