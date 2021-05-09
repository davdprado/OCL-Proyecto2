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
	: CUERPO DECLARACION                    
	| CUERPO ASIGNACION						
	| CUERPO METODO							
	| CUERPO MAIN							
	| METODO								
	| ASIGNACION							
	| DECLARACION                           
	| MAIN									
	| error									;

CUERPO2
	: CUERPO2 DECLARACION                   
	| CUERPO2 IMPRIMIR                      
	| CUERPO2 FUNCWHILE                     
	| CUERPO2 FUNCIF                       	
	| CUERPO2 LLAMADA 						
	| CUERPO2 ASIGNACION					
	| CUERPO2 BREAKK						
	| CUERPO2 FUNCDOWHILE					
	| FUNCDOWHILE							
	| ASIGNACION							
	| DECLARACION                           //sin tener que retornar arraylist solo un arreglo
	| IMPRIMIR                              
	| FUNCWHILE								
	| LLAMADA								
	| FUNCIF								
	| BREAKK								
	| error									;	

	
//aqui iran como el while, if, etc
MAIN
	: ejecutar identificador pIzq VALORESLLAMADA pDer pyc 
    | ejecutar identificador pIzq pDer pyc ;

VALORESLLAMADA
    : VALORESLLAMADA comaa EXP 
    | EXP {$$=[$1];};

LLAMADA
    : identificador pIzq VALORESLLAMADA pDer pyc
    | identificador pIzq pDer pyc ;

METODO
	: tipoVoid identificador pIzq PARAMETROS pDer llaveIzq CUERPO2 llaveDer 
	| tipoVoid identificador pIzq pDer llaveIzq CUERPO2 llaveDer ;

PARAMETROS
	: PARAMETROS comaa TIPO identificador		
	| TIPO identificador						;		

CICLOFOR
	:sentenciaFor pIzq IFOR  pyc EXP  pyc ASIG pDer llaveIzq CUERPO2 llaveDer;	

IFOR
	: DECLA
	| ASIG;	

DECLARACION
	: DECLA  pyc    {$$=$1};

DECLA
	:TIPO identificador igual EXP			
	|TIPO identificador                 ;

ASIGNACION
	:ASIG pyc 			{$$=$1};

ASIG
	:identificador igual EXP  			;

//si lo manejo asi tengo que validar que el valor que retorne EXP sea tipo bandera
FUNCWHILE
	: sentenciaWhile pIzq EXP pDer llaveIzq CUERPO2 llaveDer ;

FUNCDOWHILE
	: sentenciaDo llaveIzq CUERPO2 llaveDer sentenciaWhile pIzq EXP pDer pyc ;

FUNCIF
	:sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer sentenciaElse llaveIzq CUERPO2 llaveDer 
	|sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer 
	|sentenciaIf pIzq EXP pDer  llaveIzq CUERPO2 llaveDer sentenciaElse FUNCIF ;

IMPRIMIR 
	: imprimir pIzq EXP pDer pyc    ;

CASTEO
	: pIzq TIPO pDer EXP %prec UCASTEO;

BREAKK
	: romper pyc ;



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
	| EXP modular EXP 				
	| EXP elevado EXP				
	| EXP igualIgual EXP                 
	| EXP mayorQue EXP                 
	| EXP menorQue EXP                
	| EXP mayorIgual EXP                 
	| EXP menorIgual EXP                 
	| EXP diferente EXP                 
	| EXP orr EXP 					
	| EXP andd EXP                  
	| nott EXP						
	| menos EXP %prec UMENOS        
	| pIzq EXP pDer                 
    | entero                        
	| decimall                      
	| cadenaaa                     
    | caracter  					
	| truee                         
	| falsee                        
	| identificador                 ;

