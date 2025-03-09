# Métodos em Java

Um método é um bloco de código que executa uma tarefa específica. Ele pode receber parâmetros, executar operações e retornar valores. Um método geralmente possui:

- Modificador de acesso (public, private, etc.).

- Tipo de retorno (o tipo do valor retornado ou void se não retornar nada).

- Nome do método (seguindo convenção camelCase).

- Parâmetros (opcional, mas são variáveis usadas dentro do método).

- Corpo do método (código executado quando o método é chamado).

``` Java

public class ExemploMetodos {
    
    // Método que não retorna nada (void)
    public void saudacao() {
        System.out.println("Olá, bem-vindo ao estudo de métodos!");
    }

    // Método que retorna um valor inteiro
    public int dobrarNumero(int numero) {
        return numero * 2;
    }

    public static void main(String[] args) {
        ExemploMetodos exemplo = new ExemploMetodos();
        
        // Chamando o método sem retorno
        exemplo.saudacao();
        
        // Chamando o método com retorno
        int resultado = exemplo.dobrarNumero(5);
        System.out.println("O dobro de 5 é: " + resultado);
    }
}

```

- **saudacao():** Um método sem retorno, apenas imprime uma mensagem.

- **dobrarNumero(int numero):** Recebe um parâmetro, multiplica por 2 e retorna o resultado.

# Escopo de Variáveis

O escopo de uma variável define onde ela pode ser acessada dentro do código. Existe 3 tipos diferentes de escopo, **escopo de variável loca**, **variável de instância** e **variável de classe**.

Variáveis Locais -> São declaradas dentro de métodos, construtores ou blocos e só existem ali. Não podem ser acessadas fora do método onde foram criadas.

``` Java

public class ExemploEscopo {
    public void mostrarMensagem() {
        String mensagem = "Variável local dentro do método";
        System.out.println(mensagem);
    }
}

```

Variáveis de Instâncias -> São declaradas dentro da classe, mas fora de qualquer método. Elas pertencem ao objeto da classe.

``` Java

public class Pessoa {
    String nome; // Variável de instância

    public void definirNome(String novoNome) {
        nome = novoNome;
    }

    public void mostrarNome() {
        System.out.println("Nome: " + nome);
    }
    
    public static void main(String[] args) {
        Pessoa p = new Pessoa();
        p.definirNome("Carlos");
        p.mostrarNome(); // Saída: Nome: Carlos
    }
}

```

A variável nome é uma variável de instância, pertence ao objeto Pessoa e pode ser acessada por qualquer método da classe.

- Variáveis de Classe (Estáticas) -> São declaradas com o modificador static e pertencem à classe, não a objetos individuais.

``` Java

public class ExemploEstatico {
    static int contador = 0; // Variável de classe

    public void incrementar() {
        contador++;
    }

    public static void main(String[] args) {
        ExemploEstatico obj1 = new ExemploEstatico();
        ExemploEstatico obj2 = new ExemploEstatico();

        obj1.incrementar();
        obj2.incrementar();

        System.out.println("Valor do contador: " + ExemploEstatico.contador); // Saída: 2
    }
}

```

A variável contador é compartilhada entre todos os objetos da classe.

| **Tipo de Variável** | **Onde é declarada**                | **Onde pode ser acessada**                           |
|----------------------|-------------------------------------|------------------------------------------------------|
| Local                | Dentro de um método                 | Apenas dentro do método                              |
| De Instância         | Dentro da classe (fora dos métodos) | Por qualquer método da classe (precisa de um objeto) |
| De Classe (static)   | Dentro da classe, com static        | Pode ser acessada sem precisar de um objeto          |
