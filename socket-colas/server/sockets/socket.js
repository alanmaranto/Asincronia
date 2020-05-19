const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("nextTicket", (data, cb) => {
    let next = ticketControl.nextTicket();
    console.log(next);
    cb(next)
  });

  client.emit('actualState', {
    actualState: ticketControl.getLastTicket(),
  })

  client.on('attendTicket', (data, cb) => {
    if (!data.deskAssignedToTicket) {
      return cb({
        err: true,
        message: 'The desk is neccesary'
      })
    }

    let attendTicket = ticketControl.attendTicket(data.deskAssignedToTicket);

    cb(attendTicket);

    // Notify or updadte changes in last four tickets
  })
});
