# Estrutura de Controle de Fluxo em Java

As estruturas de controle de fluxo em Java permitem que um programa tome decisões e controle a execução do código com base em condições. Isso é essencial para a lógica de qualquer aplicação.

Em Java, temos três principais formas de controle de fluxo baseadas em decisões:

- **if / else if / else** → Executa diferentes blocos de código dependendo de uma condição.

- **switch** → Escolhe uma entre várias opções com base em um valor.

Isso é útil, por exemplo, para verificar a idade de um usuário, validar dados de entrada ou tomar decisões no código de acordo com valores dinâmicos

## if, else if, else, Operador Ternário

O if testa uma condição booleana. Se for **true**, executa o bloco de código associado.

- Se houver mais condições, usamos else if.
 
- Se nenhuma condição for atendida, o else (opcional) é executado.

``` Java

public class EstruturasDeControle {
    public static void main(String[] args) {
        int idade = 18;

        if (idade < 18) {
            System.out.println("Menor de idade");
        } else if (idade == 18) {
            System.out.println("Tem exatamente 18 anos");
        } else {
            System.out.println("Maior de idade");
        }
    }
}

```

Podemos usar os operadores lógicos (&&, ||, !) para combinar condições.

- **&& (E lógico)** → Ambas as condições devem ser verdadeiras

- **|| (OU lógico)** → Pelo menos uma condição deve ser verdadeira.

``` Java

public class ControleAcesso {
    public static void main(String[] args) {
        boolean temIngresso = true;
        int idade = 17;

        if (temIngresso && idade >= 18) {
            System.out.println("Pode entrar na festa");
        } else {
            System.out.println("Acesso negado");
        }
    }
}

```

Dentro de um código usando if-else Podemos aninhar (if dentro de if) para verificar várias condições.

``` Java

public class DescontoLoja {
    public static void main(String[] args) {
        boolean clienteFidelidade = true;
        double valorCompra = 250.0;

        if (valorCompra > 200) {
            if (clienteFidelidade) {
                System.out.println("Desconto de 20%");
            } else {
                System.out.println("Desconto de 10%");
            }
        } else {
            System.out.println("Sem desconto");
        }
    }
}

```

O operador ternário é um recurso para tomada de decisões com objetivo similar ao do if/else, mas que é codificado em apenas uma linha.

``` Java

(expressão booleana) ? código 1 : código 2;

```

Ao avaliar a expressão booleana, caso ela seja verdadeira, o código 1, declarado após o ponto de interrogação (?) será executado; do contrário, o programa irá executar o código 2, declarado após os dois pontos (:).

## Switch

O switch substitui múltiplos if quando temos um valor fixo (como número ou String).

- Ele compara um valor com vários case

- O break evita que o código continue executando os próximos case

``` Java

switch (variavel) {
    case valor1:
        // código
        break;
    case valor2:
        // código
        break;
    default:
        // código para valores não previstos
}

```

Vamos criar um programa que exibe o nome do dia da semana com base em um número (1 a 7).

``` Java

public class SwitchExemplo {
    public static void main(String[] args) {
        int diaSemana = 3;

        switch (diaSemana) {
            case 1:
                System.out.println("Domingo");
                break;
            case 2:
                System.out.println("Segunda-feira");
                break;
            case 3:
                System.out.println("Terça-feira");
                break;
            case 4:
                System.out.println("Quarta-feira");
                break;
            case 5:
                System.out.println("Quinta-feira");
                break;
            case 6:
                System.out.println("Sexta-feira");
                break;
            case 7:
                System.out.println("Sábado");
                break;
            default:
                System.out.println("Número inválido");
        }
    }
}

```

A partir do Java 7, podemos usar String no switch.

``` Java

public class CargoSalario {
    public static void main(String[] args) {
        String cargo = "Gerente";

        switch (cargo) {
            case "Estagiário":
                System.out.println("Salário: R$ 1.500");
                break;
            case "Analista":
                System.out.println("Salário: R$ 4.000");
                break;
            case "Gerente":
                System.out.println("Salário: R$ 8.000");
                break;
            default:
                System.out.println("Cargo não reconhecido");
        }
    }
}

```

Se não usarmos break (fall-through), os casos continuam executando até encontrar um break ou o final do switch.

``` Java

public class ExemploSemBreak {
    public static void main(String[] args) {
        int numero = 2;

        switch (numero) {
            case 1:
                System.out.println("Número 1");
            case 2:
                System.out.println("Número 2");
            case 3:
                System.out.println("Número 3");
            default:
                System.out.println("Outro número");
        }
    }
}

/*

A saida será isso

Número 2  
Número 3  
Outro número  

*/

```

Podemos agrupar casos que executam o mesmo código. Isso pode nos permitir ter um switch com múltiplos casos no mesmo bloco:

``` Java

public class Notas {
    public static void main(String[] args) {
        char conceito = 'A';

        switch (conceito) {
            case 'A':
            case 'B':
                System.out.println("Aprovado!");
                break;
            case 'C':
            case 'D':
                System.out.println("Recuperação.");
                break;
            case 'F':
                System.out.println("Reprovado.");
                break;
            default:
                System.out.println("Nota inválida.");
        }
    }
}

```
