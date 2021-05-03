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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,11],$V2=[1,12],$V3=[1,10],$V4=[1,13],$V5=[1,14],$V6=[1,15],$V7=[1,16],$V8=[1,17],$V9=[5,12,16,20,21,23,25,26,27,28,29],$Va=[12,18],$Vb=[1,39],$Vc=[1,31],$Vd=[1,30],$Ve=[1,33],$Vf=[1,34],$Vg=[1,35],$Vh=[1,36],$Vi=[1,37],$Vj=[1,38],$Vk=[1,46],$Vl=[1,47],$Vm=[1,48],$Vn=[1,49],$Vo=[1,50],$Vp=[1,51],$Vq=[1,52],$Vr=[1,53],$Vs=[1,54],$Vt=[1,55],$Vu=[15,18,30,31,32,33,34,35,36,37,38,39],$Vv=[15,18,30,31,34,35,36,37,38,39],$Vw=[15,18,34,35,36,37,38,39];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"CUERPO":4,"EOF":5,"DECLARACION":6,"IMPRIMIR":7,"FUNCWHILE":8,"FUNCIF":9,"ASIGNACION":10,"TIPO":11,"identificador":12,"igual":13,"EXP":14,"pyc":15,"sentenciaWhile":16,"pIzq":17,"pDer":18,"llaveIzq":19,"llaveDer":20,"sentenciaIf":21,"sentenciaElse":22,"imprimir":23,"CASTEO":24,"tipoDouble":25,"tipoChar":26,"tipoBooleano":27,"tipoInt":28,"tipoString":29,"mas":30,"menos":31,"por":32,"dividido":33,"igualIgual":34,"mayorQue":35,"menorQue":36,"mayorIgual":37,"menorIgual":38,"diferente":39,"entero":40,"decimall":41,"cadenaaa":42,"caracter":43,"truee":44,"falsee":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"identificador",13:"igual",15:"pyc",16:"sentenciaWhile",17:"pIzq",18:"pDer",19:"llaveIzq",20:"llaveDer",21:"sentenciaIf",22:"sentenciaElse",23:"imprimir",25:"tipoDouble",26:"tipoChar",27:"tipoBooleano",28:"tipoInt",29:"tipoString",30:"mas",31:"menos",32:"por",33:"dividido",34:"igualIgual",35:"mayorQue",36:"menorQue",37:"mayorIgual",38:"menorIgual",39:"diferente",40:"entero",41:"decimall",42:"cadenaaa",43:"caracter",44:"truee",45:"falsee"},
productions_: [0,[3,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,1],[4,1],[4,1],[4,1],[4,1],[6,5],[6,3],[10,4],[8,7],[9,11],[9,7],[7,5],[24,4],[11,1],[11,1],[11,1],[11,1],[11,1],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,2],[14,3],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; console.log('Funciono');
break;
case 2: case 3: case 4: case 5: case 6:
 $$[$0-1].push($$[$0]);this.$=$$[$0-1];
break;
case 7: case 8: case 9:
 this.$=[$$[$0]];
break;
case 10: case 11:
this.$=[$$[$0]];
break;
case 12:
 this.$=INSTRUCCIONES.nuevaDeclaracion($$[$0-4],$$[$0-3],$$[$0-1]); 
break;
case 13:
 this.$=INSTRUCCIONES.nuevaDeclaracion($$[$0-2],$$[$0-1],undefined); 
break;
case 14:
this.$=INSTRUCCIONES.nuevaAsignacion($$[$0-3],$$[$0-1]);
break;
case 15:
this.$=INSTRUCCIONES.nuevaWhile($$[$0-4],$$[$0-1]);
break;
case 16:
this.$=INSTRUCCIONES.nuevaIf($$[$0-8],$$[$0-5],$$[$0-1]);
break;
case 17:
this.$=INSTRUCCIONES.nuevaIf($$[$0-4],$$[$0-1],undefined);
break;
case 18:
 this.$=INSTRUCCIONES.nuevaImprimir($$[$0-2]);
break;
case 20:
 this.$=TIPO_DATO.DECIMAL; 
break;
case 22:
 this.$=TIPO_DATO.BANDERA; 
break;
case 24:
 this.$=TIPO_DATO.CADENA; 
break;
case 25:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.SUMA,$$[$0-2],$$[$0]);
break;
case 26:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.RESTA,$$[$0-2],$$[$0]);
break;
case 27:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MULTIPLICACION,$$[$0-2],$$[$0]);
break;
case 28:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.DIVISION,$$[$0-2],$$[$0]);
break;
case 29:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.IGUALIGUAL,$$[$0-2],$$[$0]);
break;
case 30:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYOR,$$[$0-2],$$[$0]);
break;
case 31:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENOR,$$[$0-2],$$[$0]);
break;
case 32:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYORIGUAL,$$[$0-2],$$[$0]);
break;
case 33:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENORIGUAL,$$[$0-2],$$[$0]);
break;
case 34:
this.$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.NOIGUAL,$$[$0-2],$$[$0]);
break;
case 35:
this.$=INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NEGATIVO,$$[$0]);
break;
case 36:
this.$=$$[$0-1]
break;
case 39:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.DECIMAL,Number($$[$0]));
break;
case 40:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.CADENA,$$[$0]);
break;
case 42:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,true);
break;
case 43:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,false);
break;
case 44:
this.$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.IDENTIFICADOR,$$[$0]);
break;
}
},
table: [{3:1,4:2,6:4,7:5,8:6,9:7,10:3,11:9,12:$V0,16:$V1,21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},{1:[3]},{5:[1,18],6:19,7:20,8:21,9:22,10:23,11:9,12:$V0,16:$V1,21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},o($V9,[2,7]),o($V9,[2,8]),o($V9,[2,9]),o($V9,[2,10]),o($V9,[2,11]),{13:[1,24]},{12:[1,25]},{17:[1,26]},{17:[1,27]},{17:[1,28]},o($Va,[2,20]),o($Va,[2,21]),o($Va,[2,22]),o($Va,[2,23]),o($Va,[2,24]),{1:[2,1]},o($V9,[2,2]),o($V9,[2,3]),o($V9,[2,4]),o($V9,[2,5]),o($V9,[2,6]),{12:$Vb,14:29,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{13:[1,40],15:[1,41]},{12:$Vb,14:42,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:43,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:44,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{15:[1,45],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},{12:$Vb,14:56,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{11:58,12:$Vb,14:57,17:$Vc,24:32,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},o($Vu,[2,37]),o($Vu,[2,38]),o($Vu,[2,39]),o($Vu,[2,40]),o($Vu,[2,41]),o($Vu,[2,42]),o($Vu,[2,43]),o($Vu,[2,44]),{12:$Vb,14:59,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},o($V9,[2,13]),{18:[1,60],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},{18:[1,61],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},{18:[1,62],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},o($V9,[2,14]),{12:$Vb,14:63,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:64,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:65,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:66,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:67,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:68,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:69,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:70,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:71,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},{12:$Vb,14:72,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},o($Vu,[2,35]),{18:[1,73],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},{18:[1,74]},{15:[1,75],30:$Vk,31:$Vl,32:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt},{15:[1,76]},{19:[1,77]},{19:[1,78]},o($Vv,[2,25],{32:$Vm,33:$Vn}),o($Vv,[2,26],{32:$Vm,33:$Vn}),o($Vu,[2,27]),o($Vu,[2,28]),o($Vw,[2,29],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vw,[2,30],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vw,[2,31],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vw,[2,32],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vw,[2,33],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vw,[2,34],{30:$Vk,31:$Vl,32:$Vm,33:$Vn}),o($Vu,[2,36]),{12:$Vb,14:79,17:$Vc,24:32,31:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj},o($V9,[2,12]),o($V9,[2,18]),{4:80,6:4,7:5,8:6,9:7,10:3,11:9,12:$V0,16:$V1,21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},{4:81,6:4,7:5,8:6,9:7,10:3,11:9,12:$V0,16:$V1,21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},o($Vu,[2,19]),{6:19,7:20,8:21,9:22,10:23,11:9,12:$V0,16:$V1,20:[1,82],21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},{6:19,7:20,8:21,9:22,10:23,11:9,12:$V0,16:$V1,20:[1,83],21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},o($V9,[2,15]),o($V9,[2,17],{22:[1,84]}),{19:[1,85]},{4:86,6:4,7:5,8:6,9:7,10:3,11:9,12:$V0,16:$V1,21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},{6:19,7:20,8:21,9:22,10:23,11:9,12:$V0,16:$V1,20:[1,87],21:$V2,23:$V3,25:$V4,26:$V5,27:$V6,28:$V7,29:$V8},o($V9,[2,16])],
defaultActions: {18:[2,1]},
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
case 3:return 44;
break;
case 4:return 45;
break;
case 5:return 30;
break;
case 6:return 31;
break;
case 7:return 32;
break;
case 8:return 33;
break;
case 9:return 'elevado';
break;
case 10:return 'modular';
break;
case 11:return 34;
break;
case 12:return 39;
break;
case 13:return 38;
break;
case 14:return 37;
break;
case 15:return 13;
break;
case 16:return 'nott';
break;
case 17:return 'dosPuntos';
break;
case 18:return 15;
break;
case 19:return 35;
break;
case 20:return 36;
break;
case 21:return 'pregunta';
break;
case 22:return 'punto';
break;
case 23:return 'orr';
break;
case 24:return 'andd';
break;
case 25:return 17;
break;
case 26:return 18;
break;
case 27:return 19;
break;
case 28:return 20;
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
case 34:return 'comaa';
break;
case 35:return 'agregar';
break;
case 36:return 21;
break;
case 37:return 22;
break;
case 38:return 23;
break;
case 39:return 'sentenciaSwitch';
break;
case 40:return 'casoo';
break;
case 41:return 'romper';
break;
case 42:return 'defectoo';
break;
case 43:return 16;
break;
case 44:return 'sentenciaDo';
break;
case 45:return 'sentenciaFor';
break;
case 46:return 'continuar';
break;
case 47:return 'retornar';
break;
case 48:return 'tipoVoid';
break;
case 49:return 'ejecutar';
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
case 58:return 28;
break;
case 59:return 25;
break;
case 60:return 27;
break;
case 61:return 26;
break;
case 62:return 29;
break;
case 63:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2); return 42;
break;
case 64:return 43;
break;
case 65:return 41;
break;
case 66:return 40; 
break;
case 67:return 12;
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