
let somaString = "4" + 2; // Com soma entre number e string, o js transforma em string
let subString = "4" - 2; // Com subtração entre numero e String, o JS converte string para number

print(somaString);
print(subString);

let subtracao = Number.parseInt(somaString) // Podemos fazer uso do parseFloat e parseInt para converter explicitamente

print(subtracao)
print(String(32)) // Podemos converter para String fazendo dessa forma
print(subString.toString())

// typeof

print("\n===========")
print(typeof(subString))
print(typeof(somaString))

// Boolean

print("\n===========")
print(Boolean(0));
print(Boolean(1));

function print(variavel) {
    console.log(variavel);
}