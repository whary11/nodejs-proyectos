'use strict'
var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var puerto = 8080;
var jade = require('jade')
///////////Variables///////Globales
var numMensajes = 0;
////////////////////////////////////use////////////////////////////
app.use(express.static('public'))
app.set('view engine', 'jade')




///////////////Rutas//////////////////////
app.get('/', (solicitud, respuesta) => {
	io.on('connection', (socket) => {
		numMensajes++;
		socket.emit('news-user', { numMensajes: numMensajes });

		console.log(numMensajes+" usuarios conectados")


/////deconexión//////////////////////
		socket.on('disconnect', (data) => {
			numMensajes--;
			socket.emit('user-desconnect', {numMensajes:numMensajes})
			console.log(numMensajes+" usuarios desconectados")
		});
	
	});
	


	respuesta.render('index');
	
})








































app.get('/login', (solicitud, respuesta) => {
	respuesta.render('admin/login')
})
app.get('/registro', (solicitud, respuesta) => {
	respuesta.render('admin/registro')
})

http.listen(puerto, () => {
	console.log("Correndo en el puerto: "+puerto);
});