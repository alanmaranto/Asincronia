const data = require("../data/data.json");
const fs = require("fs");

class Ticket {
  constructor(tickerNumber, deskAssignedToTicket) {
    this.ticketNumber = tickerNumber;
    this.deskAssignedToTicket = deskAssignedToTicket;
  }
}

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    this.pendingTickets = [];

    if (data.today === this.today) {
      this.lastTicket = data.lastTicket;
      this.tickets = data.tickets;
    } else {
      this.resetCountdown();
    }
  }

  nextTicket() {
    this.lastTicket += 1;

    let ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);
    
    this.saveFile();

    return `Ticket ${this.lastTicket}`;
  }

  getLastTicket() {
    return `Ticket ${this.lastTicket}`;
  }

  resetCountdown() {
    this.lastTicket = 0;
    this.tickets = [];
    console.log("System reboot");
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets: this.tickets
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
