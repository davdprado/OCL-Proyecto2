var express = require('express');
var router = express.Router();
var parser = require('./Ejemplo/Analisis/gramatic');
var interprete = require('./Ejemplo/interprete/interprete').ejecutar;
//este es solo de prueba
//var parser = require('./Analizadores/gramatica');

/* GET users listing. */

router.post('/',function(req,res,next) {
  let salida='';
    try {
      var nueva = req.body.informacion;
      let arbol = parser.parse(nueva);
      salida=interprete(arbol);
      res.statusCode =200;
      res.json({respuesta:salida});
    } catch (e) {
      console.log(e);
      res.statusCode =200;
      res.json({respuesta:salida});
    }
  });

module.exports = router;