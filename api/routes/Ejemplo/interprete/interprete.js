const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;

const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
const TS = require('../Arbol/tablaSimbolos').TS;

let salida='';

function ejecutar(arbol) {
    salida='';
    let tsglobal = new TS([]);
    ejecutarBloqueGlobal(arbol,tsglobal,undefined);

    return salida;
}
//una para cada ambito [ejecutarDeclaracionGlobal,ejecutarDeclaracionLocal]
function ejecutarBloqueGlobal(instrucciones,tsglobal,tslocal) {
    instrucciones.forEach((instruccion) => {
        if(instruccion.tipo==TIPO_INSTRUCCIONES.DECLARACION){
            //codigo para la declaracion
            ejecutarDeclaracionGlobal(instruccion,tsglobal,tslocal);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.IMPRIMIR) {
            //codigo para imprimir
            ejecutarImprimir(instruccion,tsglobal,tslocal);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FWHILE) {
            //codigo para while
            ejecutarWhile(instruccion,tsglobal,tslocal);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FIF) {
            //codigo para if
            ejecutarIf(instruccion,tsglobal,tslocal);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.ASIGNACION) {
            //codigo para Asignacion
            ejecutarAsignacion(instruccion,tsglobal,tslocal);
        }
    });
}



//hacer una funcion por cada instruccion para ejecutar lo antes visto
//una para cada ambito [ejecutarDeclaracionGlobal,ejecutarDeclaracionLocal]
function ejecutarAsignacion(instruccion,tsglobal,tslocal) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal);
    /*if (tslocal.obtener(instruccion.id)!=undefined) {
        tslocal.actualizar(instruccion.id,valor);
    }else*/ if (tsglobal.obtener(instruccion.id)!=undefined) {
        tsglobal.actualizar(instruccion.id,valor);
    }else{
        console.log("algo salio mal");
    }
}

function ejecutarIf(instruccion,tsglobal,tslocal) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal);
    if (valor.valor==true) {
        ejecutarBloqueGlobal(instruccion.cuerpoTrue,tsglobal,tslocal);
    }else if (valor.valor==false){
        if (instruccion.cuerpoFalse!=undefined) {
            ejecutarBloqueGlobal(instruccion.cuerpoFalse,tsglobal,tslocal);
        }
    }
}

function ejecutarWhile(instruccion,tsglobal,tslocal) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal);
    while (valor.valor) {
        ejecutarBloqueGlobal(instruccion.instrucciones,tsglobal,tslocal);
        valor= procesarExpresion(instruccion.condicion,tsglobal,tslocal);
    }
}

function ejecutarDeclaracionGlobal(instruccion,tsglobal,tslocal) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal);
    tsglobal.agregar(instruccion.tipo_dato,instruccion.id,valor);
}

function ejecutarImprimir(instruccion,tsglobal,tslocal) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal);
    salida +=valor.valor+'\n';
    console.log(valor);
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
    //parte para las condicionantes    
    }else if (expresion.tipo==TIPO_OPERACION.MAYOR) {        //mayor  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor>valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">"');
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MENOR) {        //menor  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor<valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<"');
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MENORIGUAL) {        //menorigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor<=valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "<="');
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MAYORIGUAL) {        //mayorigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor>=valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con ">="');
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.IGUALIGUAL) {        //igualigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor==valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "=="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        var valor2;                                 //*
                        if (valorder.valor==true) {
                            valor2=1;                               //casteo implicito
                        }else if (valorder.valor==false){
                            valor2=0;
                        }                                           //*

                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor==valor2
                        };
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "=="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        console.log("entro");
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor==valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "=="');
                        return undefined;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        var valor1;                                 //*
                        if (valorizq.valor==true) {
                            valor1=1;                               //casteo implicito
                        }else if (valorizq.valor==false){
                            valor1=0;
                        }                                           //*

                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valor1==valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "=="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor==valorder.valor
                        };
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.NOIGUAL) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor!=valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "!="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        var valor2;                                 //*
                        if (valorder.valor==true) {
                            valor2=1;                               //casteo implicito
                        }else if (valorder.valor==false){
                            valor2=0;
                        }                                           //*

                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor!=valor2
                        };
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        console.log('Error Semantico los tipos no se pueden operar con "!="');
                        return undefined;
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor!=valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('Error Semantico los tipos no se pueden operar con "!="');
                        return undefined;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        var valor1;                                 //*
                        if (valorizq.valor==true) {
                            valor1=1;                               //casteo implicito
                        }else if (valorizq.valor==false){
                            valor1=0;
                        }                                           //*

                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valor1!=valorder.valor
                        };
                    case TIPO_DATO.CADENA:
                        console.log('Error Semantico los tipos no se pueden operar con "!="');
                        return undefined;
                    case TIPO_DATO.BANDERA:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor!=valorder.valor
                        };
                }
                break;
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
            var valorId = tslocal.obtener(expresion.valor);   //si la tslocal no esta indefinida busca el valor en esta
            if(valorId){
                return{
                    tipo:tipo.valor.tipo,
                    valor:valorId.valor
                };
            }else{
                valorId=tsglobal.obtener(expresion.valor);  //si no encuentra la variable en la local entonces buscara en la global
                if(valorId){
                    return{
                        tipo:valorId.tipo,
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
                    tipo:valorId.tipo,
                    valor:valorId.valor
                };
            }else{
                return undefined;
            }
        }
    }
}

module.exports.ejecutar= ejecutar;