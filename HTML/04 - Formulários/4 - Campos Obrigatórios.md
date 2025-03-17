# Campos Obrigatórios em Formulários HTML

Garantir que o usuário preencha corretamente os formulários é essencial para evitar erros e melhorar a experiência. Para isso, o HTML oferece atributos como **required**, **placeholder**, **maxlength**, **pattern**, entre outros.

Vamos explorar cada um desses atributos em detalhes!

## required - Campo obrigatório

O atributo required torna um campo obrigatório, impedindo o envio do formulário até que ele seja preenchido.

``` HTML

<form>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" required>
  
  <button type="submit">Enviar</button>
</form>

```

Se o usuário tentar enviar sem preencher, o navegador exibirá uma mensagem de erro.

## placeholder - Texto de orientação

O atributo placeholder exibe um texto dentro do campo antes de o usuário digitar algo, ajudando a entender o que precisa ser preenchido.

``` HTML

<input type="email" placeholder="Digite seu e-mail">

```

Assim que o usuário começa a digitar, o texto do placeholder desaparece. Imporante lembrar que o placeholder não substitui um <label>, pois ele some quando o usuário começa a digitar, o que pode confundir algumas pessoas.

## maxlength - Limitando o Número Máximo de Caracteres

O atributo maxlength define um limite máximo de caracteres que o usuário pode digitar em um campo de entrada. Ele é útil para evitar textos muito longos e garantir um formato específico de entrada.

``` HTML

<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome" maxlength="20" placeholder="Máximo 20 caracteres">

```

Aqui o usuário não poderá digitar mais de 20 caracteres.  Importante: O maxlength não impede que o usuário cole um texto maior. No entanto, os navegadores modernos ainda respeitam esse limite.

## maxlength com textarea

Por padrão, <textarea> permite textos longos, mas podemos limitá-los com maxlength.

``` HTML

<label for="comentario">Comentário:</label>
<textarea id="comentario" name="comentario" maxlength="200" placeholder="Máximo 200 caracteres"></textarea>

```

Após 200 caracteres, o usuário não poderá digitar mais. Para mostrar quantos caracteres ainda podem ser digitados, podemos usar JavaScript (veremos isso mais adiante).

## pattern - Criando Validações Personalizadas com Expressões Regulares

O atributo pattern permite validar o conteúdo de um campo de entrada utilizando expressões regulares (Regex). Isso é útil para garantir que o usuário insira dados no formato correto, como CPF, telefone, senhas seguras, etc.

``` HTML

<!-- Apenas Letras (Nome) -->

<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome" pattern="[A-Za-zÀ-ÿ\s]+" title="Apenas letras são permitidas">

<!-- Apenas Numeros (CPF) -->

<label for="cpf">CPF (somente números):</label>
<input type="text" id="cpf" name="cpf" pattern="\d{11}" title="Digite exatamente 11 números">

<!-- Formato para Telefone -->

<label for="telefone">Telefone:</label>
<input type="tel" id="telefone" name="telefone" pattern="\(\d{2}\) \d{5}-\d{4}" placeholder="(99) 99999-9999" title="Digite no formato (XX) XXXXX-XXXX">

<!-- Validação de caracteres para senha -->

<label for="senha">Senha:</label>
<input type="password" id="senha" name="senha" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número">

<!-- Validação de Email -->

<label for="email">E-mail:</label>
<input type="email" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Digite um e-mail válido">

```

- Se o usuário digitar algo fora do padrão, o formulário não será enviado.

- O atributo title exibe uma dica quando o usuário erra o formato.

## min e max - Restringindo Valores em Campos Numéricos e de Data

Os atributos min e max são usados para definir limites mínimos e máximos para campos numéricos e de data. Isso garante que o usuário insira um valor dentro de um intervalo permitido.

Se queremos restringir a idade entre 18 e 60 anos, usamos:

``` HTML

<label for="idade">Idade:</label>
<input type="number" id="idade" name="idade" min="18" max="60" required>

```

- O usuário não pode inserir um número menor que 18 ou maior que 60.

- Navegadores modernos bloqueiam valores inválidos no botão de incremento/decremento.

Agora o min e max em Campos de Data (date), Podemos restringir o intervalo de datas, por exemplo, para permitir apenas nascimentos entre 1900 e 2024:

``` HTML

<label for="nascimento">Data de Nascimento:</label>
<input type="date" id="nascimento" name="nascimento" min="1900-01-01" max="2024-12-31" required>

```

- O usuário só pode escolher datas dentro desse intervalo.

- O formato YYYY-MM-DD é padrão no HTML5.

Agora para min e max em Campos de Tempo (time), Se queremos limitar o horário de funcionamento de um sistema para entre 08:00 e 18:00, usamos:

``` HTML

<label for="horario">Escolha um horário:</label>
<input type="time" id="horario" name="horario" min="08:00" max="18:00" required>

```

- O usuário só pode selecionar horários entre 08:00 e 18:00.

