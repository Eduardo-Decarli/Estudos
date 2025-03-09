# Encapsulamento

O encapsulamento é implementado em Java através de modificadores de acesso, que controlam a visibilidade dos membros de uma classe (atributos e métodos). Os principais modificadores de acesso são:

- **private:** O membro é acessível apenas dentro da própria classe. É a forma mais restritiva de acesso.

- **public:** O membro é acessível de qualquer lugar, ou seja, de qualquer outra classe.

- **protected:** O membro é acessível dentro do mesmo pacote e por subclasses, mesmo que estejam em pacotes diferentes.

- **(default):** Quando nenhum modificador é especificado, o membro é acessível apenas dentro do mesmo pacote. Isso é conhecido como "package-private".

Vamos criar uma classe simples chamada ContaBancaria para ilustrar o uso de encapsulamento:

``` Java

public class ContaBancaria {
    // Atributos privados
    private String titular;
    private double saldo;

    // Construtor
    public ContaBancaria(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    // Método público para obter o saldo
    public double getSaldo() {
        return saldo;
    }

    // Método público para depositar dinheiro
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    // Método público para sacar dinheiro
    public boolean sacar(double valor) {
        if (valor > 0 && saldo >= valor) {
            saldo -= valor;
            return true;
        }
        return false;
    }

    // Método público para obter o titular
    public String getTitular() {
        return titular;
    }

    // Método público para alterar o titular
    public void setTitular(String titular) {
        this.titular = titular;
    }
}

```

- **Atributos Privados:** titular e saldo são privados, o que significa que não podem ser acessados diretamente de fora da classe ContaBancaria. Isso protege os dados de acessos indesejados.

- **Métodos Públicos:** getSaldo, depositar, sacar, getTitular e setTitular são métodos públicos que permitem interagir com os atributos privados de forma controlada. Por exemplo, o método depositar só permite adicionar valores positivos ao saldo.

- **Controle de Acesso:** Ao usar métodos públicos para acessar e modificar os atributos privados, você pode adicionar lógica adicional, como validações, antes de permitir que os dados sejam alterados.

## Vantagens do Encapsulamento

- **Proteção de Dados:** Os dados são protegidos contra acessos e modificações indevidas.

- **Facilidade de Manutenção:** Alterações na implementação interna da classe não afetam outras partes do código que usam a classe.

- **Controle de Acesso:** Permite controlar como os dados são acessados e modificados.