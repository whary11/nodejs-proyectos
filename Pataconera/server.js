'use strict'
var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var puerto = 8080;
var jade = require('jade')

////////////////////////////////////use////////////////////////////
app.use(express.static('public'))
app.set('view engine', 'jade')


///////////////Rutas//////////////////////
app.get('/', (solicitud, respuesta) => {
	respuesta.render('index');
})
app.get('/login', (solicitud, respuesta) => {
	respuesta.render('admin/login')
})
app.get('/registro', (solicitud, respuesta) => {
	respuesta.render('admin/registro')
})

app.listen(puerto, () => {
	console.log("Correndo en el puerto: "+puerto);
});