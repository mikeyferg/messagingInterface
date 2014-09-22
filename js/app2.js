var inputs = [];

$(document).ready(function($) {

	/* Add and remove active states from buttons */
	$(".btn-group > .btn").click(function(){
	    $(this).addClass("active").siblings().removeClass("active");
	});

	/* store user inputs on clicks or blurs */
	$('.device').on('click', 'button', function() {
		inputs[0] = $(this).text();
		console.log(inputs[0]);
	})

	$('.category').on('click', 'button', function() {
		inputs[1]= $(this).text();
		console.log(inputs[1]);
	})

	$('.messageHeader').on('blur', function() {
		inputs[2]= $(this).val();
		console.log(inputs[2]);
	})

	$('.messageBody').on('blur', function() {
		inputs[3]= $(this).val();
		console.log(inputs[3]);
	})

	$('.sound').on('click', 'button', function() {
		inputs[4]= $(this).text();
		console.log(inputs[4]);
	})
	

	/* ------------Begin links ------------ */
	/*only allow the ability to add a link if the user selects "contest" */
	$('input:radio[name="optionsRadios"]').change(function(){
    	if($(this).val() == 'contest'){
       		$('.linkAddress').removeAttr('disabled');
       	
    	}
    	else {
    		$('.linkAddress').prop('disabled',true);
    		//$('.linkAddress').val('');
    		inputs[5]= $(this).val();
    		console.log(inputs[5])
;    	}
	});
	/* store links on blur */
	$('.linkAddress').on('blur', function() {
		inputs[5]= $(this).val();
		console.log(inputs[5]);
	})
	/*------------------End Links ------------ */



	$('.expirationDate').on('changeDate', function() {
		inputs[6]= $(this).val();
		console.log(inputs[6]);
	})

	$('.expirationTime').change(function() {
		inputs[7]= $(this).val();
		console.log(inputs[7]);
	})


	$('.appSecret').on('blur', function() {
		inputs[8]= $(this).val();
		console.log(inputs[8]);
	})
	
	/* ----------End add and remove active states from buttons----------- */

	/*  Call datepick and timepicker functions */
	$('.datepicker').datepicker();
	$('.time').clockpicker({
		donetext: 'Select',
		twelvehour: true
	}); 

	/* submit all user data and run enter function */
	$('.enter').on('click', 'button', function() {
		/* require both messageHeader and messageBody */
		if($('.messageHeader').val() == '' || $('.messageHeader').val() == '') {
			alert("Message Head and Body required.  Obviously");
		}

		else if (inputs[5] === undefined) {
			alert("A contest link requires a contest link");
		}
		/* if having an expiration must include both date and time */
		else if (($('.expirationDate').val() != '' && $('.expirationTime').val() == '') || ($('.expirationTime').val() != '' && $('.expirationDate').val() == '')) {
			alert("An expiration rules requires both a date and time");

		}
		else {
			enter(inputs);
			console.log(inputs);
		}	
	})

}); 



/* sending user inputs to backend */
var enter = function(inputs) {

   var request = {
    	deviceType: inputs[0],
    	category: inputs[1],
    	messageHeader: inputs[2],
    	messageBody: inputs[3],
    	sound: inputs[4],
    	link: inputs[5],
    	expirationDate: inputs[6],
    	expirationTime: inputs[7],
    	appSecret: inputs[8]
    } 

   var result = $.ajax({
   		type: "POST",
   		url: "https://alpha.swoopt.com:8001/push/createNotification",
	    data: request,
	    dataType: "jsonp",

	/*.statusCode({
		200: function() {
			$(this).closest('#main').hide();
			$('.confirmation').show(); 
		}

	}) */
	    complete: function(result) {
	        if (result.status == "200") {
		      	$('#main').hide();
				$('.confirmation').show();
		    	 
        	} 
        	else {
	           alert('An error has occurred');
	        }
     	}
    });

}