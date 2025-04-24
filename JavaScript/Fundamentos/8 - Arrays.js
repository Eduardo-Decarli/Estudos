let numeros = [1,2,3,4,5,6] // Criasse um array de 6 posições
let frutas = ['banana', 'maracujá', 'melancia']

console.log(numeros.at(2)) // Acessa o indice 2 no array
console.log(numeros[2]) // Outra forma de acessar o indice

let numerosAndFrutas = numeros.concat(frutas) // Combina os dois arrays
console.log(numerosAndFrutas) 

numeros.pop() // Remove o ultimo elemento de numeros
console.log(numeros)

numeros.push(10) // Adiciona um novo elemento ao array
console.log(numeros)

numeros.forEach(x => console.log(x)) // Percorre o array de numeros usando um forEach