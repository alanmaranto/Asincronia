const { io } = require('../server');


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('sendMessage', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('sendMessage', (data, callback) => {

        console.log(data);

        client.broadcast.emit('sendMessage', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

});