// Função declarativa

console.log(saudacao("Eduardo"));

function saudacao(nome) {
    return `Olá ${nome}`;
}

// Função Expressa

const soma = function (a, b) {
    return a + b;
}

console.log(soma(2, 5))

// Arrow Function (Se houver apenas um parametro, os parenteses são opcionais)

const multiplicar = (a, b) => {
    return a * b;
}

console.log(multiplicar(2,3))

// Função Anônima

setTimeout(
    function() {
        console.log("Executou depois de 2 segundos");
    }
, 2000);

// Função Autoexecutada

(function(){
    console.log("Essa função se autoexecuta")
})()

// Função como Método (dentro de objetos)

const pessoa = {
    nome: "Eduardo",
    falar: function() {
        return `Meu nome é ${this.nome}`;
    }
};

pessoa["nome"] = "Rodrigo"

console.log(pessoa.falar());

// Função Construtora

function carro(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
}

const meuCarro = new carro("Toyota", "Corolla");

console.log(meuCarro);