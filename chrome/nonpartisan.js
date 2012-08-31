function nonpartisan(watch,parent,keywords) {

    function kill(parent,removeList){
	$(parent).each(function() {
	    var el = $(this);
	    if(el.css('display') != 'none') {
    		el.find('*').each(function () {
		    var toCheck = $(this).text().toLowerCase();
		    if(toCheck.length > 0 &&
		       (removeList.some(function(value) {
			   // return (toCheck.indexOf(value.toLowerCase()) >= 0);
			   // regex only recognizes ascii boundaries
			   // http://breakthebit.org/post/3446894238/word-boundaries-in-javascripts-regular-expressions
			   return (toCheck.search("\\b"+value.toLowerCase()+"\\b") >=0);
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

var choices = {
    "liberal"      : ['obama','health care','pro-choice','liberal'],
    "conservative" : ['mitt','romney','paul ryan','pro-life','conservative','gop','rnc','ron paul'],
    "topics"       : ['abortion','election','government','contraception','taxes'],
};

var selected = [];

chrome.extension.sendMessage({method: "filter"}, function(response) {
    l = response["filter"];
    if(l && l.length>0) {
	fb_nonpartisan(l);
	// console.debug(l.join(', '));
    }
    else {
	fb_nonpartisan(['obama','health care','pro-choice','liberal',
			'mitt','romney','paul ryan','pro-life',
			'conservative','gop','rnc','ron paul',
			'abortion','election','government',
			'contraception','taxes']);
    }
});


