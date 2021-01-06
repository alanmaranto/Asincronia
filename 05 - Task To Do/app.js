const { createFile } = require("./multiplicar/multiplicar");

let argv = process.argv;
let param = argv[2];
let base = param.split("=")[1];

console.log(base);

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

// comando a ejecutar
//node app --base={tu_numero}
