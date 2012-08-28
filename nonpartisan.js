function findContent(classname,container,removeList){
    // $('li.genericStreamStory').each(function() {
    // 	if($(this).find('*')
    // });
    $(classname).filter( function (index) {
	var toCheck = $(this).text().toLowerCase();
	if(toCheck.length == 0) {return false;}
	return removeList
	    .some(function(value) {
		// if(toCheck.indexOf(value.toLowerCase()) >= 0) {
		//     console.debug(toCheck);
		// }
		return (toCheck.indexOf(value.toLowerCase()) >= 0);
	    });
    }).closest(container).css({'display':'none'});
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	if(mutation.type == 'childList') {
	    console.debug("removing from mutation");
	    findContent('li.genericStreamStory *','li.genericStreamStory',['the','project']);
	}
    });
});

observer.observe(document.querySelector('#mainContainer'), 
		 { attributes      : false
		   , childList     : true
		   , characterData : false
		   , subtree       : true });

// findContent('li.genericStreamStory *:not(:has(*))','li.genericStreamStory',['the','project']);
findContent('li.genericStreamStory *','li.genericStreamStory',['the','project']);
