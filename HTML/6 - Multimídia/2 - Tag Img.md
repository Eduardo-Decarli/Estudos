# Tag <img> em HTML

A tag <img> é usada para exibir imagens em páginas da web. Diferente de outras tags, <img> é um elemento vazio, ou seja, não precisa de uma tag de fechamento.

Sua sintáxe básica é formada pela tag e duas propriedades

``` HTML

<img src="imagem.jpg" alt="Descrição da imagem">

```

- **src:** Define o caminho da imagem (URL local ou externa).

- **alt:** Texto alternativo para acessibilidade e SEO.

## Caminhos para imagens no atributo src

O caminho da imagem pode ser relativo ou absoluto, vamos explorar como podemos fazer as duas formas

- Caminho Relativo: quando a imagem está na mesma pasta do HTML, o navegador buscará a imagem na mesma pasta onde está o arquivo HTML

- Caminho Absoluto: Quando a imagem está hospedada na internet, A imagem será carregada do site externo.

``` HTML

<!-- Caminho Relativo -->

<img src="imagens/foto.jpg" alt="Foto na subpasta">

<!-- Caminho Absoluto -->

<img src="https://www.exemplo.com/imagem.jpg" alt="Imagem externa">

```

## Atributos Principais da Tag <img>

A tag <img> possui vários atributos que permitem personalizar a exibição da imagem:

- src: Define o caminho da imagem. Pode ser um link local ou externo. 

- alt: Define um texto que aparece caso a imagem não carregue. Também é usado por leitores de tela para melhorar acessibilidade.

- width e height: Permitem definir a largura (width) e altura (height) da imagem em pixels ou porcentagem.

- title: Exibe um texto de dica ao passar o mouse sobre a imagem.

loading: Controla quando a imagem será carregada. possui dois valores, eaget (carrega a imagem imediatamente ao abrir a página) ou lazy (A imagem só carrega quando o usuário rolar a página até ela)

## Formatos de Imagens Suportados

| **Formato**        | **Descrição**                                         |
|--------------------|-------------------------------------------------------|
| JPEG (.jpg, .jpeg) | Ideal para fotos e imagens com muitas cores.          |
| PNG (.png)         | Suporta transparência (fundo transparente).           |
| GIF (.gif)         | Suporta animações, mas tem qualidade limitada.        |
| SVG (.svg)         | Gráficos vetoriais escaláveis sem perda de qualidade. |
| WebP (.webp)       | Formato moderno, menor tamanho e alta qualidade.      |