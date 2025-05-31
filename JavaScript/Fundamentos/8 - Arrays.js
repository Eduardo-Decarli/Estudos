
// Criação de um Array

let numeros = [1,2,3,4,5,6]; 
let frutas = ['banana', 'maracujá', 'melancia'];

// Arrays com diferentes tipos 

let misto = [1, 'texto', true, null, [1, 2]];

// Criação de um Array usando Construtores

let vazio = new Array();
let comTamanho = new Array(3);
let comValores = new Array(1, 2);

// Recuperando o tamanho de um Array

console.log("\n===================")
console.log("Retorna o Tamanho de um Array")
console.log("===================\n")

console.log(misto.length);

// Acessando e Alterando elementos
(function acessandoAndAlterandoElementos() {
    frutas[2] = "Maracujá";
})()


// Recuperando um indice

console.log("\n===================")
console.log("Recuperando um índice")
console.log("===================\n")

console.log(numeros.at(2)) // Acessa o indice 2 no array
console.log(numeros[2]) // Outra forma de acessar o indice

// Juntando arrays

console.log("\n===================")
console.log("Juntando Arrays")
console.log("===================\n")

let numerosAndFrutas = numeros.concat(frutas) // Combina os dois arrays
console.log(numerosAndFrutas) 

// Principais Métodos

console.log("\n===================")
console.log("Principais Métodos")
console.log("===================\n")

    // Remove o ultimo elemento de numeros

function popNumero() {
    numeros.pop();
    console.log(numeros);
}
popNumero()

    // Adiciona um novo elemento ao array

function pushNumero() {
    numeros.push(10)
    console.log(numeros)
}
pushNumero();

    // Remove o primeiro elemento

function shiftNumero() {
    numeros.shift();
    console.log(numeros);
}
shiftNumero();

    // Insere um valor no primeiro elemento

function unshiftNumero() {
    numeros.unshift(100);
    console.log(numeros);
}
unshiftNumero();

    // Deleta valores a partir de um indice de incicio e uma quantidade de numeros

function spliceNumeros() {
    numeros.splice(2, 2);
    console.log(numeros);
}
spliceNumeros();

// Buscar/Verificar valores ou objetos


console.log("\n===================")
console.log("Buscar/Verificar em Arrays")
console.log("===================\n")

// Verifica se existe um valor no array

function includesNumber() {
    console.log("Há o numero 10 no array?" + numeros.includes(10));
    console.log("Há o numero 11 no array?" + numeros.includes(11));
}
includesNumber();

// Retorna o index da primeira ocorrencia

function indexOfNumber() {
    console.log(numeros)
    console.log(numeros.indexOf(10))
}
indexOfNumber();

// Percorrendo Arrays

console.log("\nPercorrendo Arrays\n")

for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

numeros.forEach((valor, indice) => 
console.log(valor + " no indice " + indice))// Percorre o array de numeros usando um forEach

for(num in numeros) {
    console.log(num)
}

// Métodos de Transformação

console.log("=============\nMétodos de Transformação")

let arrayNovo = [1, 2, 3, 4, 5, 6, 7, "texto", "Eduardo"];
let arrayTextoNovo = ["Eduardo", "John Doe", "Mauricio Santana"]
let arrayAlteradoMap = arrayNovo.map(
    (indice) => indice * 2
);

console.log(
    arrayTextoNovo.filter(
        (x) => x.charAt(0) === 'E'
    )
)

console.log(arrayAlteradoMap);

console.log("==============\nDesafio")

let inputNumeros = [6, 9, 13, 21, 4];

let soma = 0;
for(let num of inputNumeros) {
    soma += num;
}

let pares = inputNumeros.filter(
    (x) => x % 2 == 0
)

let quadrado = inputNumeros.map(
    (x) => x * x
)

let maior = inputNumeros[0];
let menor = inputNumeros[0];

for(let num of inputNumeros) {
    if(maior < num) maior = num;
    if(menor > num) menor = num;
}

console.log(soma);
console.log(pares);
console.log(quadrado);
console.log(`O maior numero é ${maior} e o menor é ${menor}`);