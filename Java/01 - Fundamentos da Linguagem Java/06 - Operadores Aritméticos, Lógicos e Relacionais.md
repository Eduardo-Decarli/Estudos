# Operadores Aritméticos, Lógicos e Relacionais em Java

Os operadores são símbolos especiais usados para manipular variáveis e valores. Eles podem ser usados para: 

- Realizar cálculos matemáticos (adição, subtração, multiplicação, etc.)

- Comparar valores para tomada de decisões.

- Avaliar expressões lógicas (Verdadeiro ou Falso)

## Conceitos Fundamentais

- **Operadores Aritméticos:** são operadores matemáticos que são usados para fazer calculos matemáticos.

| **Operador** | **Descrição**  | **Exemplo (a = 10, b = 5)** | **Resultado** |
|--------------|----------------|-----------------------------|---------------|
| +            | Adição         | a + b                       | 15            |
| -            | Subtração      | a - b                       | 5             |
| *            | Multiplicação  | a * b                       | 50            |
| /            | Divisão        | a / b                       | 2             |
| %            | Módulo (resto) | a % b                       | 0             |

- **Operadores Relacionais:** São usados para comparar valores e retornam **true** ou **false**.

| **Operador** | **Descrição**  | **Exemplo (a = 10, b = 5)** | **Resultado** |
|--------------|----------------|-----------------------------|---------------|
| ==           | Igualdade      | a == b                      | false         |
| !=           | Diferente      | a != b                      | true          |
| >            | Maior que      | a > b                       | true          |
| <            | Menor que      | a < b                       | false         |
| >=           | Maior ou igual | a >= b                      | true          |
| <=           | Menor ou igual | a <= b                      | false         |

- **Operadores Lógicos:** Usados para combinar expressões booleanas (**true** ou **false**)

| **Operador** | **Descrição** | **Exemplo (x = true, y = false)** | **Resultado** |
|--------------|---------------|-----------------------------------|---------------|
| &&           | E lógico      | x && y                            | false         |
| `            |               | `                                 | Ou lógico     |
| !            | Negação       | !x                                | false         |

## Exemplos Práticos

``` Java

// Operadores Aritméticos

public class OperadoresAritmeticos {
    public static void main(String[] args) {
        int a = 10, b = 3;

        System.out.println("Soma: " + (a + b)); // Soma: 13 
        System.out.println("Subtração: " + (a - b)); // Subtração: 7  
        System.out.println("Multiplicação: " + (a * b)); // Multiplicação: 30
        System.out.println("Divisão: " + (a / b)); // Divisão: 3
        System.out.println("Módulo: " + (a % b)); // Módulo: 1
    }
}

// Operadores Relacionais e Lógicos

public class OperadoresRelacionaisLogicos {
    public static void main(String[] args) {
        int idade = 18;
        boolean maiorIdade = idade >= 18;
        boolean temCarteira = false;

        System.out.println("Maior de idade? " + maiorIdade); // Maior de idade? true 
        System.out.println("Pode dirigir? " + (maiorIdade && temCarteira)); // Pode dirigir? false  
    }
}

```

## Boas Práticas

- Use parênteses para evitar ambiguidades
- Prefira equals() para comparar Strings
- 