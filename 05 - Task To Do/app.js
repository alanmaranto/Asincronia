const { createFile } = require("./multiplicar/multiplicar");

let base = 10;

// with Promise
/* createFile(base)
  .then((file) => {
    console.log(`Archivo creado: ${file}`);
  })
  .catch((err) => console.log(err)); */

// with async-await
const createdNumber = async () => {
  try {
    const number = await createFile(base);
    console.log(number);
    return number;
  } catch (err) {
    console.log(err);
  }
};

createdNumber();
