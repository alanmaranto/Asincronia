const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function(req,res) {
    res.json('Hello world')
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})