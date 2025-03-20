# A tag <form>

A tag <form> é usada para criar formulários em HTML. Um formulário é uma seção de um documento que contém controles interativos que permitem aos usuários enviar dados para um servidor.

``` HTML

    <form name="signup" autocomplete="on" onsubmit="alert('Enviei um formulário')" target="_blank" method="post" action="https://meusite.com.br/singup">
        Nome: <input type="text" name="nome" id="nome"> <br>
        Idade: <input type="number" name="idade" id="idade"> <br>
        Password <input type= "password" name="password" id="password"> <br>
        <button type="submit">Enviar</button>
    </form>

```

- **<form>:** A tag que define o início de um formulário HTML.

- **name="signup":** Define um nome para o formulário, que pode ser usado para referenciá-lo em scripts JavaScript.

- **autocomplete="on":** Indica que o navegador deve sugerir e completar automaticamente os valores dos campos do formulário com base em entradas anteriores do usuário.

- **onsubmit="alert('Enviei um formulário')":** Um manipulador de eventos que executa um script JavaScript quando o formulário é enviado. Neste caso, exibe um alerta com a mensagem "Enviei um formulário".

- **target="_blank":** Especifica que a resposta do servidor deve ser aberta em uma nova aba ou janela do navegador.

- **method="post":** Define o método HTTP usado para enviar os dados do formulário ao servidor. O método POST envia os dados no corpo da solicitação, o que é mais seguro para informações sensíveis.

- **action="https://meusite.com.br/signup":** Especifica a URL para a qual os dados do formulário serão enviados quando o formulário for submetido,  Se o atributo action for omitido, os dados serão enviados para a mesma URL da página atual..

- **<button type="submit">Enviar</button>:** Um botão que, quando clicado, envia o formulário. O tipo submit indica que o botão deve submeter o formulário.