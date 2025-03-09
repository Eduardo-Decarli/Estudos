# Laços de Repetição em Java (for, while, do-while)

Os laços de repetição (loops) são estruturas de controle que permitem executar um bloco de código várias vezes enquanto uma condição for verdadeira. Isso evita a repetição manual de código e é essencial para automação, cálculos e manipulação de listas.

- **for** → Ideal quando sabemos o número exato de repetições.

- **while** → Executa enquanto uma condição for verdadeira.

- **do-while** → Similar ao while, mas garante pelo menos uma execução.

## Laço for

O for é um loop de controle definido, ou seja, sabemos quantas vezes ele vai rodar.

``` Java

for (inicialização; condição; incremento) {
    // código a ser repetido
}

```

- **Inicialização** → Define a variável de controle do loop (exemplo: int i = 0).

- **Condição** → O loop continua enquanto for true (exemplo: i < 5).

- **Incremento** → Atualiza a variável de controle (i++, i--, etc.).

``` Java

// Contando de 1 a 5

public class ExemploFor {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Número: " + i);
        }
    }
}

// Exemplo percorrendo um array

public class ExemploArrayFor {
    public static void main(String[] args) {
        String[] nomes = {"Ana", "Bruno", "Carlos"};

        for (int i = 0; i < nomes.length; i++) {
            System.out.println("Nome: " + nomes[i]);
        }
    }
}

// Utilizando for-each (enhanced for), é usado para percorrer arrays ou listas sem precisar de índice

public class ExemploForEach {
    public static void main(String[] args) {
        int[] numeros = {10, 20, 30};

        for (int numero : numeros) {
            System.out.println("Número: " + numero);
        }
    }
}

```

## Laço While

Usamos o laço while quando não sabemos exatamente o numero de repetições do código, então ele irá executar a condição até seu resultado retornar falso. Sua estrutura é:

``` Java

while (condição) {
    // código repetido enquanto a condição for verdadeira
}

```

``` Java

// Exemplo contando de 1 a 5 com while

public class ExemploWhile {
    public static void main(String[] args) {
        int contador = 1;

        while (contador <= 5) {
            System.out.println("Número: " + contador);
            contador++; // Incremento
        }
    }
}

// Diferente do for, aqui precisamos manualmente definir a inicialização (int contador = 1) e o incremento (contador++).

// Lendo um número válido do usuário

import java.util.Scanner;

public class ExemploWhileScanner {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int numero = 0;

        while (numero <= 0) {
            System.out.print("Digite um número positivo: ");
            numero = scanner.nextInt();
        }

        System.out.println("Você digitou: " + numero);
        scanner.close();
    }
}

```

## Laço do-while

Similar ao while convencional, mas essa forma garante que o código irá rodar pelo menos uma vez antes de cair na condição e verificar se é verdadeiro ou falso, sua estrutura é:

``` Java

do {
    // código executado pelo menos uma vez
} while (condição);

```

``` Java

import java.util.Scanner;

public class ExemploDoWhile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String senha;

        do {
            System.out.print("Digite a senha: ");
            senha = scanner.nextLine();
        } while (!senha.equals("1234"));

        System.out.println("Acesso concedido!");
        scanner.close();
    }
}

```

## Diferença entre for, while e do-while

| **Característica** | **for**                                                  | **while**                                         | **do-while**                                            |
|--------------------|----------------------------------------------------------|---------------------------------------------------|---------------------------------------------------------|
| Quando usar?       | Quando sabemos o número exato de repetições              | Quando não sabemos quantas vezes será repetido    | Quando queremos garantir pelo menos uma execução        |
| Estrutura          | Possui inicialização, condição e incremento no cabeçalho | A condição é verificada antes de executar o bloco | O bloco executa pelo menos uma vez antes da verificação |
| Exemplo ideal      | Contagem de 1 a 10, percorrer arrays                     | Esperar uma entrada do usuário, processar listas  | Pedir senha ou repetir ações até acertar                |

## Laços aninhados

Por fim, tambem temos o uso do for dentro de outro for, isso é útil para percorrer matrizes ou criar padrões mais complexos para uma lógica, vamos criar uma tabela 3x3 usando for aninhado

``` Java

public class ExemploForAninhado {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.print(i + "," + j + "  ");
            }
            System.out.println();
        }
    }
}

// Saida seria algo como 
/*

1,1  1,2  1,3  
2,1  2,2  2,3  
3,1  3,2  3,3  

*/

```