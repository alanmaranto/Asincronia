const { io } = require("../server");

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.emit("sendMessage", {
    user: "Admin",
    message: "Welcome to this app",
  });

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Listening Client
  client.on("sendMessage", (data, cb) => {
    console.log(data);

    client.broadcast.emit('sendMessage', data)

    /* if (messageFromClient.user) {
      cb({
        response: "Success",
      });
    } else {
      cb({
        response: "Error",
      });
    } */
  });
});
