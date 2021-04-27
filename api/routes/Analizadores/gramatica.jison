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
	
%}

// Precedencia de operadores
%left 'orr'
%left 'andd'
%right 'nott'
%left 'igualIgual' 'mayorQue' 'menorQue' 'mayorIgual' 'menorIgual' 'diferente'
%left 'mas' 'menos'
%left 'por' 'dividido'  //falta el de potencia
%left 'potencia'
%left UMENOS

%start INICIO 

//SECCION DE GRAMATICA
%%

INICIO
	: CUERPO EOF { console.log('Funciono');};

CUERPO
	: CUERPO DECLARACION
	| CUERPO IMPRIMIR
	| CUERPO ASIGNACION
	| CUERPO CASTEO
	| CASTEO
	| DECLARACION
	| ASIGNACION
	| IMPRIMIR;

DECLARACION
	: TIPO identificador igual EXP pyc
	| TIPO identificador pyc;

ASIGNACION
	:identificador igual EXP pyc;

IMPRIMIR 
	: imprimir pIzq EXP pDer pyc;

CASTEO
	: pIzq TIPO pDer EXP pyc;

VECTOR
	: TIPO corIzq corDer identificador igual nuevo TIPO corIzq EXP corDer pyc
	| TIPO corIzq corDer identificador igual llaveIzq LISTAVALORES llaveDer pyc;

LISTAVALORES
	: LISTAVALORES comaa VALOR
	| VALOR;

INST_LISTA
	: listaa menorQue TIPO mayorQue identificador igual nuevo listaa menorQue TIPO mayorQue pyc;

AGREGAR_LISTA
	: identificador punto agregar pIzq EXP pDer pyc;

MODIFICAR_LISTA
	: identificador corIzq corIzq EXP corDer corDer igual EXP pyc;

ACCESO_LISTA
	: identificador corIzq corIzq EXP corDer corDer;

TIPO
	: tipoDouble
	| tipoChar
	| tipoBooleano
	| tipoInt
	| tipoString;

EXP
	: EXP mas EXP
	| EXP menos EXP
	| EXP por EXP
	| EXP dividido EXP
	| menos EXP
	| pIzq EXP pDer
    | VALOR;

VALOR
	: entero
	| decimall
	| cadenaaa
    | caracter
	| truee
	| falsee
	| identificador;




