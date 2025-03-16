# Formulários em HTML - Tipos de <input>

Os formulários são essenciais para interações com usuários, permitindo a coleta de dados como textos, senhas, datas, números e muito mais.

O elemento <input> é a principal tag usada dentro de <form>, e ele pode assumir diferentes tipos de entrada de dados através do atributo type. Vamos explorar os tipos mais usados!

- **text - Entrada de Dados:** Usado para inserir textos curtos, como nome e sobrenome.

``` HTML

<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome" placeholder="Digite seu nome">

```

- **password - Senha:** Oculta os caracteres digitados, útil para senhas.

``` HTML

<label for="senha">Senha:</label>
<input type="password" id="senha" name="senha">

```

- **email - Endereço de e-mail:** Valida automaticamente o formato do e-mail.

``` HTML

<label for="email">E-mail:</label>
<input type="email" id="email" name="email" required>

```

- **number - Números:** Aceita apenas números, permitindo definir limites.

``` HTML

<label for="idade">Idade:</label>
<input type="number" id="idade" name="idade" min="1" max="100">

```

- **date - Data:** Exibe um seletor de data no navegador

``` HTML
<label for="nascimento">Data de Nascimento:</label>
<input type="date" id="nascimento" name="nascimento">

```

- **checkbox - Seleção múltipla:** Permite marcar várias opções ao mesmo tempo

``` HTML

<label>Quais idiomas você fala?</label><br>
<input type="checkbox" id="ingles" name="idiomas" value="ingles">
<label for="ingles">Inglês</label>

<input type="checkbox" id="espanhol" name="idiomas" value="espanhol">
<label for="espanhol">Espanhol</label>

```

- **radio - Escolha única:** Permite que o usuário selecione apenas uma opção.

``` HTML

<label>Escolha seu gênero:</label><br>
<input type="radio" id="masculino" name="genero" value="masculino">
<label for="masculino">Masculino</label>

<input type="radio" id="feminino" name="genero" value="feminino">
<label for="feminino">Feminino</label>

```

- **tel - Número de telefone:** Garante um formato válido para telefones, exibindo um teclado numérico em celulares.

``` HTML

<label for="telefone">Telefone:</label>
<input type="tel" id="telefone" name="telefone" pattern="[0-9]{10}" placeholder="Digite seu telefone">

```

- **file - Upload de arquivos:** Permite que o usuário envie arquivos (imagens, documentos, etc.).

``` HTML

<label for="arquivo">Selecione um arquivo:</label>
<input type="file" id="arquivo" name="arquivo">

```

- **color - Seletor de cores:** Exibe uma paleta de cores para o usuário escolher.

``` HTML

<label for="cor">Escolha uma cor:</label>
<input type="color" id="cor" name="cor">

```

- **range - Controle deslizante:** Cria um controle deslizante para selecionar valores numéricos.

``` HTML

<label for="volume">Volume:</label>
<input type="range" id="volume" name="volume" min="0" max="100" step="10">

```

- **submit - Enviar o formulário:** Envia os dados do formulário para o servidor.

``` HTML

<button type="submit">Enviar</button>

```

- **reset - Limpar os Campos:** Restaura os valores iniciais do formulário.

``` HTML

<button type="reset">Limpar</button>

```