'use strict'
jQuery(document).ready(function($) {
	var data = {
		id:1,
		nombre: 'Luis Fernando Raga Renteria',
		mensaje: 'Hola hola'
	}
	var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }else{
    	dialog.showModal();
    }
    $('#empezar').click(function(event) {


    	if (!vacio($('#nombre').val())) {
	    	var snackbarContainer = document.querySelector('#demo-toast-example');
		    var message = {message: 'Debes escribir un nombre o NickName'};
		    snackbarContainer.MaterialSnackbar.showSnackbar(message);
    	}else{
    		data.nombre = $('#nombre').val();
	    	console.log(data)
	    	dialog.close();
    	}
    });
	

	// Adiciona todos los colores que quieras y que soporte la librería de mdl
	var colores = ['black', 'blue', 'green', 'lime', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow'];
	
	$(".envio").click(() => {
		var texto = $('#texto-mensaje').val();

		if (!vacio(texto)) {
			// Tomar acción si el campo está vacio o contiene sólo espacios en blanco.
			var snackbarContainer = document.querySelector('#demo-toast-example');
		    var message = {message: 'Debes escribir un mensaje'};
		    snackbarContainer.MaterialSnackbar.showSnackbar(message);
		}else{
			//Tomar accion si el texto esta conrrecto y se puede enviar a los demas usuarios conectados.
			data.mensaje = texto;
			render(data, colores);
			$('#texto-mensaje').val('');	
		}

	})












////////////////// Funciones ////////////
// Función para renderizarlos mensajes
function render(data, colores){
	function color(){
		return colores[Math.floor(Math.random() * (colores.length - 0)) + 0];
	}
	var html = `
		<div>
            <span class="mdl-chip mdl-chip--contact right">
                <span class="mdl-chip__contact mdl-color--${color()} mdl-color-text--white">${PL(data.nombre)}</span>
                <span class="mdl-chip__text">${data.mensaje}</span>
            </span>
        </div>
        <br>
	`;

	$('#mensajes').append(html).fadeTo()
}

// Función para extraer la primera letra de un string
function PL (string) {
	for(var i = 0; i==0;i++){
		return  string[i].toUpperCase();
	}
}





// Función que valida que el campo no sea sólo espacios
function vacio(q) {
	for ( var i = 0; i < q.length; i++ ) {
		if ( q.charAt(i) != " " ) {
			return true
		}
	}
	return false
}



});