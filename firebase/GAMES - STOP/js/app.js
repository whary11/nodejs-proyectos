	var invitaciones = [];
	var letra = 'Q';
	var numSala = 0;
	var nombrePartida = [];
	var apellidoPartida = [];
	var ciudadPartida = [];
	var paisPartida = [];
	var colorPartida = [];
	var animalPartida = [];
	var frutoPartida = [];
	var numeroJugadoresDb = [];
	var conteonombre = 0;
	var conteoapellido = 0;
	var conteociudad = 0;
	var conteopais = 0;
	var conteocolor = 0;
	var conteoanimal = 0;
	var conteofruto = 0;
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
		// console.log(data.val());


		var usuarios = Object.values(data.val());

		usuarios.map((usuario)=>{
			// console.log(usuario);
		invitaciones.push(usuario.confirmacion)
			if (usuario.idCreador===getParameterByName('id') || usuario.idUsuario != getParameterByName('id') || usuario.confirmacion) {
				

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


				// cambia el estado de la invitación
				$(`#${usuario.idUsuario}`).click(function() {
					// Recuperar el id del usuario conectado y pasarselo como parámetro a la función cambioEstadoInvitacion(id)
					cambioEstadoInvitacion(getParameterByName('id'));
					alert('cambiaste el estado')
				})


				// Falta hacer la comparación para validar elinicio del juego y mostrar la letra a los usuarios
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
		
		


	}else if(nombre[0]!=letra || apellido[0]!=letra || ciudad[0]!=letra || pais[0]!=letra || color[0]!=letra || animal[0]!=letra || fruto[0]!=letra){
	
		var notificacion = {
		      message: 'Las palabras deben empezar por la letra '+letra,
		      timeout: 4000,
		      actionText: 'Undo'
		};
		notificar(notificacion)



	}else{// Guardar datos en la base de datos y emitir una calificación....
		var datos = {
			letra:"Q",
			id: getParameterByName('id'),
			nombre: nombre,
			apellido: apellido,
			ciudad: ciudad,
			pais: pais,
			color: color,
			animal: animal,
			fruto: fruto,
			// Falta almacenar el id de la sala
			idSala:0,
			stop: false
		};
		db.ref('Partidas/').push(datos);
		// Guardar partidas en MySQL
		$.ajax({
			url: 'controladores/index.php',
			type: 'POST',
			dataType: 'json',
			data: datos,
		})
		.done(function(data) {
			// console.log(data);

			if (data.resp) {
				// Validar las respuestas del usuario mediante consultas sql
				// Validar las partidas del juego
				
				$.ajax({
					url: 'controladores/index.php',
					type: 'POST',
					dataType: 'json',
					data: {req:true,idSala:0},
				})
				.done(function(partidas) {
					// console.log(partida);
					// Validar las partidas de los usuarios
					partidas.map(function(partida) {
						
						// Validar aquí los datos de la partida para todos los usuarios





					})

				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);

				})

				// //Obtener las partidas desde firebase
				db.ref('Partidas').once('value', function(data){
					// console.log(Object.values(data.val()))
					Object.values(data.val()).map(function(elem) {
						// Validar que sea de la misma sala
						if (numSala===elem.idSala) {
							nombrePartida.push(elem.nombre)
							apellidoPartida.push(elem.apellido)
							ciudadPartida.push(elem.ciudad)
							paisPartida.push(elem.pais)
							colorPartida.push(elem.color)
							animalPartida.push(elem.animal)
							frutoPartida.push(elem.fruto)
						}
					})

				})
				// Validar los nombres almacenados
				// console.log(apellidoPartida)
				// db.ref('invitaciones').once('value', (invitacion)=>{
				// 	Object.values(invitacion.val()).map(function(elem) {
				// 		if (numSala===elem.idSala){
				// 			numeroJugadoresDb.push(elem.numJugadores)
				// 		}
				// 	})
				// })
				// numeroJugadoreDb[0];
				// console.log(parseInt(numeroJugadoresDb[0]))
				numeroJugadoresDb = parseInt(numeroJugadoresDb[0])-1;
				// console.log(apellidoPartida.indexOf(numeroJugadoresDb));
				// var conteo= 0;

				console.log(apellidoPartida)
				apellidoPartida.map((elem)=>{
  						
					// console.log(apellidoPartida.includes(elem))
					if (apellidoPartida.includes(elem)) {
						conteoapellido++;
						
						console.log(elem);
					}



				})
				apellidoPartida.splice(0, apellidoPartida.length)
				console.log(conteoapellido)

				// console.log(elim_rep(apellidoPartida));
				// console.log(nombrePartida, apellidoPartida, ciudadPartida, paisPartida, frutoPartida)
			}






		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);

		})

		
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
				letra: letra,
				numJugadores:$('#numjugadores').val()
			}
			// Insertar en MySQL
			db.ref('invitaciones/'+id).set(solicitud);
			$.ajax({
				url: 'controladores/index.php',
				type: 'POST',
				dataType: 'json',
				data:solicitud,
			})
			.done(function(data) {
				// Actuar de acuerdo a la respuesta del servidor
				if (data.resp) {
					// console.log(data);
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);

			})
			

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