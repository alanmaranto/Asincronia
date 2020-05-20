var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('sendMessage', {
    usuario: 'Alan',
    mensaje: 'Hello'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('sendMessage', function(mensaje) {

    console.log('Servidor:', mensaje);

});