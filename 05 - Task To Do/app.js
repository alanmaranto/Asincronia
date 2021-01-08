const argv = require('yargs')
        .command('listar', 'Imprime en consola la tabla de multiplicar', {
          base: {
            demand: true,
            alias: 'b'
          },
          limit: {
            alias: 'l',
            default: 10
          }
        })
        .help()
        .argv;
const { createFile } = require("./multiplicar/multiplicar");


// let param = argv[2];
// let base = param.split("=")[1];

// console.log(base);

console.log(argv.base)
console.log(argv.limit)

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
//node app -l=20 -b 5  [con Shortcuts]
//node app --limit=20 --base 5  [sin shortcuts]
//node app -b 5   [sin enviar el limite, tomando el valor default]
// node app listar --help   [help de todos los comandos]
// node app --help   [help de todos los comandos]
