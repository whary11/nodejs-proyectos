'use strict'
jQuery(document).ready(function($) {
	var conteo =0;
	var data = {
		id:1,
		nombre: 'Luis Fernando Raga Renteria',
		mensaje: 'Hola hola'
	}
	var usuario = {
		id:1,
		nombre:"Luis Raga",
		correo: "",
		imagen: ""
	}

	googleAuth();
	agregarUsuario(usuario)

	// Notificar la nueva conexión
	$('#numconect').attr('data-badge', conteo);
	// Fin

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
			// console.log(data);
			renderMensaje(data, "#mensajes");
			$('#texto-mensaje').val('');	
		}
	})


















































////////////////// Funciones ////////////
// Función para conexión con Google
function googleAuth(){

	var google = new firebase.auth.GoogleAuthProvider();
	    firebase.auth().signInWithPopup(google).then(function(result) {
	      usuario.id = result.user.uid;
	      usuario.nombre = result.user.displayName;
	      usuario.correo = result.user.email;
	      usuario.imagen = result.user.photoURL;
	      data.nombre = result.user.displayName;
	      data.imagen = result.user.photoURL;
	      renderUsers(usuario, "#usuarios");
	    });
// Conexión a la base de datos, agregando registros


	
}
// Función para agregar usuarios a la base de datos de firebase
function agregarUsuario(data){
	var database = firebase.database();
	var refDatabase = database.ref("/usuarios");
	refDatabase.push(usuario)
	    conteo++;
}

// Función para renderizarlos mensajes
function renderMensaje(data, id){
	var html = `
		<div id="tt1">
            <span class="mdl-chip mdl-chip--contact">
				<img class="mdl-chip__contact" src="${data.imagen}"></img>
                <span class="mdl-chip__text">${data.mensaje}</span>
            </span>
        </div>
        <span class="mdl-tooltip" for="tt1">${data.nombre}</span>
	`;
	$(id).append(html);
}
// Función para renderizarlos usuarios
function renderUsers(user, id){
	// <span class="mdl-chip__contact mdl-color--${user.color} mdl-color-text--white">${PL(user.nombre)}</span>
	var html = `
		<div>
            <span class="mdl-chip mdl-chip--contact">
            <img class="mdl-chip__contact" src="${user.imagen}"></img>
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