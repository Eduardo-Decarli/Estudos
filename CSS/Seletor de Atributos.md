# Seletor de Atributos

Os seletores de atributos permitem que você aplique estilos a elementos HTML com base nos atributos que eles possuem. Aqui está um guia passo a passo:

## Seletores de Atributos Simples

- [atributo]: Seleciona elementos que possuem um determinado atributo, independentemente do valor.

``` CSS

/* Seleciona todos os elementos com o atributo "title" */
[title] {
  border: 1px solid black;
}

```

## Seletores de Atributos com Valor Específico

- [atributo="valor"]: Seleciona elementos cujo atributo é exatamente igual ao valor especificado.

``` CSS

/* Seleciona todos os elementos com o atributo "type" igual a "button" */
[type="button"] {
  background-color: blue;
}

```

## Seletores de Atributos com Valor Parcial

- [atributo~="valor"]: Seleciona elementos cujo atributo contém uma lista de valores separados por espaços, e um desses valores é exatamente igual ao valor especificado.

``` CSS

/* Seleciona elementos com a classe "highlight" em uma lista de classes */
[class~="highlight"] {
  color: red;
}

```

- [atributo|="valor"]: Seleciona elementos cujo atributo é exatamente igual ao valor especificado ou começa com o valor seguido por um hífen.

``` CSS

/* Seleciona elementos com o atributo "lang" igual a "en" ou começando com "en-" */
[lang|="en"] {
  font-style: italic;
}

```

## Seletores de Atributos com Prefixo, Sufixo e Substring

- [atributo^="valor"]: Seleciona elementos cujo atributo começa com o valor especificado.

``` CSS

/* Seleciona elementos cujo atributo "href" começa com "https" */
[href^="https"] {
  color: green;
}

```

- [atributo$="valor"]: Seleciona elementos cujo atributo termina com o valor especificado.

``` CSS

/* Seleciona elementos cujo atributo "src" termina com ".jpg" */
[src$=".jpg"] {
  border: 2px solid blue;
}

```

- [atributo*="valor"]: Seleciona elementos cujo atributo contém o valor especificado em qualquer posição.

``` CSS

/* Seleciona elementos cujo atributo "data-info" contém "user" */
[data-info*="user"] {
  background-color: yellow;
}

```

## Exemplo

Vamos ver um exemplo prático de como esses seletores podem ser usados em um documento HTML:

``` HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <style>
    [type="text"] {
      border: 1px solid gray;
    }
    [href^="https"] {
      color: green;
    }
    [class~="active"] {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <input type="text" placeholder="Digite seu nome">
  <a href="https://example.com">Link Seguro</a>
  <a href="http://example.com">Link Não Seguro</a>
  <div class="menu active">Menu Ativo</div>
</body>
</html>

```