var express = require('express');
var router = express.Router();
var parser = require('./Ejemplo/Analisis/gramatic');
var interprete = require('./Ejemplo/interprete/interprete').ejecutar;

//este es solo de prueba
//var parser = require('./Analizadores/gramatica');

/* GET users listing. */

router.post('/',function(req,res,next) {
  let salidaCon='';
    try {
      var nueva = req.body.informacion;
      let arbol = parser.parse(nueva);
      var salida =interprete(arbol);
      salidaCon=salida.salida;
      errorT=salida.errores;
      res.statusCode =200;
      res.json(
        {
          respuesta:salidaCon,
          error:errorT
        });
    } catch (e) {
      console.log(e);
      res.statusCode =200;
      res.json({
        respuesta:salidaCon,
        error:errorT
      });
    }
  });

module.exports = router;