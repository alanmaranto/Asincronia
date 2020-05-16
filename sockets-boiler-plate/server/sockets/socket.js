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
  client.on("sendMessage", (messageFromClient, cb) => {
    console.log(messageFromClient);
    if (messageFromClient.user) {
      cb({
        response: "Success",
      });
    } else {
      cb({
        response: "Error",
      });
    }
  });
});
