'use strict'
var express = require('express')
var app = express();
var http = require('http').createServer(app);
// var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// var io = require('socket.io').listen(http);
var puerto = 8080;
var jade = require('jade')
///////////Variables///////Globales
var numMensajes = 0;
////////////////////////////////////use////////////////////////////
app.use(express.static('public'))
app.set('view engine', 'jade')




///////////////Rutas//////////////////////
app.get('/', (solicitud, respuesta) => {
	io.on('connection', (client)=>{
		numMensajes++
		// client.on('new-usuario', (data)=>{
			client.emit('new-userConect', {numMensajes:numMensajes})
			console.log(client)
		// });
		client.on('disconnect', function(){});
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