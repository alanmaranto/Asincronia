const data = require("../data/data.json");
const fs = require('fs');

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();

    if (data.today === this.today) {
    } else {
        this.resetCountdown();
    }
  }

  resetCountdown() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);

    console.log('System reboot')
  }
}

module.exports = {
  TicketControl,
};
