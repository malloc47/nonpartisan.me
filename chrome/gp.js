var plugin = function(){
    function cb(keywords,fn) {
	// newsfeed
	fn('div.Fq','div.Tg',keywords);
    }
   return {
      site: 'gplus',
      cb: cb
   }
}();
