function findContent(searchName,removeList){
    $(searchName).each(function() {
	var el = $(this);
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
    });
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	if(mutation.type == 'childList') {
	    console.debug("removing from mutation");
	    findContent('li.genericStreamStory',['the','project']);
	}
    });
});

observer.observe(document.querySelector('#mainContainer'), 
		 { attributes      : false
		   , childList     : true
		   , characterData : false
		   , subtree       : true });

// findContent('li.genericStreamStory *:not(:has(*))','li.genericStreamStory',['the','project']);
findContent('li.genericStreamStory',['the','project']);
