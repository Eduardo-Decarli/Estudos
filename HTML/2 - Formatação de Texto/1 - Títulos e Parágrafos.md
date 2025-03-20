# Títulos e Parágrafos

Os elementos de títulos (<h1> a <h6>) e parágrafos (<p>) são fundamentais para estruturar o conteúdo textual em uma página HTML. Seu uso adequado melhora a organização do conteúdo, a acessibilidade e o SEO (Search Engine Optimization), além de facilitar a leitura do usuário.

## Conceitos Fundamentais

Os títulos são usados para organizar e hierarquizar o conteúdo de uma página. Eles variam de <h1> (mais importante) a <h6> (menos importante):

- <h1> → Título Principal (Usado apenas uma vez por página).

- <h2> → Subtítulo de <h1>.

- <h3> → Subtítulo de <h2>, e assim por diante.

- <h6> → Último nível de título, usado para informações menos relevantes.

``` HTML

<h1>História da Web</h1>
<h2>O início da internet</h2>
<h3>Criação do HTML</h3>
<h4>Evolução do HTML</h4>

```

O elemento <p> (parágrafo) é usado para agrupar blocos de texto, tornando a leitura mais fluida e organizada.

``` HTML

<p>O HTML é a linguagem de marcação usada para estruturar o conteúdo na web.</p>

```

- Pode conter textos longos ou curtos.

- Aceita tags inline como <strong> (negrito) e <em> (itálico).

- Não adiciona quebra de linha automaticamente, diferente de editores de texto.

- Para quebra de linha manual, usa-se <br>, mas seu uso deve ser evitado para espaçamentos (use CSS para isso).

## Exemplos Práticos

``` HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Títulos e Parágrafos</title>
</head>
<body>
    <h1>HTML: A Base da Web</h1>

    <h2>O que é HTML?</h2>
    <p>O HTML (<strong>HyperText Markup Language</strong>) é a linguagem de marcação usada para estruturar conteúdos na web.</p>

    <h2>Principais Elementos</h2>
    <h3>Títulos</h3>
    <p>Os títulos são utilizados para dividir e organizar conteúdos em seções estruturadas.</p>

    <h3>Parágrafos</h3>
    <p>Os parágrafos agrupam textos em blocos para facilitar a leitura e a compreensão.</p>

    <h2>Conclusão</h2>
    <p>O HTML é essencial para estruturar qualquer site, trabalhando em conjunto com o CSS e o JavaScript.</p>
</body>
</html>

```

## Boas Práticas

- Use apenas um <h1> por página para manter a acessibilidade e SEO.

- Organize os títulos de forma hierárquica (<h1> > <h2> > <h3>...).

- Evite textos muito longos dentro de <p> (quebre em vários parágrafos).

- Não pule níveis de títulos (Ex: Não usar <h1> e depois direto <h4>).

- Não use títulos apenas por tamanho de fonte (Use CSS para isso).

- Não use <br> para criar espaçamentos entre parágrafos. Use CSS.