# Títulos e Parágrafos

Os títulos (<h1> até <h6>) e parágrafos(<p>) são essenciais para estruturar o conteúdo textual de uma página HTML. Com isso você pode:

- Criar uma hierarquia de informações para melhor organização e acessibilidade

- Melhorar a experiência do usuário ao facilitar a leitura

- Melhorar o SEO (Otimização para Motores de Busca)

## Conceitos Fundamentais

Os títulos são usados para definir seções e sub-seções do conteúdo.

- <h1> → Título Principal (Usado apenas uma vez por página).

- <h2> → Subtítulo de <h1>.

- <h3> → Subtítulo de <h2>, e assim por diante.

- <h6> → Último nível de título, menos importante.

O elemento <p> define um bloco de texto, organizando o conteúdo em seções legíveis.

``` HTML

<p>O HTML é a linguagem de marcação usada para estruturar o conteúdo na web.</p>

```

- Pode conter textos longos ou curtos

- Aceita tags inline como <strong> (negrito) e <em> (itálico).

- Quebra de linha não são automáticas (diferente de editores de texto).

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
    <p>O HTML (<strong>HyperText Markup Language</strong>) é a linguagem de marcação usada para criar páginas web.</p>

    <h2>Principais Elementos</h2>
    <h3>Títulos</h3>
    <p>Os títulos ajudam a organizar o conteúdo em seções estruturadas.</p>

    <h3>Parágrafos</h3>
    <p>Os parágrafos são usados para agrupar textos em blocos lógicos.</p>

    <h2>Conclusão</h2>
    <p>HTML é essencial para estruturar qualquer site, trabalhando junto com CSS e JavaScript.</p>
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