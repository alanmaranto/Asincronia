class Users {
  constructor() {
    this.users = [];
  }

  // id socket
  addUser(id, name, room) {
    let user = {
      id,
      name,
      room,
    };

    this.users.push(user);

    return this.users;
  }

  getUser(id) {
    let user = this.users.filter((user) => user.id === id)[0]; // The first element who coincides with the id of the array w

    return user;
  }

  getAllUsers() {
    return this.users;
  }

  getUsersByRoom(room) {
    let usersByRoom = this.users.filter((user) => user.room === room);

    return usersByRoom;
  }

  deleteUser(id) {
    let deletedUser = this.getUser(id);
    // Replace the array of users with the users active in the chat
    this.users = this.users.filter((user) => user.id != id);

    return deletedUser;
  }
}

module.exports = {
  Users,
};
