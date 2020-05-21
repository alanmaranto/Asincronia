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

    // socket id
    let allUsers = users.addUser(client.id, data.name);

    client.broadcast.emit("usersList", users.getAllUsers());

    // return users connected to chat
    cb(allUsers);
  });

  // socket id has already id
  client.on("disconnect", () => {
    let deletedUser = users.deleteUser(client.id);

    client.broadcast.emit("createMessage", {
      user: "Admin",
      message: `${deletedUser.name} has left the chat`,
    });

    client.broadcast.emit("usersList", users.getAllUsers());
  });
});
