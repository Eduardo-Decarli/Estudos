# O que é NPM?

O **NPM (Node Package Manager)** é o gerenciador de pacotes padrão do Node.js. Ele é usado para:

- Baixar bibliotecas e ferramentas reutilizáveis (como express, lodash, react, etc).
- Gerenciar dependências de projetos **Node.js** (incluindo front-end e back-end).
- Compartilhar pacotes (criar e publicar os seus).
- Automatizar scripts e tarefas.

📌 NPM já vem instalado com o Node.js. Para verificar:

``` bash

node -v
npm -v

```

# Criando um Projeto com NPM

1. Criar a pasta do projeto

``` bash

mkdir meu-projeto
cd meu-projeto

```

2. Inicializar o projeto com NPM e criar o arquivo package.json, que guarda todas as configurações do projeto e suas dependências.

``` bash

npm init # Ele vai fazer perguntas (nome do projeto, versão, etc).

npm init -y # Pula o processo de perguntas pelo terminal (pode alterar as configurações do projeto pelo arquivo package.json)

```

## Instalando Pacotes

1. Instalar pacotes para produção

``` bash

npm install express

```

Isso adiciona o pacote express à seção "dependencies" do package.json.

2. Instalar pacotes como dependência de desenvolvimento (Vai para a seção "devDependencies").

``` bash

npm install nodemon --save-dev

```

## Removendo e Atualizando Pacotes

- **Remover**

``` bash

npm uninstall nome-do-pacote

```

- **Atualizar**

``` bash

npm update nome-do-pacote

```

# Estrutura dos Arquivos Criados

- **package.json:** metadados do projeto.
- **package-lock.json:** trava as versões exatas instaladas.
- **node_modules/:** onde os pacotes são fisicamente instalados.

⚠️ Nunca suba node_modules/ para o Git. Use .gitignore.

# Global vs Local

Local: Pacotes são instalados no projeto (em node_modules)

``` bash

npm install typescript

```

Global: Disponível em qualquer terminal (adequado para ferramentas de CLI, como nodemon, typescript, eslint)

``` bash

npm install -g typescript

```

# Ver Dependências Instaladas

Para listar as dependências instaladas, podemos usar 2 comandos diferentes:

``` bash

npm list --depth=0 # Para as dependências locais

npm list -g --depth=0 # Para dependências globais

```

