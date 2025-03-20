# Elementos de Formulários em HTML

Além dos campos de entrada (<input>), os formulários HTML possuem outros elementos importantes, como botões, áreas de texto, listas suspensas e muito mais. Vamos explorar cada um deles!

<button> - Botões em Formulários: O elemento <button> é usado para disparar ações, como enviar um formulário ou executar um script em JavaScript.

``` HTML

<form>
  <button type="submit">Enviar</button>
</form>

```

- type="submit" → Envia o formulário.

- type="reset" → Limpa todos os campos.

- type="button" → Apenas um botão normal (usado com JavaScript).

<textarea> - Áreas de Texto: O <textarea> permite a inserção de textos longos, diferentemente do <input type="text">.

``` HTML

<label for="mensagem">Mensagem:</label>
<textarea id="mensagem" name="mensagem" rows="5" cols="40" placeholder="Digite sua mensagem aqui"></textarea>

```

- rows → Número de linhas visíveis.

- cols → Número de colunas visíveis.

- placeholder → Texto de orientação antes da digitação.

- O <textarea> pode ser estilizado com CSS para ter largura e altura personalizadas.

<select> e <option> - Listas Suspensas: O <select> cria menus suspensos, permitindo que o usuário escolha entre várias opções.

``` HTML

<label for="cidade">Escolha uma cidade:</label>
<select id="cidade" name="cidade">
  <option value="sp">São Paulo</option>
  <option value="rj">Rio de Janeiro</option>
  <option value="mg">Minas Gerais</option>
</select>

```

- O usuário pode selecionar apenas uma opção.
- O value define o valor enviado ao servidor.

<fieldset> e <legend> - Agrupando Campos: O <fieldset> agrupa elementos do formulário, e <legend> adiciona um título para o grupo.

``` HTML

<fieldset>
  <legend>Informações Pessoais</legend>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome">
  
  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email">
</fieldset>

```

- Facilita a organização e melhora a acessibilidade

<label> - Associando Rótulos aos Campos: O <label> melhora a usabilidade ao associar um texto descritivo a um campo.

``` HTML

<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome">

```

- O for="id_do_campo" conecta o <label> ao <input>, permitindo que o usuário clique no rótulo para focar o campo.