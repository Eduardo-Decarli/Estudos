// Objetos Literais

const pessoa = {
    nome: "Eduardo",
    idade: 21,
    altura: 1.75,
    falar: function () {
        return console.log("Olá, meu nome é " + this.nome)
    }
}

console.log(pessoa)
pessoa.falar();

// Funções Construtoras

function Pessoa(nome, idade, altura) {
    this.nome = nome,
        this.idade = idade,
        this.altuar = altura
}

const pessoa1 = new Pessoa("Adriano", 42, 1.65)
console.log(pessoa1);

class Computador {

    marca; // Atributos
    memoria;
    processador;
    #funciona = true; // Atributos Privados

    // Construtor da classe Computador
    constructor(marca, memoria, processador) {
        this.marca = marca;
        this.memoria = memoria;
        this.processador = processador;
    }

    // Método da classe
    ligar() {
        if (this.#funciona == true) {
            console.log("O computador está ligado")
        }
    }
}

const computador1 = new Computador("Asus", "8gb", "i5")
console.log(computador1);
computador1.ligar();

// Herança

class Animal {
    constructor(nome) {
        this.nome = nome;
    }

    falar() {
        console.log(`${this.nome} fez um som`);
    }
}

class Cachorro extends Animal {
    //Polimorfismo com sobreescrita de método
    falar() {
        console.log(`${this.nome} latiu`);
    }
}

const rex = new Cachorro('Rex');
rex.falar(); // Rex latiu
