# Imagens em HTML (<img>)

As imagens são um dos principais elementos visuais em uma página web. Em HTML, usamos a tag <img> para exibir imagens. Vamos explorar os conceitos fundamentais, atributos importantes e boas práticas.

## Estrutura básica da tag <img>

Diferente de <a>, <p> e <h1>, a tag <img> é autofechante (self-closing tag), ou seja, não possui uma tag de fechamento (</img>).

``` HTML

<img src="imagem.jpg" alt="Descrição da imagem">

```

- **src="imagem.jpg"** → Define o caminho da imagem.
- **alt="Descrição da imagem"** → Texto alternativo exibido caso a imagem não carregue.

## Caminhos para Imagens (src)

O atributo src define de onde a imagem será carregada. Pode ser um caminho relativo ou absoluto

``` HTML

<!-- Usando o Caminho Relativo -->

<img src="imagens/foto.jpg" alt="Minha foto">

<!-- Usando o Caminho Absoluto -->

<img src="https://www.exemplo.com/imagem.jpg" alt="Imagem da internet">

```

- Caminho Relativo -> A imagem está dentro da pasta imagens no mesmo diretório do arquivo HTML.

- Caminho Absoluto -> A imagem será carregada de um servidor externo.

## Largura e Altura (width e height)

Podemos definir o tamanho da imagem manualmente usando os atributos width e height.

``` HTML

<!-- Usando Propriedade -->

<img src="imagem.jpg" width="300" height="200" alt="Imagem redimensionada">

<!-- Usando CSS -->

 <img src="imagem.jpg" class="ajuste">
<style>
  .ajuste {
    width: 100%; /* Ajusta a largura automaticamente */
    max-width: 500px; /* Máximo de 500px */
    height: auto; /* Mantém a proporção */
  }
</style>

```

## Texto alternativo (alt) e acessibilidade

O atributo alt é essencial para:
- Acessibilidade (leitores de tela para deficientes visuais).
- SEO (Motores de busca consideram o alt).
- Exibição de texto caso a imagem não carregue.

``` HTML

<img src="foto.jpg" alt="Foto de uma paisagem ao pôr do sol">

```

## Imagens como Links

Podemos transformar imagens em links usando <a>.

``` HTML

<a href="https://www.exemplo.com">
  <img src="logo.png" alt="Clique para acessar">
</a>

```

Quando clicado, o usuário será redirecionado ao site indicado no href.

## Imagens Responsivas

Para tornar uma imagem adaptável a diferentes telas, usamos CSS.

``` HTML

<img src="imagem.jpg" class="responsiva">
<style>
  .responsiva {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
</style>

```

Isso permite que a imagem se ajuste ao tamanho do dispositivo. Outra opção moderna é usar a tag <picture> para carregar imagens diferentes dependendo do tamanho da tela.

## Formatos de Imagens mais Comuns

| **Formato** | **Vantagens**                               | **Quando usar?**                    |
|-------------|---------------------------------------------|-------------------------------------|
| JPG (JPEG)  | Boa compactação, suporta muitas cores       | Fotos, imagens com gradientes       |
| PNG         | Suporta transparência, qualidade alta       | Logos, ícones, imagens sem fundo    |
| GIF         | Suporta animações, baixa qualidade          | Pequenas animações e ícones simples |
| SVG         | Vetorial, escalável sem perder qualidade    | Logos, ícones, gráficos vetoriais   |
| WEBP        | Melhor compressão, transparência e animação | Alternativa moderna ao JPG e PNG    |

## Carregamento de Imagens sob demanda (Lazy Loading)

Para melhorar o desempenho da página, podemos carregar imagens somente quando forem vistas pelo usuário.  Isso reduz o consumo de banda e acelera o carregamento da página.

``` HTML

<img src="foto.jpg" loading="lazy" alt="Imagem carregada sob demanda">

```

