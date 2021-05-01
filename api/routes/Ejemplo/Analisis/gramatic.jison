/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
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
"="						return 'igual';
"!"						return 'nott';
":"						return 'dosPuntos';
";"						return 'pyc';
">"						return 'mayorQue';
"<"						return 'menorQue';
"?"						return 'pregunta';
"."						return 'punto';
"=="					return 'igualIgual';
"!="					return 'diferente';
"<="					return 'menorIgual';
">="					return 'mayorIgual';
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
"."						return 'punto';
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

\"[^\"]*\"				{yytext=yytext.substr(1,yyleng-2); return 'cadenaaa';}
\'[^\']?\'				return 'caracter';
[0-9]+("."[  |0-9]+)?	return 'decimall';
[0-9]+					return 'entero'; 
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
%}

// Precedencia de operadores
%left 'orr'
%left 'andd'
%right 'nott'
%left 'igualIgual' 'mayorQue' 'menorQue' 'mayorIgual' 'menorIgual' 'diferente'
%left 'mas' 'menos'
%left 'por' 'dividido'  //falta el de potencia
%nonassosiative 'potencia'
%right UCASTEO
%left UMENOS

%start INICIO 

//SECCION DE GRAMATICA
%%

INICIO
	: CUERPO EOF { return $1; console.log('Funciono');};

CUERPO
	: CUERPO DECLARACION                    { $1.push($2);$$=$1;}
	| CUERPO IMPRIMIR                       { $1.push($2);$$=$1;}
	| CUERPO ASIGNACION
	| DECLARACION                           { $$=[$1];}//sin tener que retornar arraylist solo un arreglo
	| ASIGNACION
	| IMPRIMIR                              { $$=[$1];};
//aqui iran como el while, if, etc
DECLARACION
	: TIPO identificador igual EXP pyc      { $$=INSTRUCCIONES.nuevaDeclaracion($1,$2,$4); }
	| TIPO identificador pyc                { $$=INSTRUCCIONES.nuevaDeclaracion($1,$2,undefined); };

ASIGNACION
	:identificador igual EXP pyc;

IMPRIMIR 
	: imprimir pIzq EXP pDer pyc    { $$=INSTRUCCIONES.nuevaImprimir($3);};

CASTEO
	: pIzq TIPO pDer EXP %prec UCASTEO;

TIPO
	: tipoDouble                    { $$=TIPO_DATO.DECIMAL; }
	| tipoChar
	| tipoBooleano                  { $$=TIPO_DATO.BANDERA; }
	| tipoInt
	| tipoString                    { $$=TIPO_DATO.CADENA; };

EXP
	: EXP mas EXP                   {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.SUMA,$1,$3);}
	| EXP menos EXP                 {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.RESTA,$1,$3);}                             
	| EXP por EXP                   {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.MULTIPLICACION,$1,$3);}
	| EXP dividido EXP              {$$=INSTRUCCIONES.nuevaOperacionBinaria(TIPO_OPERACION.DIVISION,$1,$3);}
	| menos EXP %prec UMENOS        {$$=INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NEGATIVO,$2);}
	| pIzq EXP pDer                 {$$=$2}
    | CASTEO
    | entero                        
	| decimall                      {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.DECIMAL,Number($1));}
	| cadenaaa                      {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.CADENA,$1);}
    | caracter  
	| truee                         {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,true);}
	| falsee                        {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.BANDERA,false);}
	| identificador                 {$$=INSTRUCCIONES.nuevoValor(TIPO_VALOR.IDENTIFICADOR,$1);};




