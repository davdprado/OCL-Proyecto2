/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatic = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,10],$V1=[1,8],$V2=[1,7],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[5,16,17,24,36,37,38,39,40],$V9=[1,22],$Va=[17,20],$Vb=[1,36],$Vc=[1,28],$Vd=[1,27],$Ve=[1,30],$Vf=[1,31],$Vg=[1,32],$Vh=[1,33],$Vi=[1,34],$Vj=[1,35],$Vk=[1,44],$Vl=[1,45],$Vm=[1,46],$Vn=[1,47],$Vo=[1,48],$Vp=[1,49],$Vq=[1,50],$Vr=[1,51],$Vs=[1,52],$Vt=[1,53],$Vu=[20,21,22,41,42,43,44,45,46,47,48,49,50],$Vv=[5,16,17,24,27,30,31,33,35,36,37,38,39,40],$Vw=[1,79],$Vx=[20,22],$Vy=[1,91],$Vz=[1,93],$VA=[1,94],$VB=[1,92],$VC=[1,95],$VD=[20,21,22,41,42,45,46,47,48,49,50],$VE=[20,21,22,45,46,47,48,49,50],$VF=[17,27,30,31,33,35,36,37,38,39,40];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"CUERPO":4,"EOF":5,"DECLARACION":6,"ASIGNACION":7,"METODO":8,"MAIN":9,"CUERPO2":10,"IMPRIMIR":11,"FUNCWHILE":12,"FUNCIF":13,"LLAMADA":14,"BREAKK":15,"ejecutar":16,"identificador":17,"pIzq":18,"VALORESLLAMADA":19,"pDer":20,"pyc":21,"comaa":22,"EXP":23,"tipoVoid":24,"PARAMETROS":25,"llaveIzq":26,"llaveDer":27,"TIPO":28,"igual":29,"sentenciaWhile":30,"sentenciaIf":31,"sentenciaElse":32,"imprimir":33,"CASTEO":34,"romper":35,"tipoDouble":36,"tipoChar":37,"tipoBooleano":38,"tipoInt":39,"tipoString":40,"mas":41,"menos":42,"por":43,"dividido":44,"igualIgual":45,"mayorQue":46,"menorQue":47,"mayorIgual":48,"menorIgual":49,"diferente":50,"entero":51,"decimall":52,"cadenaaa":53,"caracter":54,"truee":55,"falsee":56,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",16:"ejecutar",17:"identificador",18:"pIzq",20:"pDer",21:"pyc",22:"comaa",24:"tipoVoid",26:"llaveIzq",27:"llaveDer",29:"igual",30:"sentenciaWhile",31:"sentenciaIf",32:"sentenciaElse",33:"imprimir",35:"romper",36:"tipoDouble",37:"tipoChar",38:"tipoBooleano",39:"tipoInt",40:"tipoString",41:"mas",42:"menos",43:"por",44:"dividido",45:"igualIgual",46:"mayorQue",47:"menorQue",48:"mayorIgual",49:"menorIgual",50:"diferente",51:"entero",52:"decimall",53:"cadenaaa",54:"caracter",55:"truee",56:"falsee"},
productions_: [0,[3,2],[4,2],[4,2],[4,2],[4,2],[4,1],[4,1],[4,1],[4,1],[10,2],[10,2],[10,2],[10,2],[10,2],[10,2],[10,2],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[9,6],[9,5],[19,3],[19,1],[14,5],[14,4],[8,8],[8,7],[25,4],[25,2],[6,5],[6,3],[7,4],[12,7],[13,11],[13,7],[13,9],[11,5],[34,4],[15,2],[28,1],[28,1],[28,1],[28,1],[28,1],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,2],[23,3],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; console.log('Funciono');
break;
case 2: case 3: case 4: case 5: case 10: case 11: case 12: case 13: case 15:
 $$[$0-1].push($$[$0]);this.$=$$[$0-1];
break;
case 6: case 7: case 8: case 9: case 17: case 18: case 19:
 this.$=[$$[$0]];
break;
case 14:
 $$[$0-1].push($$[$0]); this.$=$$[$0-1]; 
break;
case 20: case 21: case 22: case 27:
this.$=[$$[$0]];
break;
case 24:
this.$=INSTRUCCIONES.nuevoMain($$[$0-4], $$[$0-2]);
break;
case 25:
this.$=INSTRUCCIONES.nuevoMain($$[$0-3], []);
break;
case 26:
$$[$0-2].push($$[$0]); this.$=$$[$0-2];
break;
case 28:
this.$=INSTRUCCIONES.nuevaLlamada($$[$0-4], $$[$0-2]);
break;
case 29:
this.$=INSTRUCCIONES.nuevaLlamada($$[$0-3], []);
break;
case 30:
this.$=INSTRUCCIONES.nuevoMetodo($$[$0-6],$$[$0-4],$$[$0-1]);
break;
case 31:
this.$=INSTRUCCIONES.nuevoMetodo($$[$0-5],[],$$[$0-1]);
break;
case 32:
$$[$0-3].push(INSTRUCCIONES.nuevoParametro($$[$0-1],$$[$0]));this.$=$$[$0-3];
break;
case 33:
this.$=[INSTRUCCIONES.nuevoParametro($$[$0-1],$$[$0])];
break;
case 34:
 this.$=INSTRUCCIONES.nuevaDeclaracion($$[$0-4],$$[$0-3],$$[$0-1]); 
break;
case 35:
 this.$=INSTRUCCIONES.nuevaDeclaracion($$[$0-2],$$[$0-1],undefined); 
break;
case 36:
this.$=INSTRUCCIONES.nuevaAsignacion($$[$0-3],$$[$0-1]);
break;
case 37:
this.$=INSTRUCCIONES.nuevaWhile($$[$0-4],$$[$0-1]);
break;
case 38:
this.$=INSTRUCCIONES.nuevaIf($$[$0-8],$$[$0-5],$$[$0-1]);
break;
case 39:
this.$=INSTRUCCIONES.nuevaIf($$[$0-4],$$[$0-1],undefined);
break;
case 40:
this.$=INSTRUCCIONES.nuevaIf($$[$0-6],$$[$0-3],[$$[$0]]);
break;
case 41:
 this.$=INSTRUCCIONES.nuevaImprimir($$[$0-2]);
break;
case 44:
 this.$=TIPO_DATO.DECIMAL; 
break;
case 46:
 this.$=TIPO_DATO.BANDERA; 
break;
case 48:
 this.$=TIPO_DATO.CADENA; 
break;
case 49:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.SUMA,$$[$0-2],$$[$0]);
break;
case 50:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.RESTA,$$[$0-2],$$[$0]);
break;
case 51:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MULTIPLICACION,$$[$0-2],$$[$0]);
break;
case 52:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.DIVISION,$$[$0-2],$$[$0]);
break;
case 53:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.IGUALIGUAL,$$[$0-2],$$[$0]);
break;
case 54:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYOR,$$[$0-2],$$[$0]);
break;
case 55:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENOR,$$[$0-2],$$[$0]);
break;
case 56:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYORIGUAL,$$[$0-2],$$[$0]);
break;
case 57:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENORIGUAL,$$[$0-2],$$[$0]);
break;
case 58:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.NOIGUAL,$$[$0-2],$$[$0]);
break;
case 59:
this.$=INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NEGATIVO,$$[$0]);
break;
case 60:
this.$=$$[$0-1]
break;
case 63:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.DECIMAL,Number($$[$0]));
break;
case 64:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.CADENA,$$[$0]);
break;
case 66:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,true);
break;
case 67:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,false);
break;
case 68:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.IDENTIFICADOR,$$[$0]);
break;
}
},
table: [{3:1,4:2,6:5,7:4,8:3,9:6,16:$V0,17:$V1,24:$V2,28:9,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{1:[3]},{5:[1,16],6:17,7:18,8:19,9:20,16:$V0,17:$V1,24:$V2,28:9,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($V8,[2,6]),o($V8,[2,7]),o($V8,[2,8]),o($V8,[2,9]),{17:[1,21]},{29:$V9},{17:[1,23]},{17:[1,24]},o($Va,[2,44]),o($Va,[2,45]),o($Va,[2,46]),o($Va,[2,47]),o($Va,[2,48]),{1:[2,1]},o($V8,[2,2]),o($V8,[2,3]),o($V8,[2,4]),o($V8,[2,5]),{18:[1,25]},{17:$Vb,18:$Vc,23:26,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{21:[1,38],29:[1,37]},{18:[1,39]},{20:[1,41],25:40,28:42,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{21:[1,43],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{17:$Vb,18:$Vc,23:54,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:55,28:56,34:29,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($Vu,[2,61]),o($Vu,[2,62]),o($Vu,[2,63]),o($Vu,[2,64]),o($Vu,[2,65]),o($Vu,[2,66]),o($Vu,[2,67]),o($Vu,[2,68]),{17:$Vb,18:$Vc,23:57,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($Vv,[2,35]),{17:$Vb,18:$Vc,19:58,20:[1,59],23:60,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{20:[1,61],22:[1,62]},{26:[1,63]},{17:[1,64]},o($Vv,[2,36]),{17:$Vb,18:$Vc,23:65,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:66,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:67,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:68,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:69,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:70,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:71,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:72,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:73,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:74,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($Vu,[2,59]),{20:[1,75],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{20:[1,76]},{21:[1,77],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{20:[1,78],22:$Vw},{21:[1,80]},o($Vx,[2,27],{41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt}),{26:[1,81]},{28:82,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{6:85,7:84,10:83,11:86,12:87,13:89,14:88,15:90,17:$Vy,28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($Vx,[2,33]),o($VD,[2,49],{43:$Vm,44:$Vn}),o($VD,[2,50],{43:$Vm,44:$Vn}),o($Vu,[2,51]),o($Vu,[2,52]),o($VE,[2,53],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($VE,[2,54],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($VE,[2,55],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($VE,[2,56],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($VE,[2,57],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($VE,[2,58],{41:$Vk,42:$Vl,43:$Vm,44:$Vn}),o($Vu,[2,60]),{17:$Vb,18:$Vc,23:96,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($Vv,[2,34]),{21:[1,97]},{17:$Vb,18:$Vc,23:98,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($V8,[2,25]),{6:85,7:84,10:99,11:86,12:87,13:89,14:88,15:90,17:$Vy,28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{17:[1,100]},{6:102,7:107,11:103,12:104,13:105,14:106,15:108,17:$Vy,27:[1,101],28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($VF,[2,17]),o($VF,[2,18]),o($VF,[2,19]),o($VF,[2,20]),o($VF,[2,21]),o($VF,[2,22]),o($VF,[2,23]),{18:[1,109],29:$V9},{18:[1,110]},{18:[1,111]},{18:[1,112]},{21:[1,113]},o($Vu,[2,42]),o($V8,[2,24]),o($Vx,[2,26],{41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt}),{6:102,7:107,11:103,12:104,13:105,14:106,15:108,17:$Vy,27:[1,114],28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($Vx,[2,32]),o($V8,[2,31]),o($VF,[2,10]),o($VF,[2,11]),o($VF,[2,12]),o($VF,[2,13]),o($VF,[2,14]),o($VF,[2,15]),o($VF,[2,16]),{17:$Vb,18:$Vc,19:115,20:[1,116],23:60,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:117,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:118,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},{17:$Vb,18:$Vc,23:119,34:29,42:$Vd,51:$Ve,52:$Vf,53:$Vg,54:$Vh,55:$Vi,56:$Vj},o($VF,[2,43]),o($V8,[2,30]),{20:[1,120],22:$Vw},{21:[1,121]},{20:[1,122],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{20:[1,123],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{20:[1,124],41:$Vk,42:$Vl,43:$Vm,44:$Vn,45:$Vo,46:$Vp,47:$Vq,48:$Vr,49:$Vs,50:$Vt},{21:[1,125]},o($VF,[2,29]),{21:[1,126]},{26:[1,127]},{26:[1,128]},o($VF,[2,28]),o($VF,[2,41]),{6:85,7:84,10:129,11:86,12:87,13:89,14:88,15:90,17:$Vy,28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{6:85,7:84,10:130,11:86,12:87,13:89,14:88,15:90,17:$Vy,28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{6:102,7:107,11:103,12:104,13:105,14:106,15:108,17:$Vy,27:[1,131],28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},{6:102,7:107,11:103,12:104,13:105,14:106,15:108,17:$Vy,27:[1,132],28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($VF,[2,37]),o($VF,[2,39],{32:[1,133]}),{13:135,26:[1,134],31:$VA},{6:85,7:84,10:136,11:86,12:87,13:89,14:88,15:90,17:$Vy,28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($VF,[2,40]),{6:102,7:107,11:103,12:104,13:105,14:106,15:108,17:$Vy,27:[1,137],28:9,30:$Vz,31:$VA,33:$VB,35:$VC,36:$V3,37:$V4,38:$V5,39:$V6,40:$V7},o($VF,[2,38])],
defaultActions: {16:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
    const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;
    const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
    const INSTRUCCIONES = require('../Arbol/instrucciones').INSTRUCCIONES;
    const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0://ignorar espacios en blanco
break;
case 1://comentario unilinea
break;
case 2://comentario multilinea
break;
case 3:return 55;
break;
case 4:return 56;
break;
case 5:return 41;
break;
case 6:return 42;
break;
case 7:return 43;
break;
case 8:return 44;
break;
case 9:return 'elevado';
break;
case 10:return 'modular';
break;
case 11:return 45;
break;
case 12:return 50;
break;
case 13:return 49;
break;
case 14:return 48;
break;
case 15:return 29;
break;
case 16:return 'nott';
break;
case 17:return 'dosPuntos';
break;
case 18:return 21;
break;
case 19:return 46;
break;
case 20:return 47;
break;
case 21:return 'pregunta';
break;
case 22:return 'punto';
break;
case 23:return 'orr';
break;
case 24:return 'andd';
break;
case 25:return 18;
break;
case 26:return 20;
break;
case 27:return 26;
break;
case 28:return 27;
break;
case 29:return 'corIzq';
break;
case 30:return 'corDer';
break;
case 31:return 'nuevo';
break;
case 32:return 'listaa';
break;
case 33:return 'punto';
break;
case 34:return 22;
break;
case 35:return 'agregar';
break;
case 36:return 31;
break;
case 37:return 32;
break;
case 38:return 33;
break;
case 39:return 'sentenciaSwitch';
break;
case 40:return 'casoo';
break;
case 41:return 35;
break;
case 42:return 'defectoo';
break;
case 43:return 30;
break;
case 44:return 'sentenciaDo';
break;
case 45:return 'sentenciaFor';
break;
case 46:return 'continuar';
break;
case 47:return 'retornar';
break;
case 48:return 24;
break;
case 49:return 16;
break;
case 50:return 'toMinusculas';
break;
case 51:return 'toMayus';
break;
case 52:return 'tamanoo';
break;
case 53:return 'f_truncate';
break;
case 54:return 'redondear';
break;
case 55:return 'retTipo';
break;
case 56:return 'toTexto';
break;
case 57:return 'toCaracter';
break;
case 58:return 39;
break;
case 59:return 36;
break;
case 60:return 38;
break;
case 61:return 37;
break;
case 62:return 40;
break;
case 63:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2); return 53;
break;
case 64:return 54;
break;
case 65:return 52;
break;
case 66:return 51; 
break;
case 67:return 17;
break;
case 68:return 5;
break;
case 69:console.log('Error Lexico: '+yy_.yytext+' en la linea '+ yy_.yylloc.first_line + ' en la columna '+ yy_.yylloc.first_column);
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:=)/i,/^(?:!)/i,/^(?::)/i,/^(?:;)/i,/^(?:>)/i,/^(?:<)/i,/^(?:\?)/i,/^(?:\.)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:new\b)/i,/^(?:list\b)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:add\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:print\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:break\b)/i,/^(?:default\b)/i,/^(?:while\b)/i,/^(?:do\b)/i,/^(?:for\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:void\b)/i,/^(?:exec\b)/i,/^(?:tolower\b)/i,/^(?:toupper\b)/i,/^(?:length\b)/i,/^(?:truncate\b)/i,/^(?:round\b)/i,/^(?:typeof\b)/i,/^(?:tostring\b)/i,/^(?:tochararray\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:([\"](\\"|[^"])*[^\\][\"])|[\"][\"])/i,/^(?:'([^\']|\\n|\\r|\\t)')/i,/^(?:[0-9]+(\.[  |0-9]+)?)/i,/^(?:[0-9]+)/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatic;
exports.Parser = gramatic.Parser;
exports.parse = function () { return gramatic.parse.apply(gramatic, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}