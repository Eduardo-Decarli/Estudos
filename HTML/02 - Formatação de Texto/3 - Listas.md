# Listas

Listas em HTML são usadas para organizar e estruturar informações de forma clara e legível. Elas são amplamente utilizadas em menus, categorias de produtos, tópicos de artigos e muito mais.

- Melhor organização do conteúdo

- Facilita a leitura e a navegação

- Essencial para menus e estruturas hierárquicas

## Conceitos Fundamentais

- **Listas não ordenadas (<ul>):** Exibe uma lista de itens com marcadores (º, o, etc), é util para itens sem uma ordem específica.

``` HTML

<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

```

- **Listas Ordenadas (<ol>):** Exibe os itens numerados (1, 2, 3...), é util para passos, rankings e sequencias. Por padrão será uma lista numérica, mas podemos trocar para outras opções com type.

    - Type="1" -> Números (1, 2, 3...)
    - Type="A" -> Letras maiúsculas (A, B, C...)
    - Type="a" -> Letras minusculas (a, b, c...)
    - Type="I" -> Algorismos romanos maiúsculos (I, II, III...)
    - Type="i" -> Algorismos romanos minúsculos (i, ii, iii...)

``` HTML

<ol type="1" start="3" reversed>
    <li>Abrir o navegador</li>
    <li>Acessar um site</li>
    <li>Ler o conteúdo</li>
</ol>

```

start declara que a lista começará a partir de um valor passado.

- **Lista de Definição (<dl>, <dt>, <dd>):** Usada para definir termos e suas descrições.


``` HTML

<dl>
    <dt>HTML</dt>
    <dd>Linguagem de marcação para criar páginas web.</dd>
    
    <dt>CSS</dt>
    <dd>Folhas de estilo para estilizar páginas web.</dd>
</dl>

```

## Exemplos Práticos

``` HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Listas em HTML</title>
</head>
<body>

    <h1>Exemplos de Listas em HTML</h1>

    <h2>Lista não ordenada</h2>
    <ul>
        <li>Notebook</li>
        <li>Teclado</li>
        <li>Mouse</li>
    </ul>

    <h2>Lista ordenada</h2>
    <ol type="I">
        <li>Estudar HTML</li>
        <li>Praticar com exemplos</li>
        <li>Criar um projeto</li>
    </ol>

    <h2>Lista de definição</h2>
    <dl>
        <dt>JavaScript</dt>
        <dd>Linguagem de programação para interatividade na web.</dd>

        <dt>Python</dt>
        <dd>Linguagem de programação para diversas aplicações.</dd>
    </dl>

</body>
</html>

```

## Boas Práticas

- Use <ul> para itens sem ordem específica.

- Use <ol> para passos e sequências.

- Use <dl> para definições e glossários.

- Combine listas com CSS para melhorar a aparência.