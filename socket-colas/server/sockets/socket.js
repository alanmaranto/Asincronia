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
    actualState: ticketControl.getLastTicket()
  })
});
