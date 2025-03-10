# O que são Expressões Lambda?

As expressões lambda foram introduzidas no Java 8 e são uma das principais adições à linguagem. Elas permitem que você escreva código de forma mais concisa e funcional. Basicamente, uma expressão lambda é uma maneira de representar uma função anônima (ou seja, uma função sem nome) que pode ser tratada como uma instância de uma interface funcional. São similares as arrows functions do JavaScript, onde podemos colocar códigos sem precisar iniciar o escopo de uma função.

**Interface Funcional:** Antes de entender expressões lambda, é importante saber o que é uma interface funcional. Uma interface funcional é uma interface que possui exatamente um método abstrato. No Java, essas interfaces são anotadas com **@FunctionalInterface**, embora essa anotação não seja obrigatória. 

Vamos ver as vantagens de utilizar expressões Lambdas em nossos códigos

- **Código mais conciso:** Reduz a quantidade de código boilerplate.

- **Programação funcional:** Facilita a adoção de um estilo de programação funcional.

- **Melhor legibilidade:** Torna o código mais fácil de ler e entender.

``` Java

// Exemplo de uma interface funcional

@FunctionalInterface
interface Operacao {
    int executar(int a, int b);
}

```

## Sintaxe de Expressões Lambdas

A sintaxe básica de uma expressão lambda é:

``` Java

(parametros) -> { corpo }

```

- **Parâmetros:** Lista de parâmetros que o método aceita.

- **Seta (->):** Separa a lista de parâmetros do corpo da expressão.

- **Corpo:** Contém as instruções que serão executadas.

Exemplo de uma expressão lambda que implementa a interface **Operacao**:

``` Java

Operacao soma = (a, b) -> a + b;

```

Neste exemplo, `soma` é uma expressão lambda que implementa o método `executar` da interface `Operacao`, somando dois números.

## Utilização de Expressões Lambdas

As expressões lambda são frequentemente usadas com as APIs de Streams do Java, que permitem processar coleções de dados de forma funcional. Por exemplo:

``` Java

List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
numeros.stream()
       .filter(n -> n % 2 == 0)
       .forEach(System.out::println);

```

Neste exemplo, a expressão lambda `n -> n % 2 == 0` é usada para filtrar números pares de uma lista.