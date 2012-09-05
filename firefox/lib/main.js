var data = require("self").data;

var fb = require("page-mod");
var tw = require("page-mod");

fb.PageMod({
    include: "*.facebook.com",
    contentScriptFile: [
	data.url('jquery.js'),
	data.url('common.js'),
	data.url('fb.js'),
	data.url('nonpartisan.js'),
    ]
});

fb.PageMod({
    include: "*.twitter.com",
    contentScriptFile: [
	data.url('jquery.js'),
	data.url('common.js'),
	data.url('tw.js'),
	data.url('nonpartisan.js'),
    ]
});
