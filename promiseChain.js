let db = require("./db");

let empleados = db.empleados;
let salarios = db.salarios;

let getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    let empleadoDB = empleados.find((empleado) => empleado.id === id);
    if (!empleadoDB) {
      reject(`No existe un empleado con el ID ${id}`);
    } else {
      resolve(empleadoDB);
    }
  });
};

let getSalario = (empleadoId) => {
  return new Promise((resolve, reject) => {
    let salarioDB = salarios.find((salario) => salario.id === empleadoId.id);
    if (!salarioDB) {
      reject(`No se encontró un salario para el usuario ${empleadoId.nombre}`);
    } else {
      resolve({
        nombre: empleadoId.nombre,
        salario: salarioDB.salario,
        id: empleadoId.id,
      });
    }
  });
};

getEmpleado(2)
  .then((empleado) => {
    return getSalario(empleado);
  })
  .then((response) => {
    console.log(`El salario de ${response.nombre} es de ${response.salario}`);
  })
  .catch((err) => {
    console.log(err);
  });
