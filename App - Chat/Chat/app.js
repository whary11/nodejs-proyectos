'use strict'
var app = require('express')();
var http = require('http').Server(app);
var puerto = 8080;
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
// Recibir mensajes desde el cliente
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	// Emitir mensajes al cliente
    io.emit('chat message', msg);
  });


  socket.on('escribiendo', function(mensaje){
    socket.broadcast.emit('escribiendo', '......');
  })
});

http.listen(puerto, function(){
  console.log('Escuchando en el puerto *: '+puerto);
});