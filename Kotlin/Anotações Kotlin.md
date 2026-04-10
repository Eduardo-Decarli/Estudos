# Sumário 

[História do Kotlin](#história-do-kotlin)

# História do Kotlin

É uma linguagem de programação ***Open-Search*** criada pela JetBrains (criadora do InteliJ e do Android Studio) em 2010 e teve sua primeira versão após 6 anos de desenvolvimento, lançada em Fevereiro de 2016, agora ela possui além dos desenvolvimentos feitos pela JetBrains, um suporte gigante feito por uma unida comunidade do GitHUb.

O Kotlin é uma linguagem com ***interoperabilidade*** com o Java, isso permite que ambas as linguagens consigam se comunicar uma com a outra e até chamar trechos de códigos entre elas. O Kotlin é feito para ***POO*** e para ***Funcional***.

- Fortemente Tipada: Ela é tipada de forma manual, usando explicitamente o tipo que quer montar e também de forma dinâmica, onde apenas define-se o valor da variável e a variável irá ser tipada de acordo com o valor.

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

- Concisa: Ela possui menos código Boilerplate do que o Java, permitindo uma estruturação de classes de forma mais rápida e menos trabalhosa

``` kotlin

// Aqui inclui-se propriedades e get/set
class Pessoa (var nome: String, var anoNascimento: Int)

```