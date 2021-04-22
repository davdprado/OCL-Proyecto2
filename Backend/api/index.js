const express = require("express");


const app = express();app.listen(8080, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

app.get('/analizar',function (req, res) {
    console.log('Peticion GET')
    res.send('Saludos desde express')
})
