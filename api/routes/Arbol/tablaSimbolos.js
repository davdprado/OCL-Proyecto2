//constante que retorna los tipos de datos 
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
        if(tipo==valor.tipo){
            //verificar los casteos implicitos osea que no sean obvios
            this._simbolos.push(crearSimbolo(tipo,id,valor));
        }else{
            console.log('Error Semantico')
        }
    }
    obtener(id){ //necesitamos el valor de la variable
        var simbolo=this._simbolos.filter((simbolo)=>simbolo.id==id)[0];
        if (simbolo) {
            return simbolo;
        }else{
            console.log('No existe la varialbe: '+id);
        }
    }
    get simbos(){
        return this._simbolos;

    }
}