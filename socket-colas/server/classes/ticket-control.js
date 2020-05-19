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
    this.lastFourTickets = [];

    if (data.today === this.today) {
      this.lastTicket = data.lastTicket;
      this.tickets = data.tickets;
      this.lastFourTickets = data.lastFourTickets;
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

  attendTicket(deskAssignedToTicket) {
    // Verify if there are tickets to attend
    if (this.tickets.length === 0) {
      return ('There are not more tickets')
    }

    // Extract ticket number to break the relation of js with the objects pass as referenced
    let ticketNumber = this.tickets[0].ticketNumber;

    // Delete first element of array of tickets
    this.tickets.shift();

    // Create a new ticket with the ticket and the desk to be attend
    let attendTicket = new Ticket(ticketNumber, deskAssignedToTicket);

    // Put into the first element of the array
    this.lastFourTickets.unshift(attendTicket);

    // Verify if there are only 4 tickets in the array
    if (this.lastFourTickets.length > 4) {
      this.lastFourTickets.splice(-1,1); // Delete the last element of the array
    }

    console.log('ultimos 4', this.lastFourTickets);

    this.saveFile();

    return attendTicket;
  }

  resetCountdown() {
    this.lastTicket = 0;
    this.tickets = [];
    this.lastFourTickets = [];

    console.log("System reboot");
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets: this.tickets,
      lastFourTickets :this.lastFourTickets,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
