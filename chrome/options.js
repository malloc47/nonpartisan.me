"use strict";

$(document).ready(function () {

    var filterList = [];

    // Restore checkboxes

    function restore_check(name) {
	var value = localStorage[name];
	if(!value) { 
	    $('#'+name).prop('checked',true)
	    return; 
	}
	$('#'+name).prop('checked',(value != "false"));
    }

    for(var index in choices) {
	restore_check(index);
    }

    // Restore custom string

    if(localStorage["custom"]) {
	$('#customvalue').val(localStorage["custom"]);
    }

    // Restore ratio buttons

    function change_selection() {
	filterList = [];
	if($('#builtin').prop('checked')) {
	    for(var index in choices) {
		if($('#'+index).prop('checked')) {
		    filterList = filterList.concat(choices[index]);
		}
	    }
	}
	else {
	    filterList = $('#customvalue').val()
		.toLowerCase()
		.replace(/[^a-z0-9\ \,\-]+/g,"")
		.replace(/\,+/g, ",")
		.split(',')
		.map(function (el){return el.trim()})
		.filter(function (el){return (el);});
	}
	$('#filtered-list').text("\""+ filterList.join(', ')+"\"");
    }

    if(!localStorage["switch"] || (localStorage["switch"] == "builtin")) {
	$('#builtin').prop('checked',true)
	$('#custom').prop('checked',false)
	change_selection();
    }
    else {
	$('#custom').prop('checked',true)
	$('#builtin').prop('checked',false)
	change_selection();
    }

    $('input').change(change_selection);
    $('#customvalue').keyup(change_selection);

    // Save handler

    $('#save').click(function () {
	function save_checkbox(elName) {
	    var value = "false";
	    if($('#'+elName).prop('checked')) { 
		value = "true"; 
	    }
	    localStorage[elName] = value;
	}

	for(var index in choices) {
	    save_checkbox(index);
	}

	if($('#builtin').prop('checked'))
	    localStorage["switch"] = "builtin";
	else
	    localStorage["switch"] = "custom";

	localStorage["filter"] = JSON.stringify(filterList);
	localStorage["custom"] = $('#customvalue').val();

	var status = document.getElementById("status");
	$('#status').text("Options Saved");
	setTimeout(function () {
	    $('#status').text("");
	}, 2000);
    });
});

