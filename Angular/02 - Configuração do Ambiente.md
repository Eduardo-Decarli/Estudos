# Instalação do Node.js e npm

Antes de começar a programar com Angular, precisamos preparar o ambiente onde você vai criar, desenvolver, testar e rodar suas aplicações.
Este módulo vai te guiar passo a passo para configurar tudo corretamente, com foco em:

1. Instalar as ferramentas básicas (Node.js + npm)
2. Instalar o Angular CLI
3. Criar seu primeiro projeto Angular
4. Rodar a aplicação localmente no navegador
5. Entender a estrutura inicial do projeto gerado

### O que são Node.js e npm?
Node.js é um ambiente de execução JavaScript do lado do servidor. Ele permite rodar código JavaScript fora do navegador.  
npm (Node Package Manager) é o gerenciador de pacotes que vem junto com o Node. Ele permite instalar bibliotecas, como o Angular CLI, com um único comando, muito similar ao Maven.

Angular depende do Node e do npm para funcionar, pois utiliza pacotes do ecossistema Node.

## Como instalar o Node.js (e o npm automaticamente)

1. Vá até o site oficial: https://nodejs.org
2. Clique na versão LTS (Long Term Support) — é mais estável.
3. Baixe e execute o instalador.
4. Durante a instalação, deixe as opções padrão marcadas.
5. Finalize a instalação.

⚠️ O npm será instalado automaticamente junto com o Node.js.

Você pode verificar se a instalação funcionou corretamente utilizando as seguintes linhas de comando

``` bash

node -v // v20.14.0

npm -v // v10.7.0

```

# Instalando Angular CLI

O Angular CLI (Command Line Interface) é uma ferramenta oficial do Angular que roda no terminal e te ajuda a:

- Criar novos projetos Angular com uma estrutura padrão
- Gerar automaticamente arquivos de componentes, serviços, módulos, etc.
- Rodar o servidor de desenvolvimento com recarregamento automático
- Executar testes automatizados
- Criar builds otimizados para produção
- Fazer lint (verificação de código)
- Automatizar tarefas repetitivas do desenvolvimento

Para instalar o Angular CLI, você precisa digitar o seguinte comando no NPM

``` bash

npm install -g @angular/cli

```

- npm: Chama o gerenciador de pacotes
- install: declara que quer instalar um pacote
- -g: significa "global", ou seja, instala para o sistema todo
- @angular/cli: Nome do pacote oficial do Angular CLI

Após esse processo, você precisa verificar se houve tudo certo na instalação, podemos verificar a versão através do comando

``` bash

ng version

```

# Criando o primeiro projeto Angular com Angular CLI

# Estrutura de pastas e arquivos do projeto