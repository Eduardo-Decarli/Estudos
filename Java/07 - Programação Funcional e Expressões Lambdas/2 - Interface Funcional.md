# Visão geral das Interfaces Funcionais

As interfaces funcionais são interfaces que possuem exatamente um método abstrato. Elas são a base para expressões lambda e referências de método em Java. A anotação @FunctionalInterface é usada para indicar que uma interface é funcional, mas não é obrigatória.

Java fornece várias interfaces funcionais na biblioteca java.util.function, que são amplamente utilizadas em programação funcional. Vamos explorar algumas das mais comuns.

## Function

A interface Function<T, R> representa uma função que aceita um argumento do tipo T e retorna um resultado do tipo R. É usada quando você precisa transformar ou mapear um valor para outro.

- Método **R apply(T t):** Aplica a função ao argumento fornecido e retorna o resultado.

``` Java

import java.util.function.Function;

public class ExemploFunction {
    public static void main(String[] args) {
        Function<String, Integer> comprimento = s -> s.length();
        System.out.println(comprimento.apply("Hello")); // Saída: 5
    }
}

```

## Predicate

A interface Predicate<T> representa uma função que recebe um argumento do tipo T e retorna um booleano. É usada para testar uma condição.

- Método **boolean test(T t):** Avalia a condição sobre o argumento fornecido.

``` Java

import java.util.function.Predicate;

public class ExemploPredicate {
    public static void main(String[] args) {
        Predicate<Integer> isPar = n -> n % 2 == 0;
        System.out.println(isPar.test(4)); // Saída: true
        System.out.println(isPar.test(5)); // Saída: false
    }
}

```

## Consumer

A interface Consumer<T> representa uma operação que aceita um único argumento do tipo T e não retorna resultado. É usada para executar operações sobre um objeto.

- Método **void accept(T t):** Executa a operação no argumento fornecido.

``` Java

import java.util.function.Consumer;

public class ExemploConsumer {
    public static void main(String[] args) {
        Consumer<String> imprimir = s -> System.out.println(s);
        imprimir.accept("Olá, Mundo!"); // Saída: Olá, Mundo!
    }
}

```

## Supplier

A interface Supplier<T> representa uma função que não aceita argumentos e fornece um resultado do tipo T. É usada para gerar ou fornecer valores.

- Método **T get():** Fornece um resultado.

``` Java

import java.util.function.Supplier;

public class ExemploSupplier {
    public static void main(String[] args) {
        Supplier<Double> aleatorio = () -> Math.random();
        System.out.println(aleatorio.get()); // Saída: um número aleatório
    }
}

```

## Conclusão 

Essas interfaces funcionais são fundamentais para a programação funcional em Java. Elas permitem que você passe comportamentos como argumentos para métodos, tornando o código mais flexível e expressivo.