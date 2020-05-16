var socket = io();

// Escuchar
socket.on("connect", function () {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar Información
socket.emit(
  "sendMessage",
  {
    user: "Alan",
    message: "Message from Alan",
  },
  function (responseFromServer) {
    console.log("Respuesta Server;", responseFromServer);
  }
);

// Escuchar
socket.on("sendMessage", function (messageFromServer) {
  console.log("Servidor", messageFromServer);
});
