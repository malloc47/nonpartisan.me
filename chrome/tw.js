var plugin = function(){
    function cb(keywords,fn) {
	// newsfeed
	fn('div.stream-items','div.stream-item',keywords);
    }
   return {
      site: 'twitter',
      cb: cb
   }
}();
