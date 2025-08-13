# Componentes Básicos

Vamos mergulhar a fundo nos componentes básicos do PrimeFaces, que são essenciais para formular a interação entre o usuário e o sistema.

Neste tópico, abordaremos:
- <p:outputLabel> – rótulos descritivos
- <p:inputText> – entrada de dados em texto
- <p:commandButton> – envio de dados e interação com o backend

Vamos ver como cada um funciona, suas propriedades importantes, e também exemplos práticos com explicações linha a linha.

## p:outputLabel - Rótulo associad a um campo

Exibe um texto descritivo (label) associado a um campo de entrada.

``` XHTML

<p:outputLabel for="nome" value="Nome:" />

```

- ***for="nome"*:** associa este label ao campo com **id="nome"**
- ***value="Nome:"*:** define o texto que será exibido

🔗 Quando o usuário clica no rótulo, o foco vai para o campo associado

## p:inputText - Campo de texto simples

Permite que o usuário digite texto. Similar ao ***input type="text"*** do HTML, mas com recursos extras (validação, ajax, estilos etc.).

``` XHTML

<p:inputText id="nome" value="#{meuBean.nome}" placeholder="Digite seu nome completo" maxlength="50" required="true" />

```

- ***id="nome"*:** identificador do campo
- ***value="#{meuBean.nome}"*:** vincula o valor ao atributo nome do bean JSF

| Propriedade           | Função                        |
| --------------------- | ----------------------------- |
| `value`               | Bind com o bean               |
| `placeholder`         | Texto fantasma no campo       |
| `maxlength`           | Número máximo de caracteres   |
| `disabled="true"`     | Campo desativado              |
| `required="true"`     | Validação obrigatória         |
| `style`, `styleClass` | Estilização direta ou via CSS |

## p:commandButton - Botão com ação e suporte Ajax

É o botão que executa uma ação no backend quando clicado. Pode atualizar partes da página sem recarregar (AJAX).

``` xhtml

<p:commandButton value="Salvar" action="#{meuBean.salvar}" update="@form">

```

- ***value*:** texto exibido no botão
- ***action*:** método chamado no bean quando o botão é clicado
- ***update="@form"*:** indica que o formulário será atualizado via AJAX









Inputs: campos de texto, senha, checkbox, rádio, etc.

Botões e submissão de formulários