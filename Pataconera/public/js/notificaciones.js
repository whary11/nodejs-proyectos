'use strict'
var socket = io()

/////////////////////////Conexión/////////////////////////////////
// var messages = 0;
var selectoressages = $('#messages span');
selectoressages.html(0)
socket.on('news-user', function (data) {
    // messages++;
    selectoressages.html(data.numMensajes)
    console.log(data.numMensajes+" usuarios conectados");
    // socket.emit('my other event', { my: 'Luis Fernando Raga' });
});










////////////////NO funciona aún la desconexión///////////////////

socket.on('user-desconnect', function (data) {
    selectoressages.html(data.numMensajes)
    console.log(data.numMensajes+" usuarios desconectados")
});