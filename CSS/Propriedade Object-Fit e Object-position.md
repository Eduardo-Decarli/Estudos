# Propriedade Object-fit

A propriedade object-fit define como uma imagem ou vídeo deve ser redimensionado para se ajustar ao seu contêiner

``` CSS

img {
    object-fit: valor;
}

```

Seu valor pode ser:

- fill (padrão): A imagem é esticada para preencher o contêiner, podendo distorcer.

- contain: A imagem é ajustada para caber dentro do contêiner sem cortar partes, mas pode deixar espaços vazios.

- cover: A imagem cobre todo o contêiner, cortando partes se necessário para evitar vazios.

- none: Mantém o tamanho original da imagem, sem ajustes.

- scale-down: Usa o menor tamanho possível entre none e contain.

``` HTML

<style>
    .box {
        width: 300px;
        height: 200px;
        border: 2px solid black;
    }
    
    .fill img {
        object-fit: fill;
    }
    
    .contain img {
        object-fit: contain;
    }
    
    .cover img {
        object-fit: cover;
    }
    
    .none img {
        object-fit: none;
    }
    
    .scale-down img {
        object-fit: scale-down;
    }
</style>

<div class="box fill">
    <img src="imagem.jpg" width="100%" height="100%">
</div>

<div class="box contain">
    <img src="imagem.jpg" width="100%" height="100%">
</div>

<div class="box cover">
    <img src="imagem.jpg" width="100%" height="100%">
</div>

<div class="box none">
    <img src="imagem.jpg" width="100%" height="100%">
</div>

<div class="box scale-down">
    <img src="imagem.jpg" width="100%" height="100%">
</div>

```

# Propriedade object-position

A propriedade object-position ajusta o alinhamento da imagem dentro do contêiner quando object-fit está configurado para contain ou cover.

``` CSS

img {
    object-position: x y;
}

```

Onde x e y definem a posição da imagem:

- **Valores podem ser:** left, right, top, bottom, center, porcentagens (0%, 50%, etc.), ou valores em px.

## Exemplo Prático

``` CSS

img {
    object-fit: cover;
    object-position: top left; /* A imagem se alinha ao canto superior esquerdo */
}

img {
    object-fit: cover;
    object-position: 50% 50%; /* A imagem se alinha ao centro */
}

```

