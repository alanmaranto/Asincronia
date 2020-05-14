let db = require("./db");

let empleados = db.empleados;
let salarios = db.salarios;

let getEmpleado = async (id) => {
  let empleadoDB = await empleados.find((empleado) => empleado.id === id);
  if (!empleadoDB) {
    throw new Error(`No existe un empleado con el ID ${id}`);
  } else {
    return empleadoDB;
  }
};

let getSalario = async (empleadoId) => {
  let salarioDB = await salarios.find(
    (salario) => salario.id === empleadoId.id
  );
  if (!salarioDB) {
    throw new Error(
      `No se encontró un salario para el usuario ${empleadoId.nombre}`
    );
  } else {
    return {
      nombre: empleadoId.nombre,
      salario: salarioDB.salario,
      id: empleadoId.id,
    };
  }
};

let getInformation = async (id) => {
  try {
    let empleado = await getEmpleado(id);
    let response = await getSalario(empleado);
    console.log(response);
    return `${response.nombre} tiene un salario ${response.salario}`;
  } catch (err) {
    throw new Error(err);
  }
};

getInformation(1)
  .then((msj) => console.log(msj))
  .catch((err) => {
    console.log(err);
  });
