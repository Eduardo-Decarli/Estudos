# O que é HTML

HTML (HyperText Markup Language) é a linguagem de marcação usada para criar páginas da web. Ele estrutura o conteúdo usando tags para definir elementos como títulos, parágrafos, imagens, links e muito mais.

- Define a estrutura de conteúdos em uma página da web.

- Trabalha em conjunto com CSS (para estilização) e JavaScript (para interatividade).

- Permitir a exibição de textos, imagens, vídeos e outros conteúdos na web.

``` HTML

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meu Primeiro HTML</title>
</head>
<body>
    <h1>Olá, mundo!</h1>
    <p>Este é um exemplo básico de HTML.</p>
</body>
</html>

```

# Tags e Elementos

Tags são palavras-chave entre <> que definem a estrutura do conteúdo. Elas geralmente têm uma abertura e um fechamento.

Elementos são a combinação de tags e seu conteúdo.

- **Tags de Block (Block-level):** Ocuparam toda a largura disponível. <h1>, <p>, <div>, <section>, <article>.

- Tags Inline: Ocupam apenas o espaço necessário, como <span>, <a>, <strong> e <em>.

- Tags sem conteúdo (Self-closing): Não precisam de uma tag de fechamento, como <img>, <br>, <input>.

``` HTML

<h1>Este é um título</h1> <!-- Tag de Bloco -->
<p>Este é um <strong>parágrafo</strong> com negrito.</p> <!-- Inline -->
<img src="imagem.jpg" alt="Imagem de Exemplo"> <!-- Sem conteúdo -->

```

# Estrutura Básica de um Documento HTML

Um documento HTML segue sempre essa estrutura padrão:

``` HTML

<!DOCTYPE html>  <!-- Define  a versão do HTML (HTML5) -->
<html lang="pt-BR">  <!-- Define o idioma do documento -->
<head>
    <meta charset="UTF-8">  <!-- Configuração de caracteres -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- Ajusta para dispositivos móveis -->
    <title>Minha Página</title>  <!-- Define o título da aba -->
</head>
<body>
    <h1>Bem-vindo ao HTML</h1>
    <p>Essa é a estrutura básica de um documento HTML.</p>
</body>
</html>

```

- <html> -> Elemento raiz do HTML.

- <head> -> Contém metadados e configurações

- <body> -> Onde o conteúdo visível da página é colocado.

# Atributos HTML (class, id, src, href, etc)

Os atributos são informações adicionais dentro de uma tag que modificam seu comportamento.

| Atributo | Descrição                              | Exemplo |
|----------|----------------------------------------|---------|
| id       | Identifica um elemento único na página |