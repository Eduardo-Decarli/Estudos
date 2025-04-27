
// Criação de um Array

let numeros = [1,2,3,4,5,6]; 
let frutas = ['banana', 'maracujá', 'melancia'];

// Criação de um Array usando Construtores

let vazio = new Array();
let comTamanho = new Array(3);
let comValores = new Array(1, 2);

// Arrays com diferentes tipos 

let misto = [1, 'texto', true, null, [1, 2]];

// Recuperando o tamanho de um Array

console.log("==================\nTamanho de um Array")

console.log(misto.length);

// Acessando e Alterando elementos

frutas[2] = "Maracujá";

// Recuperando um indice

console.log("===================\nRecuperando um índice")

console.log(numeros.at(2)) // Acessa o indice 2 no array
console.log(numeros[2]) // Outra forma de acessar o indice

// Juntando arrays

console.log("==================\nJuntando Arrays")

let numerosAndFrutas = numeros.concat(frutas) // Combina os dois arrays
console.log(numerosAndFrutas) 

// Principais Métodos

console.log("================\nPrincipais Métodos")

numeros.pop() // Remove o ultimo elemento de numeros
console.log(numeros)

numeros.push(10) // Adiciona um novo elemento ao array
console.log(numeros)

numeros.shift() // Remove o primeiro elemento

// Percorrendo Arrays

console.log("==================\nPercorrendo Arrays")

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