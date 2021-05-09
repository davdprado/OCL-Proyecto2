var express = require('express');
var router = express.Router();
var parser = require('./Ejemplo/Analisis/gramatic');
var interprete = require('./Ejemplo/interprete/interprete').ejecutar;
const fs = require('fs');

//este es solo de prueba
//var parser = require('./Analizadores/gramatica');

/* GET users listing. */

router.post('/',function(req,res,next) {
  let salidaCon='';
    try {
      var nueva = req.body.informacion;
      let arbol = parser.parse(nueva);
      var salida =interprete(arbol);
      var grafico = analisis(arbol);
      salidaCon=salida.salida;
      errorT=salida.errores;
      simboT=salida.simbolos;
      res.statusCode =200;
      let absu=JSON.stringify(arbol);
      fs.writeFileSync('ast.json',absu);
      res.json(
        {
          respuesta:salidaCon,
          error:errorT,
          simbolos:simboT,
          grafico:grafico
        });
    } catch (e) {
      console.log(e);
      res.statusCode =200;
      res.json({
        respuesta:salidaCon,
        error:errorT,
        simbolos:simboT
      });
    }
  });

  var analisis = (function(arbol) {
    var contador = 1;
    var dot = 'digraph G{\n';
    imprimir(arbol);
    dot += '}';
    return dot;

    function objeto(lista, padre) {
        Object.keys(lista).forEach((valor) => {
            if (Array.isArray(lista[valor])) {
                //console.log(padre + '->' + valor);
                var hijo = crearNodo(valor);
                dot += padre + '->' + hijo + '\n';
                arreglo(lista[valor], hijo);
            } else if (typeof lista[valor] === 'object') {
                var hijo = crearNodo(valor);
                dot += padre + '->' + hijo + '\n';
                //console.log(padre + '->' + valor);
                objeto(lista[valor], hijo);
            } else {
                var hijo = crearNodo(lista[valor]);
                dot += padre + '->' + hijo + ';\n';
                //console.log(padre + '->' + lista[valor]);
            }
        });

    }

    function arreglo(lista, padre) {
      //console.log(lista);
        lista.forEach((valor) => {
            if (typeof valor === 'object') {
                //console.log('Tu parde es: ' + padre)

                objeto(valor, padre);
            } else if (Array.isArray(valor)) {
                arreglo(valor, padre);
            }
        });
    }

    function imprimir(lista) {
        var padre = crearNodo('RAIZ');
        arreglo(lista, padre);
    }

    function crearNodo(nodo) {
        var nombrehijo = "n" + contador;
        dot += nombrehijo + "[label=\"" + String(nodo).replace(/"/gi, "\\\"") + "\"];\n";
        contador++;
        return nombrehijo;
    }

});



module.exports = router;