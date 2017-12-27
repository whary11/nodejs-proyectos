'use strict'

  // Inicializar Firebase (Estos datos los arroja la interface de firebase)
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
  $('#inicio-google').click(function(){
    var google = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(google).then(function(result) {
      // console.log(result.user)
      var data = {
        nombre:result.user.displayName,
        correo:result.user.email,
        imagen:result.user.photoURL,
        id:result.user.uid
      }
      escribirUser(data)
      pintarUser(data)
    })
  });
//Detectar la conexión de nuevos usuarios
// firebase.database().ref('users/')
// .on('child_added', function(documento){
//   console.log(documento.val())
//   pintarUser(documento.val())
// })
























//Función para escribir en la base de datos
function escribirUser(data) {
  firebase.database().ref('users/'+data.id).set({
    id:data.id,
    username: data.nombre,
    email: data.correo,
    foto : data.imagen
  });
}

//Función para pintar los usuarios en elsitio web
  function pintarUser(user){
    let html = `
        <div class="card" style="width:20em;">
        <img width:100px;max-height:50px; class="card-img-top" src="${user.foto}" alt="${user.nombre}">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">${user.correo}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`;
    $('#users').append(html);
  }