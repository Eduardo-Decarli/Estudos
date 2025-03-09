# Classes e Objetos

A Programação Orientada a Objetos (POO) é um paradigma que organiza o código em torno de objetos, que representam entidades do mundo real, e classes, que definem o comportamento desses objetos.

Uma classe é um modelo ou molde que define características (atributos) e comportamentos (métodos).
Um objeto é uma instância dessa classe, ou seja, um elemento criado com base nesse molde. 
Se tivermos uma classe Carro, cada carro específico (como um "Gol" ou "Civic") será um objeto dessa classe.

## Criando uma classe

Uma classe em Java é definida usando a palavra-chave class. Ela pode conter:

- Atributos (características do objeto, como cor e velocidade).

- Métodos (ações que o objeto pode realizar, como acelerar ou frear).

``` Java

public class Carro {
    // Atributos (características)
    String modelo;
    String cor;
    int ano;

    // Método (comportamento)
    void buzinar() {
        System.out.println("Biiiiii!");
    }
}

```

- modelo, cor e ano são atributos do carro.

- **buzinar()** é um método que define o comportamento do carro.

## Criando Objetos (Instanciando classes)

Para criar um objeto a partir de uma classe, usamos a palavra-chave **new**.

``` Java

public class TesteCarro {
    public static void main(String[] args) {
        // Criando um objeto (instanciando a classe)
        Carro meuCarro = new Carro();

        // Atribuindo valores aos atributos
        meuCarro.modelo = "Gol";
        meuCarro.cor = "Vermelho";
        meuCarro.ano = 2022;

        // Chamando o método buzinar
        meuCarro.buzinar();

        // Exibindo as informações do carro
        System.out.println("Modelo: " + meuCarro.modelo);
        System.out.println("Cor: " + meuCarro.cor);
        System.out.println("Ano: " + meuCarro.ano);
    }
}

```

- Criamos um objeto meuCarro usando **new Carro()**.

- Atribuímos valores aos atributos modelo, cor e ano.

- Chamamos o método **buzinar()**, que imprime "Biiiiii!".

Também pode s instanciar vários objetos da mesma classe, ou seja, diferentes objetos com base em um mesmo modelo

``` Java

public class TesteCarro {
    public static void main(String[] args) {
        // Criando dois objetos
        Carro carro1 = new Carro();
        Carro carro2 = new Carro();

        // Definindo valores para carro1
        carro1.modelo = "Civic";
        carro1.cor = "Preto";
        carro1.ano = 2020;

        // Definindo valores para carro2
        carro2.modelo = "Fiesta";
        carro2.cor = "Branco";
        carro2.ano = 2018;

        // Exibindo informações
        System.out.println("Carro 1: " + carro1.modelo + " - " + carro1.cor + " - " + carro1.ano);
        System.out.println("Carro 2: " + carro2.modelo + " - " + carro2.cor + " - " + carro2.ano);
    }
}

```

- Criamos dois objetos (carro1 e carro2), cada um com valores diferentes.

- Ambos pertencem à classe Carro, mas armazenam dados individuais.

## Construtores: Inicializando objetos automaticamente

Atualmente, estamos atribuindo valores aos atributos manualmente. Podemos melhorar isso com um construtor, que inicializa os atributos no momento da criação do objeto.

``` Java

public class Carro {
    String modelo;
    String cor;
    int ano;

    // Construtor
    public Carro(String modelo, String cor, int ano) {
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
    }

    void buzinar() {
        System.out.println("Biiiiii!");
    }
}

```

Criamos um construtor (public Carro(...)) que recebe valores e os atribui diretamente aos atributos usando **this**.

## Criando Objetos Usando o Construtor

Agora podemos criar objetos já com os valores definidos no momento da criação.

``` Java

public class TesteCarro {
    public static void main(String[] args) {
        // Criando objetos e inicializando com o construtor
        Carro carro1 = new Carro("Civic", "Preto", 2020);
        Carro carro2 = new Carro("Fiesta", "Branco", 2018);

        // Exibindo informações
        System.out.println("Carro 1: " + carro1.modelo + " - " + carro1.cor + " - " + carro1.ano);
        System.out.println("Carro 2: " + carro2.modelo + " - " + carro2.cor + " - " + carro2.ano);
    }
}

```

- Evita a necessidade de atribuir valores manualmente após a criação do objeto.

- Garante que o objeto já esteja pronto para uso assim que for instanciado.