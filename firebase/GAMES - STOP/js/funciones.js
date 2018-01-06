var db = firebase.database();
var usuario = {
	id : "",
	nombre: "",
	correo: "",
	imagen: "",
	online: false
	};

// Función para conexión con Google
function googleAuth(){
	var google = new firebase.auth.GoogleAuthProvider();
	    firebase.auth().signInWithPopup(google).then(function(result){
	      usuario.id = result.user.uid;
	      usuario.nombre = result.user.displayName;
	      usuario.correo = result.user.email;
	      usuario.imagen = result.user.photoURL;
	      usuario.online = true;
		   	// Enviar datos del usuario a la base de datos MySQL
		  $.ajax({
		  	url: 'controladores/index.php',
		  	type: 'POST',
		  	dataType: 'json',
		  	data: usuario,
		  })
		  .done(function(data) {
		  	if(data.resp){
		  		location.href="juego.html?id="+usuario.id;	
		  	}else if(data.resp===false){
		  		console.log('Hubo problemas al guardar los datos.')
		  	}else{
		  		console.log(data)
		  		location.href="juego.html?id="+usuario.id;	

		  	}
		  })
		  .fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);

			})		  
		  agregarUsuario(usuario, db)
		  
		}).catch(function(error) {
		   // Handle Errors here.
		   var errorCode = error.code;
		   var errorMessage = error.message;
		   // The email of the user's account used.
		   var email = error.email;
		   // The firebase.auth.AuthCredential type that was used.
		   var credential = error.credential;
		   if (errorCode === 'auth/account-exists-with-different-credential') {
		     // alert('You have signed up with a different provider for that email.');
		     // Handle linking here if your app allows it.
		   } else if(errorCode==='auth/popup-closed-by-user') {
		   	console.log('Has cerrado la ventana de verificación.')
		   	var data = {
		      message: 'Cerraste la ventana para la verificación de tu identidad.',
		      timeout: 900,
		      actionText: 'Undo'
		    };	
		   	notificar(data)
		   }else{
		     console.error(error);
		   }
		 });

	// console.log(usuario);
}

// Función para conexión con Twitter
function twitterAuth() {
	var provider = new firebase.auth.TwitterAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
		// You can use these server side with your app's credentials to access the Twitter API.
		var token = result.credential.accessToken;
		var secret = result.credential.secret;
		// The signed-in user info.
		// var user = result.user;

		usuario.id = result.user.uid;
		usuario.nombre = result.user.displayName;
		usuario.correo = result.user.email;
		usuario.imagen = result.user.photoURL;
		usuario.online = true;
		// Enviar datos del usuario a la base de datos MySQL
		$.ajax({
		  	url: 'controladores/index.php',
		  	type: 'POST',
		  	dataType: 'json',
		  	data: usuario,
		  })
		  .done(function(data) {
		  	if(data.resp){
		  		location.href="juego.html?id="+usuario.id;	
		  	}else if(data.resp===false){
		  		console.log('Hubo problemas al guardar los datos.')
		  	}else{
		  		console.log(data)
		  		location.href="juego.html?id="+usuario.id;	

		  	}
		  })
		  .fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);

			})		  
		agregarUsuario(usuario, db)
		
		
		// location.href="juego.html?id="+usuario.id;

		// console.log(token, secret)
		// ...
	  }).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;

		console.log(error)
		// ...
	  });
}

// Función para conexión con Facebook
function facebookAuth() {
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.addScope('user_birthday');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		usuario.id = result.user.uid;
	      usuario.nombre = result.user.displayName;
	      usuario.correo = result.user.email;
	      usuario.imagen = result.user.photoURL;
	      location.href="juego.html";
	      agregarUsuario(usuario, db)
	  // This gives you a Facebook Access Token.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	  console.log(user)
	});
}


////Función para almacenar usuarios en la db

function agregarUsuario(user, db){
	db.ref('usuariosConectados/'+user.id).set(user);
}

function renderUsuario(data, id){
	if(data.id===getParameterByName('id')){

	}else if (data.online===true) {
		var html = `
		<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${data.id}">
				${data.nombre}
			<input type="checkbox" id="${data.id}" value="${data.id}" class="mdl-checkbox__input conectados">
		</label>
		`;
		$(id).append(html);
	}
}

	// Letra aleatoria
function letraAleatoria(valor){
	var letra = valor[Math.floor(Math.random() * (valor.length - 0)) + 0];
	return letra;	
}

function renderLetra(letra) {
	// body...
	$('#letra').html(letra)

	var dialog = document.querySelector('#modal-letra');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
      dialog.showModal();
    setTimeout(function() {
      dialog.close();
    	// Agregar una nueva fila en la tabla
    	var html = `<tr>
			      <td class="mdl-data-table__cell--non-numeric">Dany</td>
			      <td>${letra}</td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="true" id="nombre">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="0" id="apellido">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="0" id="ciudad">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="0" id="pais">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="0" id="color">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" activo="0" id="animal">
					</div>
			      </td>
			      <td>
					<div style="width: 60px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<input class="mdl-textfield__input" type="text" id="fruto" activo="0">
					</div>
			      </td>
			      <td>
					1000000
			      </td>
			    </tr>`;
			    // Nombre
			$('#nombre').attr('disabled', 'true');
			$('#nombre').attr('id', '');
			// Apellido
			$('#apellido').attr('disabled', 'true');
			$('#apellido').attr('id', '');
			// Ciudad
			$('#ciudad').attr('disabled', 'true');
			$('#ciudad').attr('id', '');
			// País
			$('#pais').attr('disabled', 'true');
			$('#pais').attr('id', '');
			// Color
			$('#color').attr('disabled', 'true');
			$('#color').attr('id', '');
			// Animal
			$('#animal').attr('disabled', 'true');
			$('#animal').attr('id', '');
			// Fruto
			$('#fruto').attr('disabled', 'true');
			$('#fruto').attr('id', '');

    	$('#tablaStop').append(html)
    }, 9000)
    return letra
}


// Funcion para notificar al usuario
function notificar(data) {
	var snackbarContainer = document.querySelector('#demo-toast-example');
    'use strict';
    if (!data) {
    	var data = {message: 'Debes definir tu mensaje en JSON'};
    }
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

// Función para cerrar sesión 
function cerrarSesion() {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut()
		// alert("Estás cerrando sesión");
		location.href="index.html";
	}else{
		alert('Debes estar logueado');
	}
}


// Función para cambiar el estado de los usuarios cuando cierran sesión.
function cambioEstado(id) {
	db.ref('usuariosConectados/'+id).update({online:false})
}

// Función para cambiar el estado de las invitaciones.
function cambioEstadoInvitacion(idUsuario) {
	db.ref('invitaciones/'+idUsuario).update({confirmacion:true})
}


// Obtener variable encrustada en la url del navegador
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// function elim_rep(b){
//    n = 0; b.sort();
//    while(n < b.length){
// 	   	if(b[n+1] == b[n]){
// 		   	b.splice(n,1) 
// 	   	}else{ 

// 	   	}
// 		n++ 
// 	}
//    	return b;
// }