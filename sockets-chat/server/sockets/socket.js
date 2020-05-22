const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("enterChat", (data, cb) => {

    console.log('data', data)
    if (!data.name || !data.room) {
      return cb({
        error: true,
        message: "Name and room are required",
      });
    }

    // Join an user into a room
    client.join(data.room);

    // socket id
    let allUsers = users.addUser(client.id, data.name, data.room);

    client.broadcast.emit("usersList", users.getAllUsers());

    // return users connected to chat
    cb(allUsers);
  });

  client.on("createMessage", (data) => {
    // The client must sent the data
    let user = users.getUser(client.id);
    let message = createMessage(user.name, data.message);
    client.broadcast.emit("createMessage", message);
  });

  // socket id has already id
  client.on("disconnect", () => {
    let deletedUser = users.deleteUser(client.id);

    client.broadcast.emit(
      "createMessage",
      createMessage("Admin", `${deletedUser.name} left`)
    );

    client.broadcast.emit("usersList", users.getAllUsers());
  });

  // Private Messages
  client.on("privateMessage", (data) => {
    // User who send message
    let user = users.getUser(client.id);
    client.broadcast.to(data.para).emit(
      "privateMessage",
      createMessage(user.name, data.message)
    );
  });
});
