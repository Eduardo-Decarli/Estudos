/* JavaScript possui 3 tipos de variáveis, sendo o var, let e const, cada um com uma especificidade*/

var variavel1; // Forma antiga de declarar uma variável
let variavel2; // Forma moderna de declarar uma variável
const variavel3 = null; // Variável que assume um valor constante e imutável (precisa ser inicializada)


/* JavaScript possui 7 tipos primitivos e com tipagem dinâmica */
let nome = "Eduardo"; // Tipo String
let idade = 20 // Tipo Number
let aprovado = true; // Tipo Boolean
let indefinido = undefined; // Tipo undefined
let nulo = null; // Tipo null
let simbolo = Symbol("id"); // Tipo Symbol (valor único e imutável, conceito avançado e pouco usado no básico)
let bigInt = 1234567890123456789012345678901234567890n; // Valor número gigante

// JavaScript possui 3 tipos de dados não primitivos (Object, function e array)
let pessoa = {
    nome: "Edu",
    idade: 21
} // Tipo Objeto

let função = function(a, b) {
    return a + b;
} // Tipo função

let frutas = ["Maça", "banana", "Berinjela" ] // Tipo Array

console.log(typeof nome) // typeof retorna o tipo da variável, nesse caso retorna string

