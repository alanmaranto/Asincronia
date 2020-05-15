const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get("/", function (req, res) {
  res.json("Hello world");
});

app.get("/usuario", function (req, res) {
  res.json("get usuario");
});

app.post("/usuario", function (req, res) {
    let body = req.body;
  res.json({
      body
  });
});

app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  res.json({
      id
  });
});

app.delete("/usuario", function (req, res) {
  res.json("delete usuario");
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`);
});
