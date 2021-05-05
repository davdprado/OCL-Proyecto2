const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;

const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
const TS = require('../Arbol/tablaSimbolos').TS;

let salida='';

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
                    }
                    var tslocal2 = new TS(tslocal._simbolos); //agrega los simbolos acutales y parametros con referencia a la acutal
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
    return salida;
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
        }
    });
}

function ejecutarBloqueLocal(instrucciones,tsglobal,tslocal,metodos) {
    instrucciones.forEach((instruccion) => {
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
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.FIF) {
            //codigo para if
            var tslocal2=new TS(tslocal._simbolos);
            ejecutarIf(instruccion,tsglobal,tslocal2,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.ASIGNACION) {
            //codigo para Asignacion
            ejecutarAsignacionLocal(instruccion,tsglobal,tslocal,metodos);
        }else if (instruccion.tipo==TIPO_INSTRUCCIONES.LLAMADA) {
            //codigo para llamada de metodos o funciones
            ejecutarLlamada(instruccion,tsglobal,tslocal,metodos);
        }
    });
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
        ejecutarBloqueLocal(instruccion.cuerpoTrue,tsglobal,tslocal,metodos);
    }else if (valor.valor==false){
        if (instruccion.cuerpoFalse!=undefined) {
            ejecutarBloqueLocal(instruccion.cuerpoFalse,tsglobal,tslocal,metodos);
        }
    }
}

function ejecutarWhile(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    while (valor.valor) {
        ejecutarBloqueLocal(instruccion.instrucciones,tsglobal,tslocal,metodos);
        valor= procesarExpresion(instruccion.condicion,tsglobal,tslocal,metodos);
    }
}

function ejecutarDeclaracionGlobal(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
    tsglobal.agregar(instruccion.tipo_dato,instruccion.id,valor);
}

function ejecutarDeclaracionLocal(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
    tslocal.agregar(instruccion.tipo_dato,instruccion.id,valor);
}

function ejecutarImprimir(instruccion,tsglobal,tslocal,metodos) {
    var valor = procesarExpresion(instruccion.expresion,tsglobal,tslocal,metodos);
    salida +=valor.valor+'\n';
    console.log(valor);
}

//funcion para procesar instruccion por cada instruccion
function procesarExpresion(expresion,tsglobal,tslocal,metodos) {
    if (expresion.tipo==TIPO_OPERACION.SUMA) { 
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);

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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
        var valorder = procesarExpresion(expresion.operanDer,tsglobal,tslocal,metodos);
        
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
        var valorizq = procesarExpresion(expresion.operanIzq,tsglobal,tslocal,metodos);
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
    }
}

module.exports.ejecutar= ejecutar;