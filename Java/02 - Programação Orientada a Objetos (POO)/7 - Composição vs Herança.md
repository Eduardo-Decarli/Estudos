# Composição vs Herança

Composição e herança são dois conceitos fundamentais na programação orientada a objetos que permitem a reutilização de código e a modelagem de relações entre classes. Vamos explorar cada um deles e entender suas diferenças e quando usá-los.

## Herança

Herança é um mecanismo que permite que uma classe (subclasse) herde atributos e métodos de outra classe (superclasse). Isso cria uma relação "é um" (is-a) entre as classes.

``` Java

// Superclasse
public class Veiculo {
    protected String marca;
    protected String modelo;

    public Veiculo(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }

    public void exibirDetalhes() {
        System.out.println("Marca: " + marca + ", Modelo: " + modelo);
    }
}

// Subclasse
public class Carro extends Veiculo {
    private int numeroDePortas;

    public Carro(String marca, String modelo, int numeroDePortas) {
        super(marca, modelo);
        this.numeroDePortas = numeroDePortas;
    }

    @Override
    public void exibirDetalhes() {
        super.exibirDetalhes();
        System.out.println("Número de portas: " + numeroDePortas);
    }
}

```

- **Relação "é um":** Carro é um tipo de Veiculo.

- **Reutilização de Código:** Carro herda os atributos e métodos de Veiculo, permitindo reutilizar e estender a funcionalidade.

## Composição

Composição é um princípio onde uma classe é composta de uma ou mais instâncias de outras classes. Isso cria uma relação "tem um" (has-a) entre as classes.

``` Java

// Classe Motor
public class Motor {
    private int potencia;

    public Motor(int potencia) {
        this.potencia = potencia;
    }

    public void exibirPotencia() {
        System.out.println("Potência do motor: " + potencia + " HP");
    }
}

// Classe Carro usando composição
public class Carro {
    private String marca;
    private String modelo;
    private Motor motor; // Composição

    public Carro(String marca, String modelo, int potenciaMotor) {
        this.marca = marca;
        this.modelo = modelo;
        this.motor = new Motor(potenciaMotor);
    }

    public void exibirDetalhes() {
        System.out.println("Marca: " + marca + ", Modelo: " + modelo);
        motor.exibirPotencia();
    }
}

```

- **Relação "tem um":** Carro tem um Motor.

- **Modularidade:** A composição permite que as classes sejam mais modulares e reutilizáveis, pois Motor pode ser usado por outras classes além de Carro.

## Diferença e Quando usar

**Herança:** Use quando há uma clara relação "é um" entre as classes. Ela facilita a reutilização de código, mas pode levar a um acoplamento forte entre classes. Pode ser menos flexível se a hierarquia de classes mudar.


**Composição:** Use quando há uma relação "tem um" ou quando deseja criar componentes reutilizáveis. Ela promove um acoplamento mais fraco e maior flexibilidade. Facilita a alteração de componentes sem afetar outras partes do sistema.

Tanto a herança quanto a composição têm seus lugares na programação orientada a objetos. A escolha entre eles depende do contexto e da relação entre as classes que você está modelando. Em muitos casos, a composição é preferida por sua flexibilidade e modularidade.