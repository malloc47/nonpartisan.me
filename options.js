$(document).ready(function() {
    var opts = ['conservative','liberal','topics'];

    function restore_check(name) {
	var value = localStorage[name];
	if(!value) { 
	    $('#'+name).prop('checked',true)
	    return; 
	}
	$('#'+name).prop('checked',(value != "false"));
    }

    opts.forEach(function(item) {
	restore_check(item);
    });

    $("#save").click(function() {
	function save_checkbox(elName) {
	    var value = "false";
	    if($('#'+elName).prop('checked')) { 
		value = "true"; 
	    }
	    localStorage[elName] = value;
	}
	save_checkbox("conservative");
	save_checkbox("liberal");
	save_checkbox("topics");

	opts.forEach(function(item) {
	    save_checkbox(item);
	});

	var status = document.getElementById("status");
	$('#status').text("Options Saved");
	setTimeout(function() {
	    $('#status').text("");
	}, 2000);
    });
});

