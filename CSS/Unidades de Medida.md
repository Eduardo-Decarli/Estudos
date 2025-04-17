# O que são unidades de medida no CSS?

As unidades de medida no CSS determinam o tamanho e a proporção dos elementos em uma página web. Elas podem ser aplicadas a propriedades como width, height, margin, padding, font-size, entre outras.

## Tipos de Unidades de Medida

Podemos classificar as unidades de medida no CSS em duas categorias principais:

- **Unidades Absolutas:** Possuem um valor fixo e não mudam de tamanho com base no contexto. Exemplos: px, cm, mm, in, pt, pc

- **Unidades Relativas:** O tamanho é relativo a outro elemento, como o tamanho da fonte do elemento pai ou o tamanho da viewport. Exemplos: %, em, rem, vw, vh, vmin, vmax.

## Exemplos Práticos

Vamos ver um exemplo básico para entender a diferença entre unidades absolutas e relativas.

``` CSS

.container {
  width: 300px; /* Unidade absoluta */
  height: 50vh; /* Unidade relativa à altura da viewport */
  font-size: 2em; /* Unidade relativa ao tamanho da fonte do elemento pai */
  margin: 10%; /* Unidade relativa ao tamanho do elemento pai */
  padding: 1rem; /* Unidade relativa ao tamanho da fonte do elemento raiz */
}

```

- 300px → Um tamanho fixo de 300 pixels.

- 50vh → Ocupa 50% da altura da tela.

- 2em → O tamanho da fonte será 2 vezes o tamanho da fonte do pai.

- 10% → O espaçamento será 10% do tamanho do elemento pai.

- 1rem → O espaçamento será baseado na fonte do html.


# Unidades Absolutas

As unidades absolutas possuem um tamanho fixo e não variam com base no contexto ou no tamanho da tela. Isso significa que um valor definido com uma unidade absoluta sempre será o mesmo, independentemente do elemento pai ou do tamanho da viewport.

Se um elemento tiver width: 100px;, ele sempre terá 100 pixels de largura, independentemente do tamanho da tela ou da fonte.

| **Unidade** | **Nome**    | **Equivalência / Uso**                 |
|-------------|-------------|----------------------------------------|
| px          | Pixels      | Unidade mais usada para tamanhos fixos |
| cm          | Centímetros | Baseada em medidas físicas (impressão) |
| mm          | Milímetros  | Baseada em medidas físicas (impressão) |
| in          | Polegadas   | 1in = 2.54cm = 96px                    |
| pt          | Pontos      | 1pt = 1/72 de uma polegada             |
| pc          | Picas       | 1pc = 12pt                             |

- Píxel: O px (pixel) é a unidade absoluta mais usada no CSS. Indicado para telas, pois representa um ponto de exibição da tela. Não é recomendado para impressão, pois pode perder qualidade.

- Centímetros (cm) e Milímetros (mm): São medidas físicas reais, mais comuns para documentos impressos do que para telas. Indicado para impressões, pois mantém a escala exata. Pouco usado para telas, já que a exibição depende da densidade de pixels da tela.

- Polegadas (in): 1 polegada equivale a 2.54 cm ou 96 pixels em telas de densidade padrão. Muito usada para impressão.

- Pontos (pt) e Paicas (pc): O pt (ponto tipográfico) é uma unidade usada em tipografia impressa. 1 pt equivale a 1/72 de polegada. 1 pc (paica) equivale a 12pt. Mais usados para definir fontes em impressões.

# Unidades Relativas

Diferente das unidades absolutas, as unidades relativas se ajustam dinamicamente dependendo do contexto. Isso significa que o tamanho do elemento pode mudar com base em outro fator, como:
✅ O tamanho da fonte do elemento pai (em, rem)
✅ O tamanho da tela (vw, vh, vmin, vmax)
✅ O tamanho do elemento pai (%)

| **Unidade** | **Relativa a...**                  | **Uso Comum**              |
|-------------|------------------------------------|----------------------------|
| %           | O tamanho do elemento pai          | Largura e altura flexíveis |
| em          | O tamanho da fonte do elemento pai | Fontes e espaçamentos      |
| rem         | O tamanho da fonte do html         | Fontes consistentes        |
| vw          | A largura da viewport              | Layout responsivo          |
| vh          | A altura da viewport               | Layout responsivo          |
| vmin        | O menor lado da viewport           | Elementos responsivos      |
| vmax        | O maior lado da viewport           | Elementos responsivos      |

- Porcentagem (%): Relativa ao tamanho do elemento pai. Usado para tornar elementos flexíveis dentro do layout.

- em (relativo ao elemento pai): Relativa ao tamanho da fonte do elemento pai. Muito útil para definir tamanhos de fonte e espaçamentos de forma flexível.

- rem (relativo ao html): Relativa ao tamanho da fonte do elemento raiz (html). Garante consistência ao longo do site, pois sempre usa o tamanho base do html.

- vw(relativas à viewport): Relativa à largura da tela (1vw = 1% da largura)

- vh(relativas à viewport): Relativa à altura da tela (1vh = 1% da altura)

- vmin(relativas ao menor ou maior lado da viewport) → Baseia-se no menor lado da tela.

- vmax(relativas ao menor ou maior lado da viewport) → Baseia-se no maior lado da tela.