# O que é Regex?

Regex é uma sequência de caracteres que define um padrão de busca. Pode ser usado para validar e filtrar textos, como encontrar e-mails, números de telefone, URLs e muito mais. Como por exemplo: "\d+" corresponde a númeors inteiros em um texto ("123", "45", "7890").

## Elementos Básicos do Regex

- Metacaracteres Principais

| **Símbolo** | **Significado**                         | **Exemplo** | **Correspondência**      |
|-------------|-----------------------------------------|-------------|--------------------------|
| .           | Qualquer caractere (exceto nova linha)  | c.t         | "cat", "cut", "c9t"      |
| \d          | Dígito (0-9)                            | \d+         | "123", "42"              |
| \D          | Não é um dígito                         | \D+         | "abc", "A@"              |
| \w          | Caractere de palavra (A-Z, a-z, 0-9, _) | \w+         | "hello", "user_123"      |
| \W          | Não é um caractere de palavra           | \W+         | "@#", "?! "              |
| \s          | Espaço em branco                        | \s+         | " " (espaço), "\t" (tab) |
| \S          | Não é espaço em branco                  | \S+         | "Hello", "123"           |

- Quantificadores

| **Símbolo** | **Significado**          | **Exemplo** | **Correspondência** |
|-------------|--------------------------|-------------|---------------------|
| +           | Um ou mais               | \d+         | "123", "4", "56"    |
| *           | Zero ou mais             | a*          | "", "a", "aaa"      |
| ?           | Zero ou um               | colou?r     | "color", "colour"   |
| {n}         | Exatamente n ocorrências | \d{3}       | "123", "456"        |
| {n,}        | Pelo menos n ocorrências | \d{2,}      | "12", "3456"        |
| {n,m}       | Entre n e m ocorrências  | \d{2,4}     | "12", "1234"        |

- Ancoras

| **Símbolo** | **Significado**         | **Exemplo** | **Correspondência**        |
|-------------|-------------------------|-------------|----------------------------|
| ^           | Início da linha         | ^Hello      | "Hello world"              |
| $           | Fim da linha            | world$      | "Hello world"              |
| \b          | Limite de palavra       | \bcat\b     | " cat ", mas não "catalog" |
| \B          | Não é limite de palavra | \Bcat\B     | "catalog"                  |

## Grupos de Alternância

- Uso de Parênteses para Agrupamento: Os parenteses () são usados para agrupar partes do regex e capturar correspondências.

``` regex

(\d{3})-(\d{2})-(\d{4})

```

Captura padrões como "123-45-6789"

- Alternância (|): O operador | funciona como um "OU" lógico.

``` regex

banana|maçã|uva

```

Encontra "banana", "maçã" ou "uva".

## Aplicações Práticas

- Validar um Email

``` regex

^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

```

- Encontrar Números de Telefone

``` regex

\d{2}-\d{5}-\d{4}

```

- Captura de URLs

``` regex

https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}

```

## Uso em Java

O Java possui a classe Pattern para trabalhar com Regex.

``` Java

import java.util.regex.*;

public class RegexTest {
    public static void main(String[] args) {
        String texto = "O email do usuário é email@dominio.com";
        String regex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(texto);

        while (matcher.find()) {
            System.out.println("E-mail encontrado: " + matcher.group());
        }
    }
}


```

E-mail encontrado: email@dominio.com