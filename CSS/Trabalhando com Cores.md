# Cores no CSS

Trabalhar com cores no CSS é essencial para criar interfaces visualmente atraentes e acessíveis. Vamos dividir esse estudo em partes para que fique bem detalhado:

## Como Definir Cores no CSS

No CSS, podemos definir cores de várias maneiras seguindo a convenção Palavras-chave (color names).

- Hexadecimal (#rrggbb)

- RGB (rgb(r, g, b))

- RGBA (rgba(r, g, b, a))

- HSL (hsl(h, s%, l%))

- HSLA (hsla(h, s%, l%, a))

Vamos explorar cada uma dessas opções com exemplos práticos.

## Palavras-chave de Cores

O CSS possui palavras-chave que representam cores comuns, como:

``` CSS

p {
    color: red;   /* Vermelho */
    color: blue;  /* Azul */
    color: green; /* Verde */
    color: black; /* Preto */
    color: white; /* Branco */
}

```

✅ Vantagem: Fácil de usar e entender.
❌ Desvantagem: Poucas opções de personalização.

## Código Hexadecimal (#rrggbb)

O formato hexadecimal é o mais usado e define cores combinando vermelho (R), verde (G) e azul (B).

``` CSS

h1 {
    color: #ff0000; /* Vermelho puro */
    color: #00ff00; /* Verde puro */
    color: #0000ff; /* Azul puro */
    color: #000000; /* Preto */
    color: #ffffff; /* Branco */
}

```

💡 Dica: Podemos usar a forma curta, quando os valores forem repetidos.
Exemplo: #ff0000 (vermelho) pode ser escrito como #f00.

## RGB (rgb(r, g, b))

Aqui, cada cor é definida por um número de 0 a 255.

``` CSS

div {
    background-color: rgb(255, 0, 0); /* Vermelho */
    background-color: rgb(0, 255, 0); /* Verde */
    background-color: rgb(0, 0, 255); /* Azul */
}

```

✅ Vantagem: Mais intuitivo para ajustes finos.
❌ Desvantagem: Pode ser difícil lembrar combinações específicas.

## RGBA (rgba(r, g, b, a))

É a mesma ideia do rgb, mas com um quarto valor (a), que define transparência (opacidade), variando de 0 (transparente) a 1 (opaco).

``` CSS

div {
    background-color: rgba(255, 0, 0, 0.5); /* Vermelho semi-transparente */
}

```

## HSL (hsl(h, s%, l%))

O HSL usa três valores:

**H (Hue - Matiz):** de 0 a 360 (cor na roda de cores)

**S (Saturation - Saturação):** de 0% (sem cor) a 100% (cor vibrante)

**L (Lightness - Luminosidade):** de 0% (preto) a 100% (branco)

``` CSS

p {
    color: hsl(0, 100%, 50%);   /* Vermelho */
    color: hsl(240, 100%, 50%); /* Azul */
}

```

## HSLA (hsla(h, s%, l%, a))

Adiciona a transparência ao HSL.

``` CSS

p {
    color: hsla(0, 100%, 50%, 0.5); /* Vermelho meio transparente */
}

```

# Cores no Background e Bordas

Podemos aplicar cores também ao fundo e às bordas dos elementos:

``` CSS

.box {
    background-color: lightblue;
    border: 3px solid #ff4500;
}

```

# Degradês (Gradientes)

Os gradientes são usados para criar efeitos de transição suave entre cores.

``` CSS

.gradient {
    background: linear-gradient(to right, red, blue);
}

```

Direções possíveis:

- to right (da esquerda para direita)
- to left (da direita para esquerda)
- to top (de baixo para cima)
- to bottom (de cima para baixo)

## Gradiente Radial

``` CSS

.radial-gradient {
    background: radial-gradient(circle, red, blue);
}

```