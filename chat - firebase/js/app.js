'use strict'
jQuery(document).ready(function($) {

	// Variable de inicio
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
	var baseDatos = firebase.database();




	var userGoogle = googleAuth(usuario, baseDatos);
	// Adiciona todos los colores que quieras y que soporte la librería de mdl
	var colores = ['black','blue','green','lime','orange','purple','red','teal','yellow'];


	data.color = color(colores);
	usuario.color = data.color;





	agregarMensaje(baseDatos);
 // Eventos
 	baseDatos.ref("/mensajes").on('child_added', trasmitrirMsj);
 	baseDatos.ref("usuarios").on('child_added', trasmitrirUsuario)













////////////////// Funciones ////////////
// Función para trasmitir los mensajes a todos los usuarios conectados

function trasmitrirMsj(data) {
	if (usuario.id!=data.val().idUser) {
		renderMensaje(data.val(), "#mensajes");

	}
	// console.log(data.val());
}
// Función para tlistar los usuarios conectados
function trasmitrirUsuario(data){
	if (usuario.id!=data.val().id) {
		renderUsers(data.val(), "#usuarios")
		// Notificar la nueva conexión
		$('#numconect').attr('data-badge', conteo++);
	}
}














// Función para agregar mensajes en el FronEnd y Backedn
	function agregarMensaje(db){
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
				var mensaje = {
					idUser: usuario.id,
					nombre: usuario.nombre,
					mensaje: texto,
					imagen: usuario.imagen
				}
				// console.log(mensaje);
				nuevoMensaje(mensaje, db);
				renderMensaje(data, "#mensajes");
				$('#texto-mensaje').val('');
			}
		})
		
	}










// Agregar mensajes a la base de datos.
function nuevoMensaje(mensaje, db){
	db.ref('mensajes/').push(mensaje);
}


// Función para agregar usuarios a la base de datos de firebase
function agregarUsuario(user, db){
	db.ref('usuarios/'+user.id).set(user);
}

// Función para conexión con Google
function googleAuth(usuario, db){
	var google = new firebase.auth.GoogleAuthProvider();
	    firebase.auth().signInWithPopup(google).then(function(result) {
	      usuario.id = result.user.uid;
	      usuario.nombre = result.user.displayName;
	      usuario.correo = result.user.email;
	      usuario.imagen = result.user.photoURL;
	      data.nombre = result.user.displayName;
	      data.imagen = result.user.photoURL;
	      conteo++;
// Notificar la nueva conexión
		$('#numconect').attr('data-badge', conteo);
// Fin
	      renderUsers(usuario, "#usuarios");
	      agregarUsuario(usuario, db);
	    });
// Conexión a la base de datos, agregando registros
	return usuario;
	
	

	
}

// Función para renderizar los mensajes
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