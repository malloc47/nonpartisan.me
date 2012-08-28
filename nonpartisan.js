function findContent(classname,container,removeList){
    $('.'+classname).filter( function (index) {
	var toCheck = $(this).text().toLowerCase();
	return removeList
	    .some(function(value) {
		return (toCheck.indexOf(value.toLowerCase()) >= 0);
	    });
    }).closest(container).css({'display':'none'});
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	if(mutation.type == 'childList') {
	    // kill everything wholesale
	    findContent('userContent','li.genericStreamStory',['the']);
	}
    });
});

observer.observe(document.querySelector('#home_stream'), 
		 { attributes      : true
		   , childList     : true
		   , characterData : true
		   , subtree       : true });

findContent('userContent','li.genericStreamStory',['the']);
