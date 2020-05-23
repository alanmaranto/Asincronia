const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("enterChat", (data, cb) => {

    if (!data.name || !data.room) {
      return cb({
        error: true,
        message: "Name and room are required",
      });
    }

    // Join an user into a room
    client.join(data.room);

    // socket id
    users.addUser(client.id, data.name, data.room);

    client.broadcast.to(data.room).emit("usersList", users.getUsersByRoom(data.room));

    // return users connected to chat
    cb(users.getUsersByRoom(data.room));
  });

  client.on("createMessage", (data) => {
    // The client must sent the data
    let user = users.getUser(client.id);
    let message = createMessage(user.name, data.message);
    client.broadcast.to(user.room).emit("createMessage", message);
  });

  // socket id has already id
  client.on("disconnect", () => {
    let deletedUser = users.deleteUser(client.id);

    client.broadcast.to(deletedUser.room).emit(
      "createMessage",
      createMessage("Admin", `${deletedUser.name} left`)
    );

    client.broadcast.to(deletedUser.room).emit("usersList", users.getUsersByRoom(deletedUser.room))
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
