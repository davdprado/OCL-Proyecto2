const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;

const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
const TS = require('../Arbol/tablaSimbolos').TS;

function ejecutar(arbol) {
    let salida='';
    let tsglobal = new TS([]);
    ejecutarBloque(arbol,tsglobal,undefined);
}

function ejecutarBloque(instrucciones,tsglobal,tslocal) {
    instrucciones.forEach((instruccion) => {
        if(instruccion.tipo==TIPO_INSTRUCCIONES.DECLARACION){
            //codigo para la declaracion
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.IMPRIMIR) {
            //codigo para imprimir
        }
    });
}

//hacer una funcion por cada instruccion para ejecutar lo antes visto
function ejecutraDeclaracion(instruccion,tsglobal,tslocal) {
    
}

function ejecutraImprimir(instruccion,tsglobal,tslocal) {
    
}

//funcion para procesar instruccion por cada instruccion
function procesarExpresion(expresion,tsglobal,tslocal) {
    if (expresion.tipo==TIPO_OPERACION.SUMA) { 
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno
        if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor+valorder.valor
            }

        }else if (valorizq.tipo==TIPO_DATO.CADENA && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor+String(valorder.valor)
            }
        }else if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:String(valorizq.valor)+valorder.valor
            }
        }else if (valorizq.tipo==TIPO_DATO.CADENA && valorder.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor+valorder.valor
            }
        }else{
            //error semantico 
            console.log('Error Semantico los tipos no se pueden sumar');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.RESTA) {
        
    }else if (expresion.tipo==TIPO_OPERACION.MULTIPLICACION) {
        
    }else if (expresion.tipo==TIPO_OPERACION.DIVISION) {
        
    }else if (expresion.tipo==TIPO_OPERACION.NEGATIVO) {
        
    }else if (expresion.tipo==TIPO_VALOR.DECIMAL) {
        
    }else if (expresion.tipo==TIPO_VALOR.CADENA) {
        
    }else if (expresion.tipo==TIPO_VALOR.BANDERA) {
        
    }else if (expresion.tipo==TIPO_VALOR.IDENTIFICADOR) {
        
    }
}