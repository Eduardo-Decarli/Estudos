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