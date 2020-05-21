const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require('../utils/utils')

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

    // socket id
    let allUsers = users.addUser(client.id, data.name);

    client.broadcast.emit("usersList", users.getAllUsers());

    // return users connected to chat
    cb(allUsers);
  });

  client.on('createMessage', (data) => {
    // The client must sent the data
    let user = users.getUser(client.id)
    let message = createMessage(user.name, data.message);
    client.broadcast.emit('createMessage', message)
  })

  // socket id has already id
  client.on("disconnect", () => {
    let deletedUser = users.deleteUser(client.id);

    client.broadcast.emit("createMessage", createMessage('Admin', `${deletedUser.name} left`));

    client.broadcast.emit("usersList", users.getAllUsers());
  });
});
