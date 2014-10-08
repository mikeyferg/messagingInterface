var inputs = [];

$(document).ready(function($) {

	/* Add and remove active states from buttons */
	$(".btn-group > .btn").click(function(){
	    $(this).addClass("active").siblings().removeClass("active");
	});

	/* message type */
	$('.type').on('click', 'button', function() {
		inputs[9]= $(this).text();
		console.log(inputs[9]);
	})

	/* ------------Begin devices ------------ */
	/*only allow the ability to add a link if the user selects "contest" */
	$('.device').on('click', 'button', function(){
    	if($(this).text() == 'Specific User'){
       		$('.deviceName').removeAttr('disabled');
       		inputs[0]= '';
       		console.log(inputs[0])
    	}
    	else {
    		$('.deviceName').prop('disabled',true);
    		//$('.linkAddress').val('');
    		inputs[0]= $(this).text();
    		console.log(inputs[0]);    	
    		}
	});
	/* store links on blur */
	$('.deviceName').on('blur', function() {
		inputs[10]= $(this).val();
		console.log(inputs[10]);
	})
	/*------------------End Devices ------------ */


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
    		console.log(inputs[5]);    	
    	}
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
	$('.datepicker').datepicker({
		autoclose: true
	});
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

		else if (inputs[9] === undefined) {
			alert("Please select inApp only or inApp and Push.")
		}

		else if (inputs[1] === undefined) {
			alert("Message type is required.")
		}

		else if (inputs[5] === undefined) {
			alert("A contest link requires a contest link");
		}
		/* if having an expiration must include both date and time */
		else if (($('.expirationDate').val() != '' && $('.expirationTime').val() == '') || ($('.expirationTime').val() != '' && $('.expirationDate').val() == '')) {
			alert("An expiration rules requires both a date and time");
		}
		else if (inputs[10]== '') {
			alert("Please enter a user name.")
		}

		else {
			enter(inputs);
			console.log(inputs);
			$(this).attr("disabled", true);
		}	
	})




}); 



/* sending user inputs to backend */
var enter = function(inputs) {

   var request = {
    	deviceType: inputs[0],
    	userList: inputs[10],
    	category: inputs[1],
    	messageHeader: inputs[2],
    	messageBody: inputs[3],
    	sound: inputs[4],
    	link: inputs[5],
    	expirationDate: inputs[6],
    	expirationTime: inputs[7],
    	appSecret: inputs[8],
    	type: inputs[9]
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
	    	$(".enter button").attr("disabled", false);
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