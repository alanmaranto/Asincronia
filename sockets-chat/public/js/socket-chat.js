var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has('room')) {
  window.location = "index.html";
  throw new Error("name and room are required");
}

var user = {
  name: params.get("name"),
  room: params.get("room")
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("enterChat", user, function (response) {
    console.log("Users connected", response);
    renderUsers(response)
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Escuchar información
socket.on("createMessage", function (message) {
  console.log("Servidor:", message);
});

// When an user enter or left chat
socket.on("usersList", function (users) {
  console.log("Servidor:", users);
  renderUsers(users)
});

// Private Messages
socket.on("privateMessage", function (message) {
  console.log("Private message", message);
});
