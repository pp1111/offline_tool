$(document).ready(function() {

	$('#AD_FORM').hide(); //Initially form wil be hidden.
	$('#AD').click(function() {
		$('#GA_FORM').hide(); //Initially form wil be hidden.
		$('#DC_FORM').hide(); //Initially form wil be hidden.
		$('#AD_FORM').toggle();
	});

	$('#GA_FORM').hide(); //Initially form wil be hidden.
	$('#GA').click(function() {
		$('#AD_FORM').hide(); //Initially form wil be hidden.
		$('#DC_FORM').hide(); //Initially form wil be hidden.
		$('#GA_FORM').toggle();
	});

	$('#DC_FORM').hide(); //Initially form wil be hidden.
	$('#DC').click(function() {
		$('#GA_FORM').hide(); //Initially form wil be hidden.
		$('#AD_FORM').hide(); //Initially form wil be hidden.
		$('#DC_FORM').toggle();
	});

});