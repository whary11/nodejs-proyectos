'use strict'
jQuery(document).ready(function($) {
	var data = {
		id:1,
		nombre: 'Luis Fernando Raga Renteria',
		mensaje: 'Hola hola'
	}
	var usuario = {
		id:1,
		nombre:"Luis Raga"
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
		    var message = {message: 'Debes escribir un Nombre o NickName'};
		    snackbarContainer.MaterialSnackbar.showSnackbar(message);
    	}else{
    		// Agragamos el nombre ingresado al JSON de data 
    		data.nombre = $('#nombre').val();
    		usuario.nombre = $('#nombre').val();
    		// Cerramos laventana de dialogo.

	    	dialog.close();
	    	renderUsers(usuario, "#usuarios")
    	}
    });
	// Adiciona todos los colores que quieras y que soporte la librería de mdl
	var colores = ['black',
					'blue',
					'green',
					'lime',
					'orange',
					'purple',
					'red',
					'teal',
					'yellow'
					];
	data.color = color(colores);
	usuario.color = data.color;
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
			renderMensaje(data, "#mensajes");
			$('#texto-mensaje').val('');	
		}

	})


















































////////////////// Funciones ////////////
// Función para renderizarlos mensajes
function renderMensaje(data, id){
	var html = `
		<div id="tt1">
            <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--${data.color} mdl-color-text--white">${PL(data.nombre)}</span>
                <span class="mdl-chip__text">${data.nombre}</span>
            </span>
        </div>
        <span class="mdl-tooltip" for="tt1">${data.mensaje}</span>
	`;
	$(id).append(html);
}
// Función para renderizarlos usuarios
function renderUsers(user, id){
	var html = `
		<div>
            <span class="mdl-chip mdl-chip--contact">
                <span class="mdl-chip__contact mdl-color--${user.color} mdl-color-text--white">${PL(user.nombre)}</span>
                <span class="mdl-chip__text">${user.nombre}</span>
            </span>
        </div>`;
	$(id).append(html);
}
// Función para extraer la primera letra de un string
function PL (string) {
	for(var i = 0; i==0;i++){
		return  string[i].toUpperCase();
	}
}

// Función para seleccionar el color de forma automatica 

function color(colores){
		return colores[Math.floor(Math.random() * (colores.length - 0)) + 0];
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