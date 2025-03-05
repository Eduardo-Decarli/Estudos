# Formatação de Texto

A formatação de texto em HTML permite destacar, enfatizar e estruturar o conteúdo textual de uma página. Isso ajuda na organização visual, acessibilidade e SEO.

- Melhora a legibilidade e a experiência do usuário.

- Destacar informações importantes (negrito, itálico, etc)

- Facilitar a acessibilidade para leitores de tela.

## Conceitos Fundamentais

<strong> -> Semântica forte, indica importancia de conteúdo

<b> -> Apenas estiliza o texto em negrito, sem significado semântico

``` HTML

<p>O <strong>HTML</strong> é essencial para criar páginas web.</p>
<p>Este texto está apenas em <b>negrito</b>.</p>

```

---

<em> -> Dá enfase ao texto, útil para acessibilidade

<i> -> Apenas estiliza o texto em itálico, sem impacto semântico.

``` HTML

<p>O HTML é <em>fundamental</em> para a web.</p>
<p>Este texto está em <i>itálico</i>.</p>

```

---

<u> -> Sublinha o texto (não tem significado semântico).

<s> e <del> ->  Indicam que o texto foi removido ou está obsoleto.

``` HTML

<p>Este é um <u>texto sublinhado</u>.</p>
<p>O preço antigo era <s>R$ 100,00</s>, agora é R$ 80,00.</p>
<p>O texto <del>removido</del> pode indicar alterações.</p>

```

---

<sup> -> Texto elevado, usado para expoentes

<sub> -> Texto rebaixado, usado para fórmulas químicas

``` HTML

<p>2<sup>10</sup> significa dois elevado à décima potência.</p>
<p>A fórmula da água é H<sub>2</sub>O.</p>

```

---

<blockquote> → Define uma citação longa em bloco.

<q> → Define uma citação curta (entre aspas).

<cite> → Define o nome da fonte de uma citação.

``` HTML

<blockquote>
    O HTML é a espinha dorsal da web.
</blockquote>

<p>Como dizia Tim Berners-Lee: <q>A Web deve ser para todos.</q></p>

<p><cite>Tim Berners-Lee</cite> criou o HTML em 1991.</p>

```

---

<code> → Define trechos de código em linha.

<pre> → Mantém formatação e espaços do código.

<kbd> → Representa entrada de teclado.

``` HTML

<p>Use o comando <code>git status</code> no terminal.</p>

<pre>
function hello() {
    console.log("Olá, mundo!");
}
</pre>

<p>Pressione <kbd>Ctrl + S</kbd> para salvar.</p>

``

## Exemplos Práticos

``` HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Formatação de Texto</title>
</head>
<body>
    <h1>Aprendendo Formatação de Texto no HTML</h1>

    <h2>Negrito e Itálico</h2>
    <p>O HTML é <strong>muito importante</strong> na web.</p>
    <p>Este é um exemplo de <em>ênfase</em> no texto.</p>

    <h2>Sublinhado e Tachado</h2>
    <p>O preço antigo era <s>R$ 200</s>, agora é <strong>R$ 150</strong>.</p>

    <h2>Texto Sobrescrito e Subscrito</h2>
    <p>Matemática: 3<sup>2</sup> = 9</p>
    <p>Fórmula da água: H<sub>2</sub>O</p>

    <h2>Citações e Código</h2>
    <blockquote>
        "A Web é para todos." - Tim Berners-Lee
    </blockquote>
    <p>Use o comando <code>echo "Olá, HTML!"</code>.</p>

    <h2>Entrada do Teclado</h2>
    <p>Pressione <kbd>Ctrl + C</kbd> para copiar.</p>
</body>
</html>

```

## Boas Práticas

- Use tags semânticas como <strong> e <em> em vez de <b> e <i>.

- Utilize <blockquote> para citações longas e <q> para curtas.

- Para código, prefira <code> dentro de <pre> quando necessário.

- Não use <b> e <i> apenas para estilização (use CSS para isso).

- Evite <u> para indicar ênfase, pois pode confundir com links