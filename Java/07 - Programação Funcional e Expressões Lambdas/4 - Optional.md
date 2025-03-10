# Optional

O Optional é uma classe introduzida no Java 8 que representa um contêiner que pode ou não conter um valor não nulo. Ele é usado para evitar o uso de null e para lidar de forma mais segura com valores que podem estar ausentes.

Optional é uma classe genérica que encapsula um valor opcional. Ele fornece métodos para verificar a presença de um valor, acessar o valor se presente, e executar ações condicionais com base na presença do valor.

## Optional.of

O método Optional.of é usado para criar um Optional a partir de um valor não nulo. Se o valor passado for null, ele lançará uma NullPointerException.

``` Java

import java.util.Optional;

public class ExemploOptionalOf {
    public static void main(String[] args) {
        String nome = "Java";
        Optional<String> nomeOptional = Optional.of(nome);
        System.out.println(nomeOptional); // Saída: Optional[Java]
    }
}

```

## Optional.empty

O método Optional.empty é usado para criar um Optional vazio, ou seja, um Optional que não contém nenhum valor.

``` Java

import java.util.Optional;

public class ExemploOptionalEmpty {
    public static void main(String[] args) {
        Optional<String> vazio = Optional.empty();
        System.out.println(vazio); // Saída: Optional.empty
    }
}

```

## Optional.ifPresent

O método Optional.ifPresent executa uma ação se um valor estiver presente no Optional. Ele aceita um Consumer que será executado com o valor presente.

``` Java

import java.util.Optional;

public class ExemploOptionalIfPresent {
    public static void main(String[] args) {
        Optional<String> nomeOptional = Optional.of("Java");
        nomeOptional.ifPresent(nome -> System.out.println("Nome: " + nome)); // Saída: Nome: Java

        Optional<String> vazio = Optional.empty();
        vazio.ifPresent(nome -> System.out.println("Nome: " + nome)); // Não imprime nada
    }
}

```

## orElse

O método orElse retorna o valor contido no Optional se ele estiver presente; caso contrário, retorna um valor padrão fornecido.

``` java

import java.util.Optional;

public class ExemploOrElse {
    public static void main(String[] args) {
        Optional<String> nomeOptional = Optional.of("Java");
        String nome = nomeOptional.orElse("Valor Padrão");
        System.out.println(nome); // Saída: Java

        Optional<String> vazio = Optional.empty();
        String nomePadrao = vazio.orElse("Valor Padrão");
        System.out.println(nomePadrao); // Saída: Valor Padrão
    }
}

```

## orElseGet

O método orElseGet é semelhante a orElse, mas em vez de aceitar um valor padrão diretamente, ele aceita um Supplier que gera o valor padrão. Isso é útil quando a geração do valor padrão é uma operação custosa que você deseja evitar se o valor estiver presente.

``` java

import java.util.Optional;

public class ExemploOrElseGet {
    public static void main(String[] args) {
        Optional<String> nomeOptional = Optional.of("Java");
        String nome = nomeOptional.orElseGet(() -> "Valor Padrão");
        System.out.println(nome); // Saída: Java

        Optional<String> vazio = Optional.empty();
        String nomePadrao = vazio.orElseGet(() -> "Valor Padrão");
        System.out.println(nomePadrao); // Saída: Valor Padrão
    }
}

```

## orElseThrow

O método orElseThrow lança uma exceção se o valor não estiver presente no Optional. Você pode fornecer um Supplier que cria a exceção a ser lançada.

``` Java

import java.util.Optional;

public class ExemploOrElseThrow {
    public static void main(String[] args) {
        Optional<String> nomeOptional = Optional.of("Java");
        String nome = nomeOptional.orElseThrow(() -> new IllegalArgumentException("Valor ausente"));
        System.out.println(nome); // Saída: Java

        Optional<String> vazio = Optional.empty();
        try {
            String nomePadrao = vazio.orElseThrow(() -> new IllegalArgumentException("Valor ausente"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage()); // Saída: Valor ausente
        }
    }
}

```

## Conclusão

O uso de Optional ajuda a evitar problemas comuns associados ao uso de null, como NullPointerException. Ele fornece uma maneira mais segura e expressiva de lidar com valores opcionais, incentivando o tratamento explícito de casos onde um valor pode estar ausente.

