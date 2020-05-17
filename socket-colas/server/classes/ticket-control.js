const data = require("../data/data.json");
const fs = require("fs");

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();

    if (data.today === this.today) {
      this.lastTicket = data.lastTicket;
    } else {
      this.resetCountdown();
    }
  }

  nextTicket() {
    this.lastTicket += 1;
    this.saveFile();

    return `Ticket ${this.lastTicket}`;
  }

  getLastTicket() {
    return `Ticket ${this.lastTicket}`;
  }

  resetCountdown() {
    this.lastTicket = 0;
    console.log("System reboot");
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
