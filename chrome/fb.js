var plugin = function(){
    function cb(keywords,fn) {
	// newsfeed
	fn('#content','li.genericStreamStory',keywords);
	// newsticker
	fn('#content','div.fbFeedTickerStory',keywords);
	// timeline
	fn('#content','li.fbTimelineUnit',keywords);
    }
   return {
      site: 'facebook',
      cb: cb
   }
}();
