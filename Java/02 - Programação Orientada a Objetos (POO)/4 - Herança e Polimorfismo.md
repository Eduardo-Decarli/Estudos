# Herança

Herança é um mecanismo que permite que uma classe (subclasse) herde campos e métodos de outra classe (superclasse). Isso promove a reutilização de código e a criação de uma hierarquia de classes.

``` Java

// Superclasse
public class Conta {
    protected String titular;
    protected double saldo;

    public Conta(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    public boolean sacar(double valor) {
        if (valor > 0 && saldo >= valor) {
            saldo -= valor;
            return true;
        }
        return false;
    }

    public double getSaldo() {
        return saldo;
    }
}

// Subclasse
public class ContaPoupanca extends Conta {
    private double taxaDeJuros;

    public ContaPoupanca(String titular, double saldoInicial, double taxaDeJuros) {
        super(titular, saldoInicial);
        this.taxaDeJuros = taxaDeJuros;
    }

    public void aplicarJuros() {
        saldo += saldo * taxaDeJuros;
    }
}

```

- **Superclasse Conta:** Define atributos e métodos comuns a todas as contas, como titular, saldo, depositar, e sacar.

- **Subclasse ContaPoupanca:** Herda de Conta e adiciona um atributo específico (taxaDeJuros) e um método (aplicarJuros) para aplicar juros ao saldo.

- **Uso do super:** No construtor de ContaPoupanca, super(titular, saldoInicial) é usado para chamar o construtor da superclasse Conta.

# Polimorfismo

Polimorfismo permite que objetos de diferentes classes sejam tratados como objetos de uma classe comum. Isso é especialmente útil quando se trabalha com coleções de objetos de classes relacionadas.

``` Java

public class Banco {
    public static void main(String[] args) {
        Conta conta1 = new Conta("João", 1000);
        ContaPoupanca conta2 = new ContaPoupanca("Maria", 2000, 0.05);

        // Polimorfismo em ação
        Conta[] contas = {conta1, conta2};

        for (Conta conta : contas) {
            conta.depositar(100);
            System.out.println("Saldo de " + conta.titular + ": " + conta.getSaldo());
        }

        // Aplicar juros apenas na ContaPoupanca
        if (conta2 instanceof ContaPoupanca) {
            ((ContaPoupanca) conta2).aplicarJuros();
            System.out.println("Saldo após aplicar juros: " + conta2.getSaldo());
        }
    }
}

```

- **Array de Conta:** O array contas contém objetos de **Conta** e **ContaPoupanca**, demonstrando polimorfismo.

- **Uso de instanceof:** Verifica se conta2 é uma instância de ContaPoupanca antes de chamar aplicarJuros.

**Casting:** (ContaPoupanca) conta2 é usado para converter conta2 de Conta para ContaPoupanca para acessar métodos específicos.

# Vantagens de Herança e Polimorfismo

- **Reutilização de Código:** Herança permite que subclasses reutilizem código da superclasse.

- **Flexibilidade:** Polimorfismo permite que o mesmo código funcione com diferentes tipos de objetos.

- **Extensibilidade:** Facilita a adição de novas funcionalidades sem alterar o código existente.