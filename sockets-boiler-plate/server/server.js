const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const path = require("path");

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//IO = Comunicación de sockets del backend
let io = socketIO(server);

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Listening Client
  client.on("sendMessage", (message) => {
    console.log(message);
  });
});

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
