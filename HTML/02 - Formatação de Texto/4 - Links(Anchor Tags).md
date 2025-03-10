# Links em HTML (<a> - Anchor Tags)

Os links são fundamentais em qualquer site, permitindo a navegação entre páginas e até mesmo documentos e seções dentro de uma mesma página. Em HTML, usamos a tag <a> (de anchor, âncora) para criar links. Vamos explorar o assunto de forma detalhada e prática.

A tag <a> é usada para criar um link, e o atributo href (hypertext reference) define o destino do link.

``` HTML

<a href="https://www.google.com">Acesse o Google</a>

```

- Esse código cria um link que, ao ser clicado, leva o usuário para o site do Google. O atributo href="URL" define para onde o link leva e o texto dentro da tag <a> ("Acesse o Google") será clicável.

## Abrindo o Link em uma nova aba (Target e rel)

Por padrão, os links abrem na mesma aba do navegador. Para abrir um link em uma nova aba, usamos o atributo **target="_blank"**.

``` HTML

<a href="https://www.google.com" target="_blank">Abrir Google em nova aba</a>

```

- Isso faz com que o link seja aberto em uma nova aba

Sempre que usar **target="_blank"**, é recomendável adicionar **rel="noopener noreferrer"** para evitar problemas de segurança e desempenho.

``` HTML

<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
  Abrir Google em nova aba com segurança
</a>

```

## Links Internos (Navegação dentro do Site)

Os links internos levam o usuário para outras páginas dentro do mesmo site.

``` HTML

<a href="sobre.html">Sobre nós</a>

```

Aqui, estamos criando um link para a página sobre.html dentro do mesmo diretório. Podemos fazer uso de caminhos relativos e absolutos para ele identificar o conteudo.

- **Relativo: href="sobre.html"** → Acessa um arquivo na mesma pasta.

- **Absoluto: href="https://meusite.com/sobre.html"** → Caminho completo, útil para sites externos.


## Links para seções dentro da mesma página (Âncoras)

Podemos criar links que levam o usuário para uma parte específica da mesma página. para isso devemos criar um link para um ID específico e depois criar uma seção correspondente.

``` HTML

<a href="#contato">Ir para a seção de Contato</a>

<h2 id="contato">Seção de Contato</h2>
<p>Aqui estão nossas informações de contato...</p>


```

- O **#contato** indica que queremos navegar até o elemento com o ID contato.

- O link <a href="#contato"> leva o usuário até o elemento <h2 id="contato">.

- Isso cria uma navegação fluida dentro da página.

## Criando um Link para enviar um e-mails (mailto:) e telefonar (tel:)

Podemos usar links para abrir um cliente de e-mail ou realizar chamadas telefônicas em dispositivos móveis.

``` HTML

<a href="mailto:contato@meusite.com">Enviar e-mail</a>

<a href="tel:+5511999999999">Ligar para nós</a>

```

- Quando o usuário clica, seu cliente de e-mail abre com um novo e-mail para "contato@meusite.com".

- Em dispositivos móveis, o link de telefone inicia uma chamada telefônica.