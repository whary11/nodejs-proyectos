'use strict'
$(document).ready(function() {


	var formIngreso = $('#adminSesion');
	var action = formIngreso.attr('action');
	var res = '';

	formIngreso.submit(function(event){
		event.preventDefault();

		// console.log(event.preventDefault())
		$.ajax({
			url:'/admin',
			type: 'POST',
			dataType: 'json',
			// contentType: 'application/json',
			data: formIngreso.serialize(),
		})
		.done(function(data) {
			console.log(data);
		})
		.fail(function(data) {
			console.log(data);
		})
		.always(function(data) {
			// console.log(data);
		});
		
	})

if (res=="") {

}else{
	$.post('/admin', {clave: res}, function(data, textStatus, xhr) {

	});
}


});