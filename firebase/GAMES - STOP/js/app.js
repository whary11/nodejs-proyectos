	var invotaciones = 0;
	var letra;
	var numSala;

	// Eventos
	db.ref('usuariosConectados').on('child_added', function(data){
		var usuarios = data.val();
		renderUsuario(usuarios, "#contenido");
	})

	db.ref('/usuariosConectados').on('child_changed', (data)=>{
		renderUsuario(data.val(), "#contenido")
	})

	// var usuarios;
	db.ref('invitaciones').on('value', function(data){
		// console.log(data);
		var usuarios = Object.values(data.val());
		usuarios.map((usuario)=>{
			// console.log(usuario);
			if (usuario.idCreador===getParameterByName('id')) {
				
			}else if(usuario.idUsuario != getParameterByName('id')){

			}else if(usuario.confirmacion){


			}else{
				// console.log(usuario)
				// alert('Tienes una invitación pendiente: ' +usuario.idSala)
				$('#invitacion').append(`
					<br>
					<center>
						<div id="nada-${usuario.idUsuario}">
							<button id="${usuario.idUsuario}" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
								<i class="material-icons">done</i>
							</button>
						<div>
						<div class="mdl-tooltip" data-mdl-for="nada-${usuario.idUsuario}">
							${usuario.idCreador}
						</div>
					</center>`
					)
				var mensaje = {
					message: 'Tines una invitación pendiente.',
					timeout: 4000,
					actionText: 'Undo'
				}
			notificar(mensaje)
				// console.log(usuario)
				// cambia el estado de la invitación
	$(`#${usuario.idUsuario}`).click(function() {
		// Recuperar el id del usuario conectado y pasarselo como parámetro a la función cambioEstadoInvitacion(id)
		cambioEstadoInvitacion(getParameterByName('id'));
		alert('cambiaste el estado')
	})
			}
		})
	})

	// Lógica del juego
	// Valida los datos ingresados
	// validar si el usuario ya envío la invitación a otros usuarios para jugar
$('#stop').click(()=>{
	// Nombre
	var nombre = $('#nombre').val()
	// Apellido
	var apellido = $('#apellido').val()
	// Ciudad
	var ciudad = $('#ciudad').val()
	// País
	var pais = $('#pais').val()
	// Color
	var color = $('#color').val()
	// Animal
	var animal = $('#animal').val()
	// Fruto
	var fruto = $('#fruto').val()

	if (nombre==='' || apellido==='' || ciudad==='' || pais==='' || color==='' || animal==='' || fruto==='') {
		var notificacion = {
		      message: 'Tienes campos vacios y el tiempo se está agotando',
		      timeout: 4000,
		      actionText: 'Undo'
		};
		notificar(notificacion)
		



	}else{
		// Validar las respuestas del usuario mediante consultas sql
		// Guardar datos en la base de datos y emitir una calificación....
		var datos = {
			letra:letra,
			increment: 1,
			id: getParameterByName('id'),
			nombre: nombre,
			apellido: apellido,
			ciudad: ciudad,
			pais: pais,
			color: color,
			animal: animal,
			fruto: fruto,
			// Falta almacenar el id de la sala
			idSala:'',
			stop: false
		};
		db.ref('Partidas/').push(datos);
		// Función para seleccionar las letras aleatoriamente
		// letraAleatoria(letras)
	}

})

	// Cerrar sesión
	$('#cerrar').click(function() {
		// Recuperar el id del usuario conectado y pasarselo como parámetro a la función cambioEstado(id)
		cerrarSesion();
		cambioEstado(getParameterByName('id'));
	})

//////crear sala de juego 

$('#sala').click(()=>{

	var dialog = document.querySelector('#modal-sala');
    var showDialogButton = document.querySelector('#cerrar-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
	}
	// Renderizar usuarios
  
      dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
})

$('#crear-sala').click(()=>{
	var idUser = [];    
	$('input[type=checkbox]').each(function(){
		if (this.checked) {
			idUser.push($(this).val());
		}
	}); 

	if (idUser != '' ){
		if(idUser.length != $('#numjugadores').val()){
			// Enviar notificación al usuario
			var mensaje = {
				message: 'El número debe ser igual',
				timeout: 4000,
				actionText: 'Undo'
			}
			notificar(mensaje)
		}else{
			// alert('Has seleccionado: '+selected);
		// var numSala = "";
		var valor = 1000000000000000000;
		numSala = Math.floor(Math.random() * (valor)) + 0
		var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		letra = letraAleatoria(letras);
		idUser.map((id)=>{
			var solicitud = {
				idSala:numSala,
				idUsuario: id,
				confirmacion: false,
				idCreador: getParameterByName('id'),
				letra: letra
			}
			// Insertar en MySQL
			$.ajax({
				url: 'controladores/index.php',
				type: 'POST',
				dataType: 'json',
				data:solicitud,
			})
			.done(function(data) {
				console.log(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);

			})
			

			db.ref('invitaciones/'+id).set(solicitud);
		})
		}

		// console.log(selected)

	}else{
		alert('Debes seleccionar al menos una opción.');
	}

})


// Probando los eventos de firebase

// db.ref('Partidas').on('child_added', (data)=>{
// 	console.log(data.val())
// })




// Probando las respuestas php

// $.ajax({
// 	url: 'controladores/funciones.php',
// 	type: 'POST',
// 	dataType: 'json',
// 	data: {param1: 'value1'},

// })
// .done(function(data) {
// 	console.log(data);
// })
// .fail(function(jqXHR, textStatus, errorThrown) {
// 	console.log(jqXHR);
// 	console.log(textStatus);
// 	console.log(errorThrown);

// })