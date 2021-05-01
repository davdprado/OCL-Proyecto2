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
    }
}