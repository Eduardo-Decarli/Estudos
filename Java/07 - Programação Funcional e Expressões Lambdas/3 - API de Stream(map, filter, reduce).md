# O que é a API de Streams?

A API de Streams fornece uma maneira de processar sequências de elementos de forma funcional. Um stream é uma sequência de elementos que suporta operações agregadas e sequenciais. Streams não armazenam dados; eles processam dados de coleções como listas, conjuntos e mapas.

## map

O método map é usado para transformar elementos de um stream. Ele aplica uma função a cada elemento do stream e retorna um novo stream com os elementos transformados.

``` Java

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ExemploMap {
    public static void main(String[] args) {
        List<String> palavras = Arrays.asList("java", "stream", "api");
        List<String> palavrasMaiusculas = palavras.stream()
                                                  .map(String::toUpperCase)
                                                  .collect(Collectors.toList());
        System.out.println(palavrasMaiusculas); // Saída: [JAVA, STREAM, API]
    }
}

```

## Filter

O método filter é usado para selecionar elementos de um stream com base em uma condição. Ele retorna um novo stream contendo apenas os elementos que satisfazem a condição.

``` Java

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ExemploFilter {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6);
        List<Integer> numerosPares = numeros.stream()
                                            .filter(n -> n % 2 == 0)
                                            .collect(Collectors.toList());
        System.out.println(numerosPares); // Saída: [2, 4, 6]
    }
}

```

## Reduce

O método reduce é usado para combinar os elementos de um stream em um único resultado. Ele aplica uma função de acumulação aos elementos do stream.

``` Java

import java.util.Arrays;
import java.util.List;

public class ExemploReduce {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
        int soma = numeros.stream()
                          .reduce(0, (a, b) -> a + b);
        System.out.println(soma); // Saída: 15
    }
}

```

## Conclusão

A API de Streams permite que você processe coleções de dados de maneira eficiente e expressiva. Os métodos **map**, **filter** e **reduce** são fundamentais para transformar, filtrar e agregar dados. Eles ajudam a escrever código mais conciso e legível, adotando um estilo de programação funcional.