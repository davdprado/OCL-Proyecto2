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


"decimal"			return 'decimal';
"cadena"			return 'cadena';	
"bandera"			return 'bandera';
";"					return 'pycoma';
"-"					return 'menos';
"+"					return 'mas';
"*"					return 'por';
"/"					return 'dividido';
"<"					return 'menor';
"true"				return 'truee';	
"false"				return 'falsee';
"cout"				return 'imprimir';
"("					return 'parizq';
")"					return 'parder';

\"[^\"]*\"				{yytext=yytext.substr(1,yyleng-2); return 'cadenaaa';}
[0-9]+("."[0-9]+)?\b	return 'decimall'; 
([a-zA-Z])[a-zA-Z0-9_]*	return 'identificador';

<<EOF>>					return 'EOF';

. {console.log('Error Lexico: '+yytext+' en la linea '+ yylloc.first_line + ' en la columna '+ yylloc.first_column);}

/lex 

//parser-code
%{
	
%}

// Precedencia de operadores
%left 'mas' 'menos'
%left 'por' 'dividido'
%left UMENOS

%start INICIO 

//SECCION DE GRAMATICA
%%

INICIO
	: CUERPO EOF { console.log('Funciono');};

CUERPO
	: CUERPO DECLARACION
	| CUERPO IMPRIMIR
	| DECLARACION
	| IMPRIMIR;

DECLARACION
	: TIPO identificador menor menos EXP pycoma
	| TIPO identificador pycoma;

IMPRIMIR 
	: imprimir menor menor EXP pycoma;

TIPO
	: decimal
	| cadena
	| bandera;

EXP
	: EXP mas EXP
	| EXP menos EXP
	| EXP por EXP
	| EXP dividido EXP
	| menos EXP
	| parizq EXP parder
	| decimall
	| cadenaaa
	| truee
	| falsee
	| identificador;




