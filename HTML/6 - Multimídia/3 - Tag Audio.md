# Tag de Audio

Uma tag <audio> permite arquivos de áudio incorporar um audio na página HTML, configurar auto play , reprodução e muito mais.

Sua sintáxe básica é: 

``` HTML

<audio src="musica.mp3" controls></audio>

```

- src: Defina o caminho do arquivo de áudio.
- controls: Exibe os controles de reprodução (play, pause, volume, etc.).

## Atributos da tag <Audio>

Uma tag <audio>pode ter diversos atributos para personalizar a reprodução .

| **Atribuição** | **Descrição**                                      |
|----------------|----------------------------------------------------|
| controls       | Exibe os controles padrão de áudio.                |
| autoplay       | O áudio toca automaticamente ao carregar a página. |
| loop           | O áudio se repete indefinidamente.                 |
| muted          | Inicia o áudio sem som.                            |
| preload        | Controle como o áudio é carregado.                 |

## Formatos de áudio suportados

Nem todos os navegadores suportam todos os formatos de áudio. O ideal é usar pelo menos dois formatos para garantir compatibilidade.

| **Formato**        | **Compatibilidade**                     |
|--------------------|-----------------------------------------|
| MP3 (.mp3)         | Suportado pela maioria dos navegadores. |
| Arquivo OGG (.ogg) | Melhor qualidade, mas menos compatível. |
| Arquivo WAV (.wav) | Alta qualidade, mas arquivos grandes.   |
