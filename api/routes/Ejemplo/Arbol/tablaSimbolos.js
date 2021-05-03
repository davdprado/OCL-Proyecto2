//constante que retorna los tipos de datos 

const { TIPO_VALOR } = require("./instrucciones");

/**
 * en este se gurda el valor a diferencia del de istrucciones
 */
const TIPO_DATO={
    DECIMAL:        'VAL_DECIMAL',
    CADENA:         'VAL_CADENA',
    BANDERA:        'VAL_BANDERA'
}

function crearSimbolo(tipo,id,valor) {//agregar despues linea y columan
    return{
        tipo:tipo,
        id:id,
        valor:valor
    }
}

class TS{
    constructor(simbolos) {
        this._simbolos=simbolos; 
    }
    agregar(tipo,id,valor){
        //verificar si ya existe la variable
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            //manejo si ya existe la variable
            console.log("la variable ya existe");
        }else{
            if(tipo==valor.tipo){
                //verificar los casteos implicitos osea que no sean obvios
                /**
                 * if(tipo=="decimal" && valor.tipo=="int"){
                 *      valor.tipo=="decimal";
                 *      varor.valor==Number(valor.valor);
                 * }
                 */
                this._simbolos.push(crearSimbolo(tipo,id,valor.valor));
            }else{
                //si el casteo no existe
                console.log('Error Semantico')
            }
        }
        
    }
    obtener(id){ //necesitamos el valor de la variable
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            return simbolo;
        }else{
            //manejar lo que no existe
            console.log('No existe la varialbe: '+id);
            return undefined;
        }
    }
    actualizar(id,nuevoVal){
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            if (simbolo.tipo==nuevoVal.tipo) {
                simbolo.valor=nuevoVal.valor;
            }else{
                //ver si hay casteos implisitos 6=3.7
                //ejemplo double  a=3.5; a=true;  //a=1 
                switch (simbolo.tipo) {
                    case TIPO_VALOR.DECIMAL:
                        switch (valor.tipo) {
                            case TIPO_VALOR.BANDERA:
                                if (valor.valor==true) {
                                    simbolo.valor=1;
                                }else if (valor.valor==false){
                                    simbolo.valor=0;
                                }
                                break;
                            case TIPO_VALOR.CADENA:
                                console.log("no se puede asignar un tipo String a un Double")
                                return;
                        }
                        break;
                    case TIPO_VALOR.CADENA:
                        switch (valor.tipo) {
                            case TIPO_VALOR.BANDERA:
                                console.log("no se puede asignar un tipo Boolean a un String")
                                return;
                            case TIPO_VALOR.DECIMAL:
                                console.log("no se puede asignar un tipo Decimal a un String")
                                return;
                        } 
                        break;
                    case TIPO_VALOR.BANDERA:
                        switch (valor.tipo) {
                            case TIPO_VALOR.CADENA:
                                console.log("no se puede asignar un tipo String a un Boolean")
                                return;
                            case TIPO_VALOR.DECIMAL:
                                if (valor.valor==1) {
                                    simbolo.valor=true;
                                }else if (valor.valor==0){
                                    simbolo.valor=false;
                                }
                                break;
                        } 
                        break;
                }
            }
        } 
    }
    get simbos(){
        return this._simbolos;

    }
}

module.exports.TIPO_DATO=TIPO_DATO;
module.exports.TS=TS;