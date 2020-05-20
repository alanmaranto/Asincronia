const { io } = require("../server");
const { Users } = require("../classes/users");

const users = new Users();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("enterChat", (data, cb) => {
    if (!data.name) {
      return cb({
        error: true,
        message: "Name is required",
      });
    }

    let allUsers = users.addUser(client.id, data.name);

    // return users connected to chat
    cb(allUsers);
  });
});
