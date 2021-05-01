//constante que retorna los tipos de datos 
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
                this._simbolos.push(crearSimbolo(tipo,id,valor));
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
    get simbos(){
        return this._simbolos;

    }
}

module.exports.TIPO_DATO=TIPO_DATO;
module.exports.TS=TS;