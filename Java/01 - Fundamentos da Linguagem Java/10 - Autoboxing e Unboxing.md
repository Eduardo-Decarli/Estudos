# O que é Autoboxing e Unboxing?

Em Java, existem dois tipos principais de dados:

Tipos primitivos (int, double, char, etc.) que armazenam valores simples diretamente na memória e Classes Wrapper (Integer, Double, Character, etc.) que são classes que encapsulam um valor primitivo e permitem tratá-lo como um objeto.

O Autoboxing e o Unboxing facilitam a conversão automática entre esses dois tipos.

**Autoboxing** -> É a conversão automática de um tipo primitivo para seu equivalente Wrapper (de valor para objeto).

**Unboxing** -> É a conversão automática de um Wrapper para seu tipo primitivo (de objeto para valor).

## Autoboxing em Detalhes

Antes do Java 5, se você quisesse usar um tipo primitivo em uma coleção como ArrayList, teria que fazer a conversão manualmente usando os métodos das classes Wrapper.

``` Java

import java.util.ArrayList;

public class SemAutoboxing {
    public static void main(String[] args) {
        ArrayList<Integer> numeros = new ArrayList<>();

        // Precisamos converter explicitamente o int para Integer
        numeros.add(Integer.valueOf(10)); 

        System.out.println("Valor armazenado: " + numeros.get(0));
    }
}

```

- Integer.valueOf(10) cria um objeto Integer explicitamente a partir de um int.

- Sem autoboxing, precisaríamos chamar valueOf() toda vez que adicionamos um número a ArrayList<Integer>.

Após o java 5+ o autoboxing foi implementando e com o Autoboxing, o compilador faz essa conversão automaticamente.

``` Java

import java.util.ArrayList;

public class ComAutoboxing {
    public static void main(String[] args) {
        ArrayList<Integer> numeros = new ArrayList<>();

        // Autoboxing: o int 10 é automaticamente convertido para um Integer
        numeros.add(10); 

        System.out.println("Valor armazenado: " + numeros.get(0));
    }
}

```

- O compilador transforma **numeros.add(10)** em **numeros.add(Integer.valueOf(10))** automaticamente.

- Agora, não precisamos chamar **Integer.valueOf()** manualmente.

## Unboxing em Detalhes

Antes do Java 5, para extrair um valor de um Wrapper e usá-lo como tipo primitivo, era necessário fazer isso manualmente.

``` Java

public class SemUnboxing {
    public static void main(String[] args) {
        Integer numero = Integer.valueOf(20);

        // Precisamos chamar intValue() manualmente
        int resultado = numero.intValue(); 

        System.out.println("Valor de resultado: " + resultado);
    }
}

```

- O método **intValue()** converte manualmente um Integer para int.

- Antes do Java 5, era obrigatório chamar esse método para obter o valor primitivo.

Agora com o umboxing após o Java 5, podemos fazer isso de forma muito mais natural e automática.

``` Java

public class ComUnboxing {
    public static void main(String[] args) {
        Integer numero = 20; // Autoboxing acontece aqui

        // Unboxing: automaticamente extrai o valor primitivo de Integer
        int resultado = numero; 

        System.out.println("Valor de resultado: " + resultado);
    }
}

```

- O compilador converte automaticamente Integer para int, evitando a necessidade de chamar intValue().

## Casos Práticos e considerações

Uso com Operações Mateáticas: O Autoboxing e Unboxing tornam as operações matemáticas entre tipos primitivos e Wrappers mais fáceis.

``` Java

public class OperacoesMatematicas {
    public static void main(String[] args) {
        Integer a = 10; // Autoboxing
        Integer b = 5;  // Autoboxing

        int soma = a + b; // Unboxing automático de 'a' e 'b'

        System.out.println("Soma: " + soma);
    }
}

```

- a e b são objetos Integer, mas o compilador os trata como int quando necessário.

- O operador + funciona diretamente sem precisar de conversão manual.

**Estrutura de Controle:** Como o Unboxing ocorre automaticamente, podemos usar objetos Wrapper diretamente em condições.

``` Java

public class EstruturasControle {
    public static void main(String[] args) {
        Boolean ativo = true; // Autoboxing

        if (ativo) { // Unboxing automático
            System.out.println("Usuário está ativo!");
        }
    }
}

```

O compilador converte **Boolean** para **boolean** automaticamente ao avaliar a condição **if** (ativo).