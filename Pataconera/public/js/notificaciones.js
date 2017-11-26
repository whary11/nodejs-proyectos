'use strict'
var io = io();
// alert('Hola Luis Fernando Raga Renteria')
/////////////////////////Notificaciónes por cada Conexión/////////////////////////////////
io.on('connection', (socket) => {
    socket.on('new-userConect', (data) => {
        console.log(data)
        alert(data)
        
    })
    let token = socket.handshake.query.token;
    console.log(token)
    // ...
  });

