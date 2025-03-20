# Tag video em HTML

A tag <video>permite adicionar vídeos a uma página web sem precisar de plugins externos (como Flash). Ela suporta diversos formatos , oferece controles de reprodução e permite customizações via atributos e CSS

Sintáxe básica:

``` HTML

<video src="video.mp4" controls></video>

```

- src: Defina o caminho do vídeo.
- controls: Exibe os botões de play, pause, volume e tela cheia .

## Formatos Suportados

Os navegadores suportam diferentes formatos de vídeo. O ideal é usar mais de um formato para garantir compatibilidade.

| **Formato**  | **Compatibilidade**                          |
|--------------|----------------------------------------------|
| MP4 (.mp4)   | Melhor compatibilidade e eficiência.         |
| WebM (.webm) | Qualidade alta e tamanho reduzido.           |
| Ogg (.ogv)   | Boa qualidade, mas compatibilidade limitada. |

## Atributos da tag <video>

| **Atribuição** | **Descrição**                                      |
|----------------|----------------------------------------------------|
| controls       | Exiba os controles padrão de vídeo.                |
| autoplay       | O vídeo toca automaticamente ao carregar a página. |
| loop           | O vídeo se repete infinitamente.                   |
| muted          | Inicia o vídeo sem som.                            |
| poster         | Exibe uma imagem antes do vídeo começar.           |
| preload        | Controle como o vídeo é carregado.                 |
