# Classes Abstratas

Uma classe abstrata é uma classe que não pode ser instanciada diretamente. Ela pode conter métodos abstratos (sem implementação) e métodos concretos (com implementação). Classes abstratas são usadas para definir um modelo ou esqueleto que outras classes podem estender.

``` Java

// Classe abstrata
public abstract class Conta {
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

    public abstract boolean sacar(double valor); // Método abstrato

    public double getSaldo() {
        return saldo;
    }
}

// Subclasse concreta
public class ContaCorrente extends Conta {
    private double limite;

    public ContaCorrente(String titular, double saldoInicial, double limite) {
        super(titular, saldoInicial);
        this.limite = limite;
    }

    @Override
    public boolean sacar(double valor) {
        if (valor > 0 && saldo + limite >= valor) {
            saldo -= valor;
            return true;
        }
        return false;
    }
}

```

- **Classe Abstrata Conta:** Define um método abstrato sacar, que deve ser implementado por qualquer subclasse concreta.

- **Subclasse ContaCorrente:** Estende Conta e fornece uma implementação para o método sacar.

# Interface

Uma interface é um contrato que uma classe pode implementar. Interfaces podem conter métodos abstratos (sem implementação) e, a partir do Java 8, métodos padrão (com implementação) e métodos estáticos.

``` Java

// Interface
public interface Transacao {
    void depositar(double valor);
    boolean sacar(double valor);
}

// Implementação da interface
public class ContaPoupanca implements Transacao {
    private String titular;
    private double saldo;
    private double taxaDeJuros;

    public ContaPoupanca(String titular, double saldoInicial, double taxaDeJuros) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.taxaDeJuros = taxaDeJuros;
    }

    @Override
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    @Override
    public boolean sacar(double valor) {
        if (valor > 0 && saldo >= valor) {
            saldo -= valor;
            return true;
        }
        return false;
    }

    public void aplicarJuros() {
        saldo += saldo * taxaDeJuros;
    }
}

```

- **Interface Transacao:** Define os métodos depositar e sacar que qualquer classe que implemente a interface deve fornecer.

- **Classe ContaPoupanca:** Implementa a interface Transacao e fornece implementações para os métodos depositar e sacar.

# Diferença entre classes abstratas e interfaces

- Herança vs Implementação: Uma classe pode estender apenas uma classe abstrata, mas pode implementar várias interfaces.

- Métodos: Classes abstratas podem ter métodos concretos e abstratos, enquanto interfaces (antes do Java 8) só podiam ter métodos abstratos. A partir do Java 8, interfaces podem ter métodos padrão e estáticos.

- Uso: Use classes abstratas quando há uma relação "é um" e você quer compartilhar código entre classes. Use interfaces para definir um contrato que classes não relacionadas podem implementar.