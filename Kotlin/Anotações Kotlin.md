# Sumário 

[História do Kotlin](#história-do-kotlin)

# História do Kotlin

É uma linguagem de programação ***Open-Search*** criada pela JetBrains (criadora do InteliJ e do Android Studio) em 2010 e teve sua primeira versão após 6 anos de desenvolvimento, lançada em Fevereiro de 2016, agora ela possui além dos desenvolvimentos feitos pela JetBrains, um suporte gigante feito por uma unida comunidade do GitHUb.

O Kotlin é uma linguagem com ***interoperabilidade*** com o Java, isso permite que ambas as linguagens consigam se comunicar uma com a outra e até chamar trechos de códigos entre elas. O Kotlin é feito para ***POO*** e para ***Funcional***.

- ***Fortemente Tipada:*** Ela é tipada de forma manual, usando explicitamente o tipo que quer montar e também de forma dinâmica, onde apenas define-se o valor da variável e a variável irá ser tipada de acordo com o valor.

``` kotlin 

// Código Tipado Explicitamente
val nome: String = "DevMasterTeam"
val idade: Int = 18
val profissao: String = "Professor"

// Código Tipado Dinamicamente
val nome = "DevMasterTeam"
val idade = 27
val excelenteEnsino = true

```

- ***Concisa:*** Ela possui menos código Boilerplate do que o Java, permitindo uma estruturação de classes de forma mais rápida e menos trabalhosa

``` kotlin

// Aqui inclui-se propriedades e get/set
class Pessoa (var nome: String, var anoNascimento: Int)

```

- ***Segura:*** Kotlin trabalha com a abordagem de Null-Safe, para impedir que variáveis recebam um valor null, isso auxilia o código a não cometer o famoso NullPointerException. Pode-se apenas atribuir um valor null para uma variável se ela for marcada como ***Anulável*** através do símbolo ***?***

``` kotlin

// Não compila, pois uma String não pode receber Null
var nome: String = null

// Agora permite que um valor possa receber Null
var valor: String? = null

```

# Código MAIN

No Kotlin, todo código executa dentro de uma função main, essa função é definida através da seguinte nomeclatura:

``` kotlin

fun main(args Array<String>) {
    print("Meu primeiro programa);
}

```

# Variáveis

Para definir variáveis em Kotlin, há algumas maneiras diferentes, como o **var**, que permite criar variáveis mutaveis e o **val** que cria variáveis imutáveis, comos e fossem final. Vamos estudar a seguir, primeiramente abordando o conceito de var.

**Var:** Esse método permite criar variáveis que podem sofrer uma revalorização durante o fluxo de funcionamento do aplicativo, podemos definir uma variável de duas formas diferentes, atribuindo ou não um **tipo inferido**.

``` Kotlin

// Aqui definimos uma variável nome do tipo String
var nome: String = "Eduardo";

// Aqui podemos atribuir uma variável nome que dinamicamente sofre um tipo, isso se chama Inferência de Tipo
var nome = "Eduardo";

```

**Val:** O uso da variável val, permite criar variáveis que não podem mudar a referência, ou seja, criamos variáveis **final** que serão contínuas no programa, como a criação de uma variável para se referir a idade ou a PI, etc...

Essa variável ela fixa apenas a referência de memória, ou seja, para tipos primitivos, não é possível alterar seus valores, uma vez definidos, serão sempre aqueles.

Mas como o val armazena a referência de memória, uma variável pode apontar para um Objeto também, e nesse caso, ao apontar para um objeto em memória, a variável irá conter e fixar a referência de memória, permitindo alterar as propriedades do objeto, mas não a reatribuição para outro objeto.

``` kotlin

val lista = mutableListOf(1, 2);

lista = mutableListOf(3, 4); // Isso não é permitido

lista.add(3) // Isso é permitido

```

## Tipo de variáveis

No Kotlin, possuimos algumas variáveis bem similares ao Java, vamos estudar elas abaixo:

| Tipo        | Descrição                              | Exemplo                            |
|-------------|----------------------------------------|------------------------------------|
| Int         | Número inteiro                         | val x: Int = 10                    |
| Double      | Número decimal (precisão dupla)        | val pi = 3.14                      |
| Float       | Decimal com menor precisão             | val f = 3.14f                      |
| Long        | Inteiro grande                         | val l = 100000L                    |
| Short       | Inteiro pequeno                        | val s: Short = 10                  |
| Byte        | Inteiro muito pequeno                  | val b: Byte = 1                    |
| Boolean     | Verdadeiro ou falso                    | val ativo = true                   |
| Char        | Um único caractere                     | val letra = 'A'                    |
| String      | Cadeia de caracteres                   | val nome = "Kotlin"                |
| Array       | Coleção de elementos                   | val arr = arrayOf(1,2,3)           |
| List        | Lista imutável                         | val lista = listOf(1,2,3)          |
| MutableList | Lista mutável                          | val lista = mutableListOf(1,2,3)   | 
| Set         | Conjunto sem elementos duplicados      | val set = setOf(1,2)               |
| Map         | Estrutura chave-valor                  | val map = mapOf("a" to 1)          |

Além disso, vamos definir uma tabela que consta os difernetes tipos de definições de variáveis

| Categoria        | Tipo / Palavra-chave   | Descrição                                                                    | Exemplo                     |
|------------------|------------------------|------------------------------------------------------------------------------|-----------------------------|
| Mutável          | var                    | Pode ter seu valor alterado após a declaração                                | var idade = 20              |
| Imutável         | val                    | Não pode ser reatribuída após a inicialização                                | val nome = "Eduardo"        |
| Inferida         | (sem tipo explícito)   | O compilador deduz o tipo automaticamente                                    | val x = 10                  |
| Explícita        | : Tipo                 | Tipo declarado manualmente                                                   | val x: Int = 10             |
| Nullable         | ?                      | Pode armazenar valor nulo                                                    | var nome: String? = null    |
| Não-null         | (padrão)               | Não aceita valor nulo                                                        | var nome: String = "Ana"    |

O Kotlin possui uma peculiaridade interessante, no ponto de vista funcional da linguagem, o kotlin não possui **tipo primitivo**, pois ele trata todos os tipos de variáveis como objetos, ou seja, tanto int, double, float ou long possui métodos atribuidos a eles, e isso permite que possamos trabalhar com os tipos de forma mais flexível.

Mas uma nuância muito importante, esses tipos que o Java consideram primitivos e o Kotlin trabalha como objetos, são convertidos em tipos primitivos durante o processo de compilação.

Como resumo, podemos comparar o tipo Int do Kotlin com o tipo Integer do Java (wapper class), sabendo que ambos os tipos possuem um tipo int primitivo em sua essência.

## Conversão de Tipos

Como o Kotlin trabalha os tipos como Wapper Class, ele disponibiliza diversos métodos para trabalharmos, e isso inclui métodos de conversão, podemos utilizar métodos como toString(), toDouble(), toFloat(), etc... atrelados a cada tipo da linguagem.

```kotlin

var w: Int = 10;
var x: Double = w.toDouble();
var y: Float = x.toFloat();
var z: String = y.toString();

```

O tipo Booleano no Kotlin também recebe métodos, e podemos utilizar esses métodos para fazer verificação de tabela verdade através dos métodos.

``` kotlin 

val c1 = b1.and(b2) //Retorno será false
val c2 = b1.or(b2) //Retorno será true
val c3 = b1.not() //Retorno será false

```

# Template String

O Kotlin possui uma caracteristica muito interessante, ele possui uma coisa chamada de **Template String**, e isso de forma nativa na linguagem, permitindo a interpolação de variáveis em textos String utilizando o caractere $ para representar a chamada de uma variável.

Muitas linguagens possuem essa caracteristica, mas infelizmente o java não é uma delas.

``` kotlin

val idade: Int = 22;
String minhaIdade = "Eu tenho $idade anos de idade";

```

Além do Template String, o Kotlin permite o uso de aspas triplas para representar textos de várias linhas e com formatação, muito similar ao Java nesse quesito.

``` kotlin

val text = """
    Exemplo de texto
    com mais de uma
    linha
    """;

```

# Listas e Arrays

Um array em Koltin é definido da seguinte forma:

``` kotlin

val arrayInt: Array<Int> = arrayOf(1, 2, 3, 4);

val x = arrayInt[1] // recupera o número 2;

```

Como os arrays possuem valores definidos previamente e não permitem inserção dinâmica, podemos utilizar então um List para realizar uma estrutura que permita esse comportamento, porém, aqui temos uma diferença definida entre o Kotlin e o Java, pois as Listas são definidas de forma diferente.

``` kotlin

// Criação de uma lista Imutável, não permite inserção
var myImutableList: List<Int> = listOf(1, 2, 3, 4, 5);

var myMutableList: List<Int> = mutableListOf(1, 2, 3, 4, 5);

```

Vamos ver também alguns métodos que um tipo List possui, sendo que alguns métodos são válidos apenas para o tipo MutableList:

``` kotlin

val myList: List<String> = motableList("Uma palavra", "Duas Palavras");
val palavraEx: String = "Três palavras";

myList.add(palavraEx);                                  // Adiciona 1 elemento na lista
myList.addAll("Quarto Palavras", "Cinco Palavras");     // Adiciona vários elementos na lista
myList.removeAt(1);                                     // Remove o elemento na posição definida                                    
myList.remove(palavraEx)                                // Remove o elemento por igualdade
myList.first();                                         // Recupera o 1º Item da lista
myList.last();                                          // Recupera o Ultimo Item da lista
myList.filter(regex);                                   // Retorna uma lista filtrada

// Mutabilidade por Referência

val listaMutavel: List<Int> = mutableListOf(1, 2, 3);   // Define uma lista Mutavel
fun retornaLista: List<Int> = listaMutavel;             // Cria uma função que retorna a lista Mutavel
val listaImutavel: List<Int> = retornaLista();          // Atribui a lista mutável para uma lista Imutável
listaMutavel.add(4);                                    // Irá salvar e as 2 listas receberam a alteração

```

# Importações

No Kotlin, podemos realizar importações para utilizar classes e arquivos diferentes dentro do nosso algorítmo, e para isso, devemos realizar um import similar ao Java.

No Kotlin, caso você precise realizar um import que possua o mesmo nome de uma classe que já existe no fluxo, você pode apelidar ela com um **as**.

``` kotlin

import vitrine.produto as product
import carrinho.produto 

```

- Como já existe um produto vindo de outro package, podemos realizar um apelido para o produto vindo de vitrine, isso é importante quando lidamos com pacotes externos e bibliotecas.

# Estrutura de Condição e Repetição

If Ternário: Em Kotlin, usamos o if ternário de uma forma escrita um pouco diferente do Java, pois em vez de utilizar caracteres como ? e : utilizamos if else

``` kotlin

val maior = if(a > b) a else b

```

When: Essa é uma estrutura com nome novo, mas ela serve realizmente para ser como o Switch em Java, apenas com outro nome:

``` Kotlin

when(x) {
    1 -> print("X é igual a 1");
    2 -> print("X é igual a 2");
    else -> {
        print("X é maior que 2");
    }
}

when(x) {
    1, 2 -> print("X é igual a 1 ou a 2");                      // Utiliza um OU, sendo um ou outro
    else -> {
        print("X possui outro valor");
    }
}

when(x) {
    1..10 -> print("X possui um valor entre 1 e 10");           // Verifica intervalo de caracteres
    else -> print("X não é um valor entre 1 e 10");
}

```

for: Assim como o java, podemos criar uma estrutura de repetição for, mas em Kotlin, a sintáxe da estrutura funciona um pouco diferente do que estamos acostumados a montar, pois ela é similar ao python.

``` kotlin

val lista = listOf(1, 2, 3, 4);

for(i in lista) {
    print("Item da lista número $i");
}

for((index, value) in lista.withIndex()) {                  // Aqui temos um for que consegue puxar a posição do valor dentro da lista, para isso temos que puxar também o index diretamente da lista
    println("Item $value está no index $index");
}

```

- While em Kotlin funciona muito parecido com o Java.

# Comparativos

Dentro do Kotlin, podemos usar o sinal de igual para 3 funções diferentes, sendo:

Atribuição (=): refere-se a dar/trocar um valor a uma variável.

Comparação Estrutural (==): Ele realiza uma comparação entre 2 variáveis de forma estrutural, ou seja, verifica se os valores são iguais, é basicamente a chamada para a função .equals() do Java.

Comparação Referencial (===): Aqui nós não realizamos uma comparação de conteúdo, mas sim uma comparação de referência. Ele verifica se duas variáveis apontam para a mesma célula de memória, ou seja, não basta ter valores iguais, precisam ser exatamente a mesma variável

- O comparativo estrutural do Kotlin não é igual ao Java, no Java, a comparação é realizada, fazendo comparação de **referência de memória para objetos** e comparação de **valor para primitivos**

# Funções

