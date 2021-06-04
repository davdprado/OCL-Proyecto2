//constante que retorna los tipos de datos 

const { TIPO_VALOR } = require("./instrucciones");

/**
 * en este se gurda el valor a diferencia del de istrucciones
 */
const TIPO_DATO={
    DECIMAL:        'VAL_DECIMAL',
    CADENA:         'VAL_CADENA',
    BANDERA:        'VAL_BANDERA',
    ENTERO:         'VAL_ENTERO',
    CARACTER:       'VAL_CARACTER',
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
        this._simbolos=[]; 
        this._simbolos = this._simbolos.concat(simbolos);
    }
    agregar(tipo,id,valor){
        //verificar si ya existe la variable
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            //manejo si ya existe la variable
            console.log("la variable \""+simbolo.id+"\" ya existe");
        }else{
            if (valor=="lista") {
                let e=new Array(5);
                this._simbolos.push(crearSimbolo(tipo,id,e));
            }
            else if(tipo==valor.tipo){
                //verificar los casteos implicitos osea que no sean obvios
                /**
                 * if(tipo=="decimal" && valor.tipo=="int"){
                 *      valor.tipo=="decimal";
                 *      varor.valor==Number(valor.valor);
                 * }
                 */
                this._simbolos.push(crearSimbolo(tipo,id,valor.valor));
            }else{
                
                switch (tipo) {
                    case TIPO_DATO.DECIMAL:
                        switch (valor.tipo) {
                            case TIPO_DATO.ENTERO:
                                this._simbolos.push(crearSimbolo(tipo,id,valor.valor));
                                break;
                            default: //si el casteo no existe
                                console.log('Error Semantico se espera tipo: '+tipo +' en \"'+id+ '\" que es de tipo: '+valor.tipo);
                                break;
                        }
                        break;
                    case TIPO_DATO.ENTERO:
                        switch (valor.tipo) {
                            case TIPO_DATO.DECIMAL:
                                this._simbolos.push(crearSimbolo(tipo,id,valor.valor));
                                break;
                            default: //si el casteo no existe
                                console.log('Error Semantico se espera tipo: '+tipo +' en \"'+id+ '\" que es de tipo: '+valor.tipo);
                                break;
                        }
                        break;
                    case TIPO_DATO.CADENA:
                        if (valor.tipo==TIPO_DATO.CARACTER) {
                            this._simbolos.push(crearSimbolo(tipo,id,String(valor.valor)));
                        } else {
                            console.log('Error Semantico se espera tipo: '+tipo +' en \"'+id+ '\" que es de tipo: '+valor.tipo);
                        }
                        break;
                    default: //si el casteo no existe
                        console.log('Error Semantico se espera tipo: '+tipo +' en \"'+id+ '\" que es de tipo: '+valor.tipo);
                        break;
                }
                
            }
        }
        
    }
    obtener(id){ //necesitamos el valor de la variable
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            return simbolo;
        }else{
            //manejar lo que no existe
            console.log('No existe la variable: '+id);
            return undefined;
        }
    }
    actualizar(id,valor){

        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            if (Array.isArray(valor)) {
                console.log("entra");
                simbolo.valor.push(valor.valor);
            }
            else if (simbolo.tipo==valor.tipo) {
                simbolo.valor=valor.valor;
            }else{
                //ver si hay casteos implisitos 6=3.7
                //ejemplo double  a=3.5; a=true;  //a=1 
                switch (simbolo.tipo) {
                    case TIPO_DATO.ENTERO:
                        switch(valor.tipo){
                            case TIPO_DATO.DECIMAL:
                                simbolo.valor=valor.valor;
                                break;
                            case TIPO_DATO.BANDERA:
                                if (valor.valor==true) {
                                    simbolo.valor=1;
                                }else if (valor.valor==false){
                                    simbolo.valor=0;
                                }
                                break;
                            default:
                                console.log('No se puede asignar un '+valor.tipo+' a un '+simbolo.tipo);
                                return;
                        }
                    case TIPO_DATO.DECIMAL:
                        switch (valor.tipo) {
                            case TIPO_DATO.ENTERO:
                                simbolo.valor=valor.valor;
                                break;
                            case TIPO_DATO.BANDERA:
                                if (valor.valor==true) {
                                    simbolo.valor=1;
                                }else if (valor.valor==false){
                                    simbolo.valor=0;
                                }
                                break;
                            default:
                                console.log('No se puede asignar un '+valor.tipo+' a un '+simbolo.tipo);
                                return;
                        }
                        break;
                    case TIPO_DATO.CADENA:
                        switch (valor.tipo) {
                            case TIPO_DATO.CARACTER:
                                simbolo.valor=String(valor.valor);
                            break;
                            default:
                                console.log('No se puede asignar un '+valor.tipo+' a un '+simbolo.tipo);
                                return;
                        } 
                        break;
                    case TIPO_DATO.BANDERA:
                        switch (valor.tipo) {
                            case TIPO_DATO.DECIMAL:
                                if (valor.valor==1) {
                                    simbolo.valor=true;
                                }else if (valor.valor==0){
                                    simbolo.valor=false;
                                }
                                break;
                            case TIPO_DATO.ENTERO:
                                if (valor.valor==1) {
                                    simbolo.valor=true;
                                }else if (valor.valor==0){
                                    simbolo.valor=false;
                                }
                                break;
                            default:
                                console.log('No se puede asignar un '+valor.tipo+' a un '+simbolo.tipo);
                                return;
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