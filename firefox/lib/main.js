var widgets = require("widget");
var tabs = require("tabs");

var widget = widgets.Widget({
    id: "mozilla-link",
    label: "Mozilla website",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
	tabs.open("http://www.mozilla.org/");
    }
});
