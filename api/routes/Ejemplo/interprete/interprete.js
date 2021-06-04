const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;

const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
const TS = require('../Arbol/tablaSimbolos').TS;

let salida='';
let listaerrores=[];
let listasimbolos=[];

function ejecutar(arbol) {
    salida='';
    let tsglobal = new TS([]);
    let tslocal = new TS([]);
    let main = [];
    let metodos=[];
    ejecutarBloqueGlobal(arbol,tsglobal,tslocal,metodos,main);
    if (main.length>1) {
        console.log('No se puede ejecutar mas de un comando \"exec\"');
    }else{
        //buscar el metodo en el arreglo de metodos
        metodos.forEach(meto2 => {
            if (meto2.id==main[0].id) {
                if (meto2.parametros.length==main[0].parametros.length) {
                    var valoresMetodos = [];
                    for (var contador = 0; contador < main[0].parametros.length; contador++) {
                        var valor = procesarExpresion(main[0].parametros[contador],tsglobal,tslocal,metodos);
                        if (valor.tipo != meto2.parametros[contador].tipo) { //verifica que el tipo del parametro llamado sea el mismo que pide el metodo
                            console.log('se estan enviando un tipo '+valor.tipo +' en lugar de un tipo '+meto2.parametros[contador].tipo+' en '+meto2.id);
                            return;
                        }else{
                            valoresMetodos.push(valor);
                        }
                    }//agrega los valores a los metodos
                    var tslocal2 = new TS([]); //agrega los simbolos acutales y parametros con referencia a la acutal
                    for (var contador = 0; contador < main[0].parametros.length; contador++) {
                        tslocal2.agregar(valoresMetodos[contador].tipo,meto2.parametros[contador].id,valoresMetodos[contador]);
                        //aqui agregamos los parametros del metodo
                    }
                    ejecutarBloqueLocal(meto2.instrucciones,tsglobal,tslocal2,metodos);

                }else{
                    console.log('se estan enviando diferente cantidad de valores de los que pide el metodo \"'+meto2.id+'\"');
                }

            }
        });
    }
    return{
        salida:salida,
        errores:listaerrores,
        simbolos:listasimbolos
    }
}
//DA UNA PASADA A TODO EL CODIGO PARA GUARADAR LOS METODOS Y FUNCIONES
function ejecutarBloqueGlobal(instrucciones,tsglobal,tslocal,metodos,main) {
    instrucciones.forEach((instruccion) => {
        if(instruccion.tipo==TIPO_INSTRUCCIONES.DECLARACION){
            //codigo para la declaracion
            ejecutarDeclaracionGlobal(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.ASIGNACION) {
            //codigo para Asignacion
            ejecutarAsignacionGlobal(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.METODO) {
            metodos.push(instruccion);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.MAIN) {
            main.push(instruccion);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.LISTAA) {
            //codigo para lista
            ejecutarLista(instruccion,tsglobal,tslocal,metodos);
        }
    });
}

function ejecutarBloqueLocal(instrucciones,tsglobal,tslocal,metodos) {
    for (let i = 0; i < instrucciones.length; i++) {
        var instruccion = instrucciones[i];
        if(instruccion.tipo==TIPO_INSTRUCCIONES.DECLARACION){
            //codigo para la declaracion
            ejecutarDeclaracionLocal(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.IMPRIMIR) {
            //codigo para imprimir
            ejecutarImprimir(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FWHILE) {
            //codigo para while
            var tslocal2=new TS(tslocal._simbolos);
            ejecutarWhile(instruccion,tsglobal,tslocal2,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.DOWHILE) {
            //codigo para DOwhile
            var tslocal2=new TS(tslocal._simbolos);
            ejecutarDoWhile(instruccion,tsglobal,tslocal2,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FOR) {
            //codigo para for
            var tslocal2=new TS(tslocal._simbolos);
            ejecutarFor(instruccion,tsglobal,tslocal2,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FIF) {
            //codigo para if
            var tslocal2=new TS(tslocal._simbolos);
            var posibleretorno= ejecutarIf(instruccion,tsglobal,tslocal2,metodos);
            if (posibleretorno) {
                return posibleretorno;
            }
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.SWITCHH) {
            //codigo para switch
            var tslocal2=new TS(tslocal._simbolos);
            ejecutarSwitch(instruccion,tsglobal,tslocal2,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.ASIGNACION) {
            //codigo para Asignacion
            ejecutarAsignacionLocal(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.LLAMADA) {
            //codigo para llamada de metodos o funciones
            ejecutarLlamada(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.AGREGARLIST) {
            //codigo para llamada de metodos o funciones
            ejecutarAdd(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.BREAKK) {
            //break me el mismo paso para el return y el continue
            return{
                tipo_resultado: TIPO_INSTRUCCIONES.BREAKK,
                resultado:undefined
            }
        }
    }
}



//hacer una funcion por cada instruccion para ejecutar lo antes visto
//una para cada ambito [ejecutarDeclaracionGlobal,ejecutarDeclaracionLocal]
function ejecutarLlamada(instruccion,tsglobal,tslocal,metodos) {
    metodos.forEach(meto2 => {
        if (meto2.id==instruccion.id) {
            if (meto2.parametros.length==instruccion.parametros.length) {
                var valoresMetodos = [];
                for (var contador = 0; contador < instruccion.parametros.length; contador++) {
                    var valor = procesarExpresion(instruccion.parametros[contador],tsglobal,tslocal,metodos);
                    if (valor.tipo != meto2.parametros[contador].tipo) { //verifica que el tipo del parametro llamado sea el mismo que pide el metodo
                        console.log('se estan enviando un tipo '+valor.tipo +' en lugar de un tipo '+meto2.parametros[contador].tipo+' en '+meto2.id);
                        return;
                    }else{
                        valoresMetodos.push(valor);
                    }
                }
                var tslocal2 = new TS([]); //agrega los simbolos acutales y parametros con referencia a la acutal
                for (var contador = 0; contador < instruccion.parametros.length; contador++) {
                    tslocal2.agregar(valoresMetodos[contador].tipo,meto2.parametros[contador].id,valoresMetodos[contador]);
                    //aqui agregamos los parametros del metodo
                }
                ejecutarBloqueLocal(meto2.instrucciones,tsglobal,tslocal2,metodos);

            }else{
                console.log('se estan enviando diferente cantidad de valores de los que pide el metodo \"'+meto2.id+'\"');
            }

        }
    });
}

function ejecutarAsignacionGlobal(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
     if (tsglobal.obtener(instruccion.id)!=undefined) {
        tsglobal.actualizar(instruccion.id,valor);
    }else{
        console.log("algo salio mal");
    }
}

function ejecutarAsignacionLocal(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal);
    if (tslocal.obtener(instruccion.id)!=undefined) {
        tslocal.actualizar(instruccion.id,valor);
    }else if (tsglobal.obtener(instruccion.id)!=undefined) {
        tsglobal.actualizar(instruccion.id,valor);
    }else{
        console.log("algo salio mal x2");
    }
}

function ejecutarIf(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    if (valor.valor==true) {
        return ejecutarBloqueLocal(instruccion.cuerpoTrue,tsglobal,tslocal,metodos);
    }else if (valor.valor==false){
        if (instruccion.cuerpoFalse!=undefined) {
            return ejecutarBloqueLocal(instruccion.cuerpoFalse,tsglobal,tslocal,metodos);
        }
    }
}

function existe(lista) {
    for (let i = 0; i < lista.length; i++) {
        const instruccion = lista[i];
        if (instruccion.tipo==TIPO_INSTRUCCIONES.BREAKK) {
            return true;
        }
    }
    return false;
}

function ejecutarSwitch(instruccion,tsglobal,tslocal,metodos) {
    let valor = procesarExpresion(instruccion.condicion1,tsglobal,tslocal,metodos);
    if (instruccion.casos) {
        for (let i = 0; i < instruccion.casos.length; i++) {
            let caso = instruccion.casos[i];
            var valor2=procesarExpresion(caso.condicion2,tsglobal,tslocal,metodos);
            if(valor.valor==valor2.valor){
                var bandera= existe(caso.instrucciones);//indica si existe un break 
                if (bandera) {
                    bandera=false;
                    return ejecutarBloqueLocal(caso.instrucciones,tsglobal,tslocal,metodos);
                }else{
                    ejecutarBloqueLocal(caso.instrucciones,tsglobal,tslocal,metodos);
                    valor =procesarExpresion(instruccion.condicion1,tsglobal,tslocal,metodos);
                }
                
            }
        }
        //si no encuentra concordancia ver si hay default
        if(instruccion.casodefault){
            return ejecutarBloqueLocal(instruccion.casodefault.instrucciones,tsglobal,tslocal,metodos);
            
        }
        valor =procesarExpresion(instruccion.condicion1,tsglobal,tslocal,metodos);
    }else{
        if (instruccion.casodefault) {
            return ejecutarBloqueLocal(instruccion.casodefault.instrucciones,tsglobal,tslocal,metodos);
        }else{
            console.log("La funcion Switch viene sin argumentos validos")
        }
    }
}

function ejecutarFor(instruccion,tsglobal,tslocal,metodos) {
    var argumento1 = instruccion.declaracion;
    if (argumento1.tipo==TIPO_INSTRUCCIONES.DECLARACION) {
        //tengo que agregar a la ts
        var valor =procesarExpresion(argumento1.expresion,tsglobal,tslocal,metodos);
        tslocal.agregar(argumento1.tipo_dato,argumento1.id,valor);
        instruccion.instrucciones.push(instruccion.asignacion);
        //se agregaron la isntruccion para simularlo como while
        var valor2 = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
        while (valor2.valor) {
            var posiblevalor = ejecutarBloqueLocal(instruccion.instrucciones,tsglobal,tslocal,metodos);
            if (posiblevalor) {
                if (posiblevalor.tipo_resultado==TIPO_INSTRUCCIONES.BREAKK) {
                    break;
                    /**
                     * si es un return{
                     * devolver el resultado 
                     * }
                     */
                }
            }
            valor2= procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
        }
    }else if(argumento1.tipo==TIPO_INSTRUCCIONES.ASIGNACION){
        var valor =procesarExpresion(argumento1.expresion,tsglobal,tslocal,metodos);
        instruccion.instrucciones.push(instruccion.asignacion);
        //se agregaron la isntruccion para simularlo como while
        var valor2 = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
        while (valor2.valor) {
            var posiblevalor = ejecutarBloqueLocal(instruccion.instrucciones,tsglobal,tslocal,metodos);
            if (posiblevalor) {
                if (posiblevalor.tipo_resultado==TIPO_INSTRUCCIONES.BREAKK) {
                    break;
                    /**
                     * si es un return{
                     * devolver el resultado 
                     * }
                     */
                }
            }
            valor2= procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
        }
    }
}

function ejecutarWhile(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    while (valor.valor) {
        var posiblevalor = ejecutarBloqueLocal(instruccion.instrucciones,tsglobal,tslocal,metodos);
        if (posiblevalor) {
            if (posiblevalor.tipo_resultado==TIPO_INSTRUCCIONES.BREAKK) {
                break;
                /**
                 * si es un return{
                 * devolver el resultado 
                 * }
                 */
            }
        }
        valor= procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    }
}


function ejecutarDoWhile(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    do {
        var posiblevalor = ejecutarBloqueLocal(instruccion.instrucciones,tsglobal,tslocal,metodos);
        if (posiblevalor) {
            if (posiblevalor.tipo_resultado==TIPO_INSTRUCCIONES.BREAKK) {
                break;
                /**
                 * si es un return{
                 * devolver el resultado 
                 * }
                 */
            }
        }
        valor= procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    } while (valor.valor);
}

function ejecutarDeclaracionGlobal(instruccion,tsglobal,tslocal,metodos) {

    if (instruccion.tipoEstructura==TIPO_INSTRUCCIONES.LISTAA) {
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,"lista");
    }else if (instruccion.tipoEstructura==TIPO_INSTRUCCIONES.VECTOR) {
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,"vector");
    }else{
        var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,valor);
    }
}

function ejecutarDeclaracionLocal(instruccion,tsglobal,tslocal,metodos) {
    if (instruccion.tipoEstructura==TIPO_INSTRUCCIONES.LISTAA) {
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,"lista");
    }else if (instruccion.tipoEstructura==TIPO_INSTRUCCIONES.VECTOR) {
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,"vector");
    }else{
        var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
        tslocal.agregar(instruccion.tipo_dato,instruccion.id,valor);
    }
    
}

function ejecutarAdd(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
    if (tslocal.obtener(instruccion.id)!=undefined) {
        console.log("entro");
        tslocal.actualizar(instruccion.id,valor);
        console.log(tslocal);
    }else if (tsglobal.obtener(instruccion.id)!=undefined) {
        tsglobal.actualizar(instruccion.id,valor);
    }
}

function ejecutarImprimir(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
    salida +=valor.valor+'\n';
}

//funcion para procesar instruccion por cada instruccion
function procesarExpresion(expresion,tsglobal,tslocal,metodos) {
    if (expresion.tipo==TIPO_OPERACION.SUMA) { 
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor+valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor+valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        if (valorder.valor==true) {
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor+1
                            };
                        }else if (valorder.valor==false){
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor+valorder.valor.charCodeAt(0)
                        };
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:String(valorizq.valor)+valorder.valor
                        };
                }
                break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor+valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor+valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        if (valorder.valor==true) {
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor+1
                            };
                        }else if (valorder.valor==false){
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor+Number(valorder.valor.charCodeAt(0))
                        };
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:String(valorizq.valor)+valorder.valor
                        };
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        if (valorizq.valor==true) {
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:1+valorder.valor
                            };
                        }else if (valorizq.valor==false){
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorder.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                    break;
                    case TIPO_DATO.DECIMAL:
                        if (valorizq.valor==true) {
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:1+valorder.valor
                            };
                        }else if (valorizq.valor==false){
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorder.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                    break;
                    case TIPO_DATO.BANDERA:
                        console.log('Booleano no puede sumarse con '+TIPO_DATO.BANDERA);
                        break;
                    case TIPO_DATO.CARACTER:
                        console.log('Booleano no puede sumarse con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:String(valorizq.valor)+valorder.valor
                        };
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor.charCodeAt(0)+valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor.charCodeAt(0)+valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('no se puede sumar '+valorizq.tipo+' con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:String(valorizq.valor+valorder.valor)
                        };
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:String(valorizq.valor+valorder.valor)
                        };
                }
                break;
            case TIPO_DATO.CADENA:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:valorizq.valor+String(valorder.valor)
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:valorizq.valor+String(valorder.valor)
                        };
                    case TIPO_DATO.BANDERA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:valorizq.valor+String(valorder.valor)
                        }
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor+String(valorder.valor)
                        };
                    case TIPO_DATO.CADENA:
                        return{
                            tipo:TIPO_DATO.CADENA,
                            valor:valorizq.valor+String(valorder.valor)
                        };
                }
                break;
            default:
                console.log('no se pueden sumar los tipos '+valorizq.tipo+' + '+valorder.tipo)
                break;
        }
    }else if (expresion.tipo==TIPO_OPERACION.RESTA) { //resta
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor-valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor-valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        if (valorder.valor==true) {
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor-1
                            };
                        }else if (valorder.valor==false){
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor-valorder.valor.charCodeAt(0)
                        };
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden restar los Entero con '+valorder.tipo);
                        break;
                }
                break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor-valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor-valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        if (valorder.valor==true) {
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor-1
                            };
                        }else if (valorder.valor==false){
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor-Number(valorder.valor.charCodeAt(0))
                        };
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden restar los Decimal con '+valorder.tipo);
                        break;
                }
                break;
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        if (valorizq.valor==true) {
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:1-valorder.valor
                            };
                        }else if (valorizq.valor==false){
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:0-valorder.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                    break;
                    case TIPO_DATO.DECIMAL:
                        if (valorizq.valor==true) {
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:1-valorder.valor
                            };
                        }else if (valorizq.valor==false){
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:0-valorder.valor
                            };
                        }else{
                            console.log('solo se puede operar con true=1 y false=0')
                        }
                    break;
                    case TIPO_DATO.BANDERA:
                        console.log('no se pueden restar los Bandera con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CARACTER:
                        console.log('no se pueden restar los Booleano con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden restar los cadena con '+valorder.tipo);
                        break;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor.charCodeAt(0)-valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor.charCodeAt(0)-valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('no se puede restar '+valorizq.tipo+' con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CARACTER:
                        console.log('no se pueden restar los Caracter con '+valorder.tipo);
                        break;
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden restar los Caracter con '+valorder.tipo);
                        break;
                }
                break;
            default:
                console.log('no se pueden restar los tipos '+valorizq.tipo+' + '+valorder.tipo)
                break;
        }
        
    }else if (expresion.tipo==TIPO_OPERACION.MULTIPLICACION) { //multiplicacion
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

        //tipos de resultados y su retorno
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor*valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor*valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo)
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor*valorder.valor.charCodeAt(0)
                        };
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo);
                        break;
                }
                break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor*valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor*valorder.valor
                        };
                    case TIPO_DATO.BANDERA:
                        console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo);
                        break;
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor*Number(valorder.valor.charCodeAt(0))
                        };
                    case TIPO_DATO.CADENA:
                        console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo);
                        break;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.ENTERO,
                            valor:valorizq.valor.charCodeAt(0)*valorder.valor
                        };
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.DECIMAL,
                            valor:valorizq.valor.charCodeAt(0)*valorder.valor
                        };
                    default:
                        console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo);
                        break;
                }
                break;
            default:
                console.log('no se pueden multiplicar los tipos '+valorizq.tipo+' + '+valorder.tipo)
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.DIVISION) {        //division
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

        //tipos de resultados y su retorno 
        if (valorder.valor!=0) {
            switch (valorizq.tipo) {
                case TIPO_DATO.ENTERO:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor/valorder.valor
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor/valorder.valor
                            };
                        case TIPO_DATO.BANDERA:
                            console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo)
                            break;
                        case TIPO_DATO.CARACTER:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor/valorder.valor.charCodeAt(0)
                            };
                        case TIPO_DATO.CADENA:
                            console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo);
                            break;
                    }
                    break;
                case TIPO_DATO.DECIMAL:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor/valorder.valor
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor/valorder.valor
                            };
                        case TIPO_DATO.BANDERA:
                            console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo);
                            break;
                        case TIPO_DATO.CARACTER:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor/Number(valorder.valor.charCodeAt(0))
                            };
                        case TIPO_DATO.CADENA:
                            console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo);
                            break;
                    }
                    break;
                case TIPO_DATO.CARACTER:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:valorizq.valor.charCodeAt(0)/valorder.valor
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor.charCodeAt(0)/valorder.valor
                            };
                        default:
                            console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo);
                            break;
                    }
                    break;
                default:
                    console.log('no se pueden dividir los tipos '+valorizq.tipo+' + '+valorder.tipo)
                    break;
            } 
        }else{
            console.log('no se puede dividir dentro de 0');
        }
        
    //parte para las condicionantes    
    }else if (expresion.tipo==TIPO_OPERACION.MODULAR) {        //MODULAR
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

        //tipos de resultados y su retorno 
        if (valorder.valor!=0) {
            switch (valorizq.tipo) {
                case TIPO_DATO.ENTERO:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor%valorder.valor
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor%valorder.valor
                            };
                        default:
                            console.log('no se pueden hacer mod en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                            break;
                    }
                    break;
                case TIPO_DATO.DECIMAL:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor%valorder.valor
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:valorizq.valor%valorder.valor
                            };
                        default:
                            console.log('no se pueden hacer mod en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                            break;
                    break;
                        }
                break;
                default:
                    console.log('no se pueden hacer mod en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                    break;
            } 
        }else{
            console.log('no se puede dividir dentro de 0');
        }
    //parte para las condicionantes    
    }else if (expresion.tipo==TIPO_OPERACION.POTENCIA) {        //POTENCIA
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

        //tipos de resultados y su retorno 
        if (valorizq.valor==0 && valorder.valor==0) {
            console.log('no se puede hace pow(0,0)');
        }else{
            switch (valorizq.tipo) {
                case TIPO_DATO.ENTERO:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:Math.pow(valorizq.valor,valorder.valor)
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:Math.pow(valorizq.valor,valorder.valor)
                            };
                        default:
                            console.log('no se pueden hacer mod en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                            break;
                    }
                    break;
                case TIPO_DATO.DECIMAL:
                    switch (valorder.tipo) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:Math.pow(valorizq.valor,valorder.valor)
                            };
                        case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:Math.pow(valorizq.valor,valorder.valor)
                            };
                        default:
                            console.log('no se pueden hacer potencia en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                            break;
                    break;
                        }
                break;
                default:
                    console.log('no se pueden hacer hacer potencia en los tipos '+valorizq.tipo+' + '+valorder.tipo)
                    break;
            }
        }
    //parte para las condicionantes    
    }else if (expresion.tipo==TIPO_OPERACION.MAYOR) {        //mayor  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' > '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor>valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' > '+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))>valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))>valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))>Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' > '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MENOR) {        //menor  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' < '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor<valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' < '+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))<valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))<valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))<Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' < '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MENORIGUAL) {        //menorigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<=valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<=Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' <= '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor<=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor<=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' <= '+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))<=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))<=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))<=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' <= '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.MAYORIGUAL) {        //mayorigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>=valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>=Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' >= '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor>=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor>=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' >='+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))>=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))>=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))>=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' >= '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.IGUALIGUAL) {        //igualigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor==valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor==valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor==Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' == '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor==valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor==valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor==Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' =='+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))==valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))==valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))==Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' == '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.NOIGUAL) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.ENTERO:
                switch (valorder.tipo) {
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor!=valorder.valor
                        }
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor!=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor!=Number(valorder.valor.charCodeAt(0))
                        }
                
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' != '+valorder.tipo);
                        return undefined;
                }
            break;
            case TIPO_DATO.DECIMAL:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: valorizq.valor!=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor!=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor!=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' !='+valorder.tipo);
                        return undefined;
                }
                break;
            case TIPO_DATO.CARACTER:
                switch (valorder.tipo) {
                    case TIPO_DATO.DECIMAL:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor: Number(valorizq.valor.charCodeAt(0))!=valorder.valor
                        }
                    case TIPO_DATO.ENTERO:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))!=valorder.valor
                        }
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:Number(valorizq.valor.charCodeAt(0))!=Number(valorder.valor.charCodeAt(0))
                        }
                    default:
                        console.log('Error Semantico: Imposible realizar '+valorizq.tipo+' != '+valorder.tipo);
                        return undefined;
                }
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.ORR) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.BANDERA:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor||valorder.valor
                        }
                    default:
                        console.log('imposible operar '+valorizq.tipo+' || '+valorder.tipo);
                        return undefined;
                }
            break;
            default:
                console.log('imposible operar '+valorizq.tipo+' || '+valorder.tipo);
                return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.ANDD) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.BANDERA:
                switch (valorder.tipo) {
                    case TIPO_DATO.BANDERA:
                        return{
                            tipo:TIPO_DATO.BANDERA,
                            valor:valorizq.valor&&valorder.valor
                        }
                    default:
                        console.log('imposible operar '+valorizq.tipo+' && '+valorder.tipo);
                        return undefined;
                }
            break;
            default:
                console.log('imposible operar '+valorizq.tipo+' && '+valorder.tipo);
                return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.CASTEO) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        var tipoC = expresion.operanIzq;
        switch (valorder.tipo) {
            case TIPO_DATO.ENTERO:
                switch (tipoC) {
                    case TIPO_DATO.CARACTER:
                        return{
                            tipo:TIPO_DATO.CARACTER,
                            valor:String.fromCharCode(valorder.valor)
                        }
                    case TIPO_DATO.DECIMAL:
                            return{
                                tipo:TIPO_DATO.DECIMAL,
                                valor:Number(valorder.valor)
                            }
                    default:
                        console.log('no se puede hacer casteo de'+valorder.tipo+' a '+tipoC);
                        break;
                }
                break;
                case TIPO_DATO.DECIMAL:
                    switch (tipoC) {
                        case TIPO_DATO.CARACTER:
                            return{
                                tipo:TIPO_DATO.CARACTER,
                                valor:String.fromCharCode(valorder.valor)
                            }
                        case TIPO_DATO.ENTERO:
                                return{
                                    tipo:TIPO_DATO.ENTERO,
                                    valor:Math.trunc(valorder.valor)
                                }
                        default:
                            console.log('no se puede hacer casteo de'+valorder.tipo+' a '+tipoC);
                            break;
                    }
                break;
                case TIPO_DATO.CARACTER:
                    switch (tipoC) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:Number(valorizq.valor.charCodeAt(0))
                            }
                        default:
                            console.log('no se puede hacer casteo de'+valorder.tipo+' a '+tipoC);
                            break;
                    }
                break;
                case TIPO_DATO.CADENA:
                    switch (tipoC) {
                        case TIPO_DATO.ENTERO:
                            return{
                                tipo:TIPO_DATO.ENTERO,
                                valor:Number(valorder.valor)
                            }
                        case TIPO_DATO.DECIMAL:
                                return{
                                    tipo:TIPO_DATO.DECIMAL,
                                    valor:Number(valorder.valor)
                                }
                        default:
                            console.log('no se puede hacer casteo de'+valorder.tipo+' a '+tipoC);
                            break;
                    }
                break;
            default:
                break;
        }

    }else if (expresion.tipo==TIPO_OPERACION.NOTT) {        //noigual  OTRA FORMA DE HACER LOS CASTEOS
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
        switch (valorizq.tipo) {
            case TIPO_DATO.BANDERA:
                return{
                    tipo:TIPO_DATO.BANDERA,
                    valor:!valorizq.valor
                }
            default:
                console.log('imposible operar '+valorizq.tipo+' !');
                return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.NEGATIVO) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 
        if (valorizq.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.DECIMAL,
                valor:valorizq.valor*-1
            };

        }else if (valorizq.tipo==TIPO_DATO.ENTERO) {
            return{
                tipo:TIPO_DATO.ENTERO,
                valor:valorizq.valor*-1
            };

        }else{
            //error semantico 
            console.log('Error Semantico para devolver negativo');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TOLOWERR) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 
        if (valorizq.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor.toLowerCase()
            }
        }else{
            //error semantico 
            salida+=valor.valor+" no es de tipo cadena"+'\n';
            console.log('el tipo no es cadena');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TOUPPERR) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 
        if (valorizq.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.CADENA,
                valor:valorizq.valor.toUpperCase()
            }
        }else{
            //error semantico 
            salida+=valor.valor+" no es de tipo cadena"+'\n';
            console.log('el tipo no es cadena');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.LENGTHH) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 

        //falta si es tipo vector o lista
        if (valorizq.tipo==TIPO_DATO.CADENA) {
            return{
                tipo:TIPO_DATO.ENTERO,
                valor:valorizq.valor.length
            }
        }else{
            //error semantico 
            salida+=valor.valor+" no es de tipo valido"+'\n';
            console.log('el tipo no es cadena');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TRUNCATEE) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 

        //falta si es tipo vector o lista
        if (valorizq.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.ENTERO,
                valor:Math.trunc(valorizq.valor)
            }
        }else{
            //error semantico 
            salida+=valor.valor+" no es de tipo ENTERO valido"+'\n';
            console.log('inVALIDO');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.ROUNDD) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 

        //falta si es tipo vector o lista
        if (valorizq.tipo==TIPO_DATO.DECIMAL) {
            return{
                tipo:TIPO_DATO.ENTERO,
                valor:Math.round(valorizq.valor)
            }
        }else{
            //error semantico 
            salida+=valor.valor+" no es de tipo valido"+'\n';
            console.log('el tipo no es cadena');
            return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TIPODE) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 

        //falta si es tipo vector o lista
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:"double"
                }
            case TIPO_DATO.ENTERO:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:"int"
                }
            case TIPO_DATO.BANDERA:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:"boolean"
                }
            case TIPO_DATO.CADENA:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:"string"
                }
            case TIPO_DATO.CARACTER:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:"char"
                }
            default:
                salida+=valor.valor+" no es de tipo valido"+'\n';
                console.log('el tipo no es cadena');
                return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TOTEXTO) {    //negativo
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        //var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal);

        //tipos de resultados y su retorno 

        //falta si es tipo vector o lista
        switch (valorizq.tipo) {
            case TIPO_DATO.DECIMAL:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:String(valorizq.valor)
                }
            case TIPO_DATO.ENTERO:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:String(valorizq.valor)
                }
            case TIPO_DATO.BANDERA:
                return{
                    tipo:TIPO_DATO.CADENA,
                    valor:String(valorizq.valor)
                }
            default:
                salida+=valor.valor+" no es de tipo valido"+'\n';
                console.log('el tipo no es cadena');
                return undefined;
        }

    }else if (expresion.tipo==TIPO_OPERACION.TERNARIO) {    //negativo
        var condicion=procesarExpresion(expresion.condicion,tsglobal,tslocal,metodos);
        if (condicion==true) {
            var resultado= procesarExpresion(expresion.valorVerdadero,tsglobal,tslocal,metodos);
            return resultado;
        }else if (condicion==false) {
            var resultado= procesarExpresion(expresion.valorVerdadero,tsglobal,tslocal,metodos);
            return resultado;
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
                    tipo:valorId.tipo,
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
    }else if (expresion.tipo==TIPO_VALOR.ENTERO) {
        return{
            tipo:TIPO_DATO.ENTERO,
            valor:expresion.valor
        };
    }else if (expresion.tipo==TIPO_VALOR.CARACTER) {
        return{
            tipo:TIPO_DATO.CARACTER,
            valor:expresion.valor
        };
    }
}

module.exports.ejecutar= ejecutar;
module.exports.listaerrores=listaerrores;
module.exports.listasimbolos=listasimbolos;