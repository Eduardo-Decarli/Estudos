# Construtores

Um construtor é um bloco especial de código em uma classe que é chamado quando um novo objeto da classe é criado. Ele tem o mesmo nome da classe e não possui um tipo de retorno, nem mesmo void. Os construtores são usados para inicializar objetos.

``` Java

public class ContaBancaria {
    private String titular;
    private double saldo;

    // Construtor padrão
    public ContaBancaria() {
        this.titular = "Desconhecido";
        this.saldo = 0.0;
    }

    // Construtor com parâmetros
    public ContaBancaria(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    // Métodos...
}

```

- **Construtor Padrão:** É um construtor sem parâmetros que inicializa os atributos com valores padrão. Se você não definir nenhum construtor, o Java fornece automaticamente um construtor padrão sem parâmetros.

- **Construtor com Parâmetros:** Permite inicializar os atributos com valores específicos fornecidos no momento da criação do objeto.

# Sobrecarga de Métodos

A sobrecarga de métodos é um recurso que permite definir múltiplos métodos com o mesmo nome, mas com diferentes listas de parâmetros (tipo, número ou ordem). Isso permite que um método execute diferentes ações dependendo dos argumentos passados.

Vamos adicionar métodos sobrecarregados à classe ContaBancaria:

``` Java

public class ContaBancaria {
    private String titular;
    private double saldo;

    // Construtores...

    // Método para depositar dinheiro
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    // Sobrecarga do método depositar para aceitar uma descrição
    public void depositar(double valor, String descricao) {
        if (valor > 0) {
            saldo += valor;
            System.out.println("Depósito de " + valor + " realizado. Descrição: " + descricao);
        }
    }

    // Métodos...
}

```

- **Método depositar(double valor):** Este é o método original que adiciona um valor ao saldo.

- **Método depositar(double valor, String descricao):** Este é um método sobrecarregado que, além de adicionar o valor ao saldo, também aceita uma descrição do depósito e imprime uma mensagem.

## Vantagens da Sobrecarga de Métodos

- **Flexibilidade:** Permite que métodos realizem operações semelhantes com diferentes tipos ou números de argumentos.

- **Clareza:** Mantém o código limpo e organizado, evitando a necessidade de criar métodos com nomes diferentes para operações semelhantes.