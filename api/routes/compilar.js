var express = require('express');
var router = express.Router();
var parser = require('./Ejemplo/Analisis/gramatic');
//este es solo de prueba
//var parser = require('./Analizadores/gramatica');

/* GET users listing. */

router.post('/',function(req,res,next) {
    try {
      var nueva = req.body.informacion;
      console.log(nueva);
      let arbol = parser.parse(nueva);
      res.statusCode =200;
      res.json({respuesta:"funciono"});
    } catch (e) {
      console.log(e);
      res.statusCode =200;
      res.json({respuesta:e});
    }
  });

module.exports = router;