	var invotaciones = 0;
	db.ref('usuariosConectados').on('child_added', function(data){
		var usuarios = data.val();
		renderUsuario(usuarios, "#contenido");
	})

	db.ref('/usuariosConectados').on('child_changed', (data)=>{
		renderUsuario(data.val(), "#contenido")
	})
	// })
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
		// Guardar datos en la base de datos y emitir una calificación....

		var datos = {
			increment: 1,
			id: getParameterByName('id'),
			nombre: nombre,
			apellido: apellido,
			ciudad: ciudad,
			pais: pais,
			color: color,
			animal: animal,
			fruto: fruto,
			stop: false
		}
		db.ref('Partidas/').push(datos);
		// console.log(datos)

		// Función para seleccionar las letras aleatoriamente
		var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		numAleatorio(letras)
	}

})




	// console.log(firebase.auth().currentUser)
	// Cerrar sesión
	$('#cerrar').click(function() {
		// Recuperar el id del usuario conectado y pasarselo como parámetro a la función cambioEstado(id)
		cambioEstado(getParameterByName('id'));
		cerrarSesion();
	})

//////crear sala de juego 

$('#sala').click(()=>{
	// alert('hoola')
	var dialog = document.querySelector('#modal-sala');
    var showDialogButton = document.querySelector('#cerrar-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
	}
	// Renderizar usuarios
	//renderUsuario()

   
      dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
})