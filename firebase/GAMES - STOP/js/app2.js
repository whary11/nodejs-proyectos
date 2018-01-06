



// Pruebas de la base de datos firebase

// Escrituras

function insertarSet(data) {
	return db.ref("pruebasLuis").set(data);
}

function insertarPush(data) {
	return db.ref("pruebasLuis").push(data);
}

var data1 = {
	nombre:"Luis Fernando r",
	apellido: "Raga",
	edad:27,
	profesion:"Desarrollador Web",
	ciudad:"Bogotá",
	fecha:null
}


$('#insertar').click(()=>{
	// Esta acción devuelve una promesa
	insertarPush(data1).then((result)=>{
		console.log(result)
	})
});

////////Lectura de datos/////////
	// El evento child_added devuelve todos los documentos en la bd cuando se ejecuta por primera ves, y en edalante devuelve el elemento insertado
	// No detecta cuando se hacen cambios dentro de un documento
	db.ref('pruebasLuis').on('child_added', (datos)=>{
		// console.log(datos.val())
	});
	// El evento child_changed se ejecuta cuando cambian los datos al interior de un documento y devuelve ese documento
	db.ref('pruebasLuis').on('child_changed', (datos)=>{
		// console.log(datos.val())
	})
	// El evento child_removed se ejecuta cuando se elimina un documento y devuelve el documento eliminado
	db.ref('pruebasLuis').on('child_removed', (datos)=>{
		// console.log(datos.val())

	})
	// El evento value detenta todos los eventos anteriormente mencionados pero con la diferencia que devuelve todos los documentos son discriminar en cual sucedio el evento.
	// Utilizando en metodo once en reemplazo del on, podemos decirle a js que sólo ejecute este evento una vez y no continue escuchando
	db.ref('pruebasLuis').limitToLast(2).on('value', (datos)=>{
		// console.log(datos.val())
	})
// });


