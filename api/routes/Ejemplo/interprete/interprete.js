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
            };

        }else if (valorizq.tipo==TIPO_DATO.CADENA && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor+String(valorder.valor)
            };
        }else if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:String(valorizq.valor)+valorder.valor
            };
        }else if (valorizq.tipo==TIPO_DATO.CADENA && valorder.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor+valorder.valor
            };
        }else if (valorizq.tipo==TIPO_DATO.BANDERA && valorder.tipo==TIPO_DATO.BANDERA) {
            return{
                tipo:TIPO_DATO.BANDERA,
                valor:valorizq.valor+valorder.valor
            };
        }else if (valorizq.tipo==TIPO_DATO.CADENA && valorder.tipo==TIPO_DATO.BANDERA) {
            return{
                tipo:TIPO_DATO.CADENA, 
                valor:valorizq.valor+String(valorder.valor)
            };
        }else{
            //error semantico 
            console.log('Error Semantico los tipos no se pueden sumar');
            return undefined;
        }
    }else if (expresion.tipo==TIPO_OPERACION.RESTA) { //resta
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno
        if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor-valorder.valor
            };

        }else{
            //error semantico 
            console.log('Error Semantico los tipos no se pueden restar');
            return undefined;
        }
        
    }else if (expresion.tipo==TIPO_OPERACION.MULTIPLICACION) { //multiplicacion
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno
        if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor*valorder.valor
            };

        }else{
            //error semantico 
            console.log('Error Semantico los tipos no se pueden multiplicar');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.DIVISION) {        //division
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 
        if(valorizq.tipo==TIPO_DATO.DECIMAL && valorder.valor==0){
            console.log('imposible dividir entre 0');
            return undefined;
        }
        
        if (valorizq.tipo==TIPO_DATO.DECIMAL && valorder.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor/valorder.valor
            };

        }else{
            //error semantico 
            console.log('Error Semantico los tipos no se pueden dividir');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.NEGATIVO) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 
        if (valorizq.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor*-1
            };

        }else{
            //error semantico 
            console.log('Error Semantico para devolver negativo');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_VALOR.DECIMAL) {
        return{
            tipo:TIPO_DATO.DECIMAL,
            valor:expresion.valor
        };
    }else if (expresion.tipo==TIPO_VALOR.CADENA) {
        return{
            tipo:TIPO_DATO.CADENA,
            valor:expresion.valor
        };
        
    }else if (expresion.tipo==TIPO_VALOR.BANDERA) {
        return{
            tipo:TIPO_DATO.BANDERA,
            valor:expresion.valor
        };
        
    }else if (expresion.tipo==TIPO_VALOR.IDENTIFICADOR) {
        //buscar el valor de la tabla de simbolos el valor de la variable en la ts local
        if (tslocal != undefined) {
            var valorId=tslocal.obtener(expresion.valor);   //si la tslocal no esta indefinida busca el valor en esta
            if(valorId){
                return{
                    tipo:tipo.valor.tipo,
                    valor:valorId.valor
                };
            }else{
                valorId=tsglobal.obtener(expresion.valor);  //si no encuentra la variable en la local entonces buscara en la global
                if(valorId){
                    return{
                        tipo:tipo.valor.tipo,
                        valor:valorId.valor
                    };
                }else{
                    return undefined;
                }
            }
        }else{
            var valorId=tsglobal.obtener(expresion.valor); //si no existe la tslocal entonces de una vez pasa a buscar en la global
            if(valorId){
                return{
                    tipo:tipo.valor.tipo,
                    valor:valorId.valor
                };
            }else{
                return undefined;
            }
        }
    }
}