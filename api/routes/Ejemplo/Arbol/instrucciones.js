//ponemos los tipos de valores que tenemos
/**
 * sierve para hacer las operaciones
 */
const TIPO_VALOR={
    DECIMAL:        'VAL_DECIMAL', 
    CADENA:         'VAL_CADENA',
    IDENTIFICADOR:  'VAL_IDENTIFICADOR',
    BANDERA:        'VAL_BANDERA'
}

//TIPOS DE OPERACIONES QUE HAY
const TIPO_OPERACION={
    SUMA:               'OP_SUMA',
    RESTA:              'OP_RESTA',
    MULTIPLICACION:     'OP_MULTIPLICACION',
    DIVISION:           'OP_DIVISION',
    NEGATIVO:           'OP_NEGATIVO'
}

const TIPO_INSTRUCCIONES={
    IMPRIMIR:               'INST_IMPRIMIR',
    DECLARACION:            'INST_DECLARACION'
}

const INSTRUCCIONES={
    nuevaOperacionBinaria: function(tipo,operanIzq,operanDer) {
        return {
            tipo: tipo,
            operanIzq:operanIzq,
            operanDer:operanDer
        }
    },
    nuevaOperacionUnaria: function(tipo,operanIzq) {
        return {
            tipo: tipo,
            operanIzq:operanIzq,
            operanDer:undefined
        }
    },
    nuevoValor: function(tipo,valor){
        return{
            tipo:tipo,
            valor:valor
        }
    },
    nuevaDeclaracion: function(tipo,id,expresion) {
        return{
            tipo:TIPO_INSTRUCCIONES.DECLARACION,
            tipo_dato:tipo,
            id:id,
            expresion: expresion
        }
    },
    nuevaImprimir: function(expresion) {
        return{
            tipo:TIPO_INSTRUCCIONES.IMPRIMIR,
            expresion:expresion
        }
    }
}

module.exports.TIPO_VALOR=TIPO_VALOR;
module.exports.TIPO_INSTRUCCIONES=TIPO_INSTRUCCIONES;
module.exports.TIPO_OPERACION=TIPO_OPERACION;
module.exports.INSTRUCCIONES=INSTRUCCIONES;