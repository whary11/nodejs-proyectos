$(document).ready(function() {
	$('#chat').submit(function(event){
		event.preventDefault();

	var config = {
	    apiKey: "AIzaSyCBmTdh3gfy4SRrNxDXOmV53rpk43NtQ90",
	    authDomain: "enredes-f8244.firebaseapp.com",
	    databaseURL: "https://enredes-f8244.firebaseio.com",
	    projectId: "enredes-f8244",
	    storageBucket: "enredes-f8244.appspot.com",
	    messagingSenderId: "870210169558"
	  };
	firebase.initializeApp(config);


	//Inicio de sessión co Google

	var google = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(google).then(function(result) {

//////Comprobar si en un usuario nuevo
	// if (result.additionalUserInfo.isNewUser) {

	// }else{
	// alert("Ya eres usuario")

	// }
	  


	  var data = {
	    nombre:result.user.displayName,
	    correo:result.user.email,
	    imagen:result.user.photoURL,
	    id:result.user.uid
	  }
	  ///Se escribe el usuario y el mensaje en la base de datos
	  escribirUser(data)
	  var mensaje = $('#mensaje').val();
	  escribirmens(mensaje, data.id)

	})
	});




});


setTimeout(function(){

	// firebase.auth().signOut().then(function() {
	//   alert("se ha cerrado la sesion")
	// }).catch(function(error) {
	//   // An error happened.
	// });

	
},1000)









function escribirUser(data) {
  firebase.database().ref('users/'+data.id).set({
    id:data.id,
    username: data.nombre,
    email: data.correo,
    foto : data.imagen
  });
}
function escribirmens(mensaje, id) {
  firebase.database().ref('chat/'+id).push({
    id:id,
    mensaje: mensaje,
  });
}