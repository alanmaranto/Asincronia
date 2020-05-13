let db = require("./db");

let empleados = db.empleados;
let salarios = db.salarios;

let getEmpleado = (id, cb) => {
  let empleadoDB = empleados.find((empleado) => empleado.id === id);

  if (!empleadoDB) {
    cb(`No existe un empleado con el ID ${id}`);
  } else {
    cb(null, empleadoDB);
  }
};

let getSalario = (empleadoId, cb) => {
  let salarioDB = salarios.find((salario) => salario.id === empleadoId.id);

  if (!salarioDB) {
    cb(`No se encontró un salario para el usuario ${empleadoId.nombre}`);
  } else {
    cb(null, {
      nombre: empleadoId.nombre,
      salario: salarioDB.salario,
      id: empleadoId.id,
    });
  }
};

getEmpleado(3, (err, empleado) => {
  if (err) {
    return console.log(err);
  }

  getSalario(empleado, (err, response) => {
    if (err) {
      return console.log(err);
    }

    console.log(`el salario de ${response.nombre} es de ${response.salario}`);
  });

});
