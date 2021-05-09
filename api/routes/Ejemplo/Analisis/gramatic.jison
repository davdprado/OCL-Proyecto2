/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */

%{
    function addSimbolo(tipoValor,tipo,id,fila,columna){
        return {
			id:id,
			tipo:tipo,
			tipoValor:tipoValor,
			fila:fila,
			columna:columna
		}
    }
%}

%lex

%options case-insensitive

%%

\s+						//ignorar espacios en blanco
"//".*					//comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	//comentario multilinea

"true"					return 'truee';
"false"					return 'falsee';
"+"						return 'mas';
"-"						return 'menos';
"*"						return 'por';
"/"						return 'dividido';
"^"						return 'elevado';
"%"						return 'modular';
"=="					return 'igualIgual';
"!="					return 'diferente';
"<="					return 'menorIgual';
">="					return 'mayorIgual';
"="						return 'igual';
"!"						return 'nott';
":"						return 'dosPuntos';
";"						return 'pyc';
">"						return 'mayorQue';
"<"						return 'menorQue';
"?"						return 'pregunta';
"."						return 'punto';
"||"					return 'orr';
"&&"					return 'andd';
"("						return 'pIzq';
")"						return 'pDer';
"{"						return 'llaveIzq';
"}"						return 'llaveDer';
"["						return 'corIzq';
"]"						return 'corDer';
"new"					return 'nuevo';
"list"					return 'listaa';
","						return 'comaa';
"add"					return 'agregar';
"if"					return 'sentenciaIf';
"else"					return 'sentenciaElse';
"print"					return 'imprimir';
"switch"				return 'sentenciaSwitch';
"case"					return 'casoo';
"break"					return 'romper';
"default"				return 'defectoo';
"while"					return 'sentenciaWhile';
"do"					return 'sentenciaDo';
"for"					return 'sentenciaFor';
"continue"				return 'continuar';
"return"				return 'retornar';
"void"					return 'tipoVoid';
"exec"					return 'ejecutar';
"tolower"				return 'toMinusculas';
"toupper"				return 'toMayus';
"length"				return 'tamanoo';
"truncate"				return 'f_truncate';
"round"					return 'redondear';
"typeof"				return 'retTipo';
"tostring"				return 'toTexto';
"tochararray"			return 'toCaracter';
"int"					return 'tipoInt';
"double"				return 'tipoDouble';
"boolean"				return 'tipoBooleano';
"char"					return 'tipoChar';
"string"				return 'tipoString';

//pueden faltar los -- o ++

([\"]("\\\""|[^"])*[^\\][\"])|[\"][\"]				{yytext=yytext.substr(1,yyleng-2); return 'cadenaaa';}
\'([^\']|"\\n"|"\\r"|"\\t")\'				{yytext=yytext.substr(1,yyleng-2); return 'caracter'};
[0-9]+"."[0-9]+\b	return 'decimall';
[0-9]+\b						return 'entero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';
					

<<EOF>>					return 'EOF';

. {console.log('Error Lexico: '+yytext+' en la linea '+ yylloc.first_line + ' en la columna '+ yylloc.first_column);}

/lex 

//parser-code
%{
    const TIPO_OPERACION = require('../Arbol/instrucciones').TIPO_OPERACION;
    const TIPO_VALOR = require('../Arbol/instrucciones').TIPO_VALOR;
    const TIPO_INSTRUCCIONES = require('../Arbol/instrucciones').TIPO_INSTRUCCIONES;
    const INSTRUCCIONES = require('../Arbol/instrucciones').INSTRUCCIONES;
    const TIPO_DATO = require('../Arbol/tablaSimbolos').TIPO_DATO;
	const TIPO_ERROR = require('../Arbol/instrucciones').TIPO_ERROR;
	const listaerrores=require('../interprete/interprete').listaerrores;
	const listasimbolos=require('../interprete/interprete').listasimbolos; 
%}

// Precedencia de operadores
%left 'orr'
%left 'andd'
%left 'nott'
%left 'igualIgual' 'mayorQue' 'menorQue' 'mayorIgual' 'menorIgual' 'diferente'
%left 'mas' 'menos'
%left 'por' 'dividido' 'modular' //falta el de potencia
%nonassoc 'elevado'
%right UCASTEO
%left UMENOS

%start INICIO 

//SECCION DE GRAMATICA
%%

INICIO
	: CUERPO EOF { return $1; console.log('Funciono');};


CUERPO
	: CUERPO DECLARACION                    { $1.push($2);$$=$1;}
	| CUERPO ASIGNACION						{ $1.push($2);$$=$1;}
	| CUERPO METODO							{ $1.push($2);$$=$1;}
	| CUERPO MAIN							{ $1.push($2);$$=$1;}
	| METODO								{ $$=[$1];}
	| ASIGNACION							{ $$=[$1];}
	| DECLARACION                           { $$=[$1];}
	| MAIN									{ $$=[$1];}
	| error									{
											var desc='Este es un error sintáctico: "' + yytext + '", en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column;
											console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
											nuevoError={
												tipo:TIPO_ERROR.SINTACTICO,
												descripcion:desc,
												linea: this._$.first_line,
												col:this._$.first_column
											};
											listaerrores.push(nuevoError);
											$$=[$1];};

CUERPO2
	: CUERPO2 DECLARACION                   { $1.push($2);$$=$1;}
	| CUERPO2 IMPRIMIR                      { $1.push($2);$$=$1;}
	| CUERPO2 FUNCWHILE                     { $1.push($2);$$=$1;}
	| CUERPO2 FUNCIF                       	{ $1.push($2);$$=$1;}
	| CUERPO2 LLAMADA 						{ $1.push($2); $$=$1; }
	| CUERPO2 ASIGNACION					{ $1.push($2);$$=$1;}
	| CUERPO2 BREAKK						{ $1.push($2);$$=$1;}
	| CUERPO2 FUNCDOWHILE					{ $1.push($2);$$=$1;}
	| CUERPO2 CICLOFOR						{ $1.push($2);$$=$1;}
	| CUERPO2 FUNCSWITCH					{ $1.push($2);$$=$1;}
	| FUNCSWITCH							{ $$=[$1];}
	| CICLOFOR								{ $$=[$1];}
	| FUNCDOWHILE							{ $$=[$1];}
	| ASIGNACION							{ $$=[$1];}
	| DECLARACION                           { $$=[$1];}//sin tener que retornar arraylist solo un arreglo
	| IMPRIMIR                              { $$=[$1];}
	| FUNCWHILE								{$$=[$1];}
	| LLAMADA								{$$=[$1];}
	| FUNCIF								{$$=[$1];}
	| BREAKK								{$$=[$1];}
	| error									{
											var desc='Este es un error sintáctico: "' + yytext + '", en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column;
											console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
											nuevoError={
												tipo:TIPO_ERROR.SINTACTICO,
												descripcion:desc,
												linea: this._$.first_line,
												col:this._$.first_column
											};
											listaerrores.push(nuevoError);
											$$=[$1];};	

	
//aqui iran como el while, if, etc
MAIN
	: ejecutar identificador pIzq VALORESLLAMADA pDer pyc {$$=INSTRUCCIONES.nuevoMain($2, $4);}
    | ejecutar identificador pIzq pDer pyc {$$=INSTRUCCIONES.nuevoMain($2, []);};

VALORESLLAMADA
    : VALORESLLAMADA comaa EXP {$1.push($3); $$=$1;}
    | EXP {$$=[$1];};

LLAMADA
    : identificador pIzq VALORESLLAMADA pDer pyc {$$=INSTRUCCIONES.nuevaLlamada($1, $3);}
    | identificador pIzq pDer pyc {$$=INSTRUCCIONES.nuevaLlamada($1, []);};

METODO
	: tipoVoid identificador pIzq PARAMETROS pDer llaveIzq CUERPO2 llaveDer {listasimbolos.push(addSimbolo($1,TIPO_INSTRUCCIONES.METODO,$2,this._$.first_line,this._$.first_column));$$=INSTRUCCIONES.nuevoMetodo($2,$4,$7);}
	| tipoVoid identificador pIzq pDer llaveIzq CUERPO2 llaveDer {listasimbolos.push(addSimbolo($1,TIPO_INSTRUCCIONES.METODO,$2,this._$.first_line,this._$.first_column));$$=INSTRUCCIONES.nuevoMetodo($2,[],$6);};

PARAMETROS
	: PARAMETROS comaa TIPO identificador		{$1.push(INSTRUCCIONES.nuevoParametro($3,$4));listasimbolos.push(addSimbolo($3,'INST_PARAMETRO',$4,this._$.first_line,this._$.first_column));$$=$1;}
	| TIPO identificador						{listasimbolos.push(addSimbolo($1,'INST_PARAMETRO',$2,this._$.first_line,this._$.first_column));$$=[INSTRUCCIONES.nuevoParametro($1,$2)];};		

CICLOFOR
	:sentenciaFor pIzq IFOR  pyc EXP  pyc ASIG pDer llaveIzq CUERPO2 llaveDer;	

IFOR
	: DECLA
	| ASIG;	

DECLARACION
	: DECLA  pyc    {$$=$1};

DECLA
	:TIPO identificador igual EXP			{listasimbolos.push(addSimbolo($1,'VARIABLE',$2,this._$.first_line,this._$.first_column)); $$=INSTRUCCIONES.nuevaDeclaracion($1,$2,$4); }
	|TIPO identificador                 {listasimbolos.push(addSimbolo($1,'VARIABLE',$2,this._$.first_line,this._$.first_column)); $$=INSTRUCCIONES.nuevaDeclaracion($1,$2,undefined); };

ASIGNACION
	:ASIG pyc 			{$$=$1};

ASIG
	:identificador igual EXP  			{$$=INSTRUCCIONES.nuevaAsignacion($1,$3);};

//si lo manejo asi tengo que validar que el valor que retorne EXP sea tipo bandera
FUNCWHILE
	: sentenciaWhile pIzq EXP pDer llaveIzq CUERPO2 llaveDer {$$=INSTRUCCIONES.nuevaWhile($3,$6);};

FUNCDOWHILE
	: sentenciaDo llaveIzq CUERPO2 llaveDer sentenciaWhile pIzq EXP pDer pyc {$$=INSTRUCCIONES.nuevoDoWhile($3,$7);};

FUNCIF
	:sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer sentenciaElse llaveIzq CUERPO2 llaveDer {$$=INSTRUCCIONES.nuevaIf($3,$6,$10);}
	|sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer {$$=INSTRUCCIONES.nuevaIf($3,$6,undefined);}
	|sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer sentenciaElse FUNCIF {$$=INSTRUCCIONES.nuevaIf($3,$6,[$9]);};

FUNCSWITCH
	:sentenciaSwitch pIzq EXP pDer llaveIzq CASOS llaveDer
	|sentenciaSwitch pIzq EXP pDer llaveIzq CASOS defectoo dosPuntos CUERPO2 llaveDer
	|sentenciaSwitch pIzq EXP pDer llaveIzq defectoo dosPuntos CUERPO2 llaveDer;

CASOS
	: CASOS casoo EXP dosPuntos CUERPO2
	| casoo EXP dosPuntos CUERPO2;


IMPRIMIR 
	: imprimir pIzq EXP pDer pyc    { $$=INSTRUCCIONES.nuevaImprimir($3);};

CASTEO
	: pIzq TIPO pDer EXP %prec UCASTEO;

BREAKK
	: romper pyc {$$=INSTRUCCIONES.nuevoBreak();};



TIPO
	: tipoDouble                    { $$=TIPO_DATO.DECIMAL; }
	| tipoChar						{ $$=TIPO_DATO.CARACTER;}
	| tipoBooleano                  { $$=TIPO_DATO.BANDERA; }
	| tipoInt						{ $$=TIPO_DATO.ENTERO;}
	| tipoString                    { $$=TIPO_DATO.CADENA; };

EXP
	: EXP mas EXP                   {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.SUMA,$1,$3);}
	| EXP menos EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.RESTA,$1,$3);}                             
	| EXP por EXP                   {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MULTIPLICACION,$1,$3);}
	| EXP dividido EXP              {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.DIVISION,$1,$3);}
	| EXP modular EXP 				{$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MODULAR,$1,$3);}
	| EXP elevado EXP				{$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.POTENCIA,$1,$3);}
	| EXP igualIgual EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.IGUALIGUAL,$1,$3);}
	| EXP mayorQue EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYOR,$1,$3);}
	| EXP menorQue EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENOR,$1,$3);}
	| EXP mayorIgual EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MAYORIGUAL,$1,$3);}
	| EXP menorIgual EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MENORIGUAL,$1,$3);}
	| EXP diferente EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.NOIGUAL,$1,$3);}
	| EXP orr EXP 					{$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.ORR,$1,$3);}
	| EXP andd EXP                  {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.ANDD,$1,$3);}
	| nott EXP						{$$=INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NOTT,$2);}
	| menos EXP %prec UMENOS        {$$=INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NEGATIVO,$2);}
	| pIzq EXP pDer                 {$$=$2}
    | entero                        {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.ENTERO,Number($1));}
	| decimall                      {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.DECIMAL,Number($1));}
	| cadenaaa                      {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.CADENA,$1);}
    | caracter  					{$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.CARACTER,$1);}
	| truee                         {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,true);}
	| falsee                        {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,false);}
	| identificador                 {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.IDENTIFICADOR,$1);};

