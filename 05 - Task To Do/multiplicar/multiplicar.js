const fs = require("fs");

let createFile = (base) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject("Is not a number");
      return;
    }
    let data = "";

    for (let i = 1; i <= 10; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`tablas/tabla${base}.txt`, data, (err) => {
      if (err) reject(err);
      else resolve(`tabla${base}.txt`);
    });
  });
};

module.exports = {
  createFile,
};
