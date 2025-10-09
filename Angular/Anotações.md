**Node.JS:** Node.js é um ambiente de execução JavaScript do lado do servidor. Ele permite rodar código JavaScript fora do navegador.  

**npm:** npm (Node Package Manager) é o gerenciador de pacotes que vem junto com o Node. Ele permite instalar bibliotecas, como o Angular CLI, com um único comando, muito similar ao Maven.

- Angular depende do Node e do npm para funcionar, pois utiliza pacotes do ecossistema Node.

**nvm:** O nvm (Node Version Manager) é um sistema que permite gerenciar versões do Node.JS, para que não seja necessário ficar desinstalando e instalando versões diferentes para gerenciar projetos em versões de uso diferentes.

``` bash

# Instala a versão 22 do Node.JS
nvm install 22

# Visualiza as versões que estão instaladas
nvm ls

# Realiza a troca de versão
nvm use 18

```

**Angular CLI:** O Angular CLI (Command Line Interface) é uma ferramenta oficial do Angular que roda no terminal e te ajuda a:

- Criar novos projetos Angular com uma estrutura padrão
- Gerar automaticamente arquivos de componentes, serviços, módulos, etc.
- Rodar o servidor de desenvolvimento com recarregamento automático
- Executar testes automatizados
- Criar builds otimizados para produção
- Fazer lint (verificação de código)
- Automatizar tarefas repetitivas do desenvolvimento

Para instalar o Angular CLI, você precisa digitar o seguinte comando no NPM

``` bash

# Instala o Angular CLI de forma global (-g)
npm install -g @angular/cli

# Verifica a versão do Angular CLI instalada
ng version

```

**Criando um projeto Angular:** Para criar-mos nosso primeiro projeto em Angular, vamos utilizar o Angular CLI que já foi instalado, podemos usar o comando:

``` bash

# Cria um projeto Angular
ng new nome-do-projeto --no-standalone

# Executa um projeto Angular
ng serve

# Gera um novo componente
ng generate component nome-do-componente

```

ng generate: O ng generate serve para gerar novas estruturas para o projeto, os tipos de estruturas são:

**Componente** -> ng g component meu-nome
**Serviços** -> ng g service meu-nome
**Classe** -> ng g class meu-nome
**Interface** -> ng g interface meu-nome

**CSS:** Linguagem de estilização da web

**SCSS:** Aperfeiçoamento do CSS puro, trazendo novas e melhores funcionalidades, como aninhamento de seletores, variáveis e mais...

**Livereload:** O Livereload é o servidor que dispõe os arquivos do Angular para o navegador, semelhante ao nginx ou tomcat, mas claro, com a finalidade de servir os arquivos do Angular.

**Componente:** Um componente é um encaixe dentro da tela, tudo que podemos separar em blocos dentro de um layout chamamos de componente, o angular trabalha com chamadas de componentes filhos para formar componentes pai (maiores e agrupados por outros componentes).

**Módulo:** No angular, podemos classificar e organizar componentes por módulos, dentro de cada módulo, encontramos os componentes específicamente organizados.

- Normalmente fazemos uma tela se tornar um módulo e dentro do módulo (tela) temos vários componentes organizados.

Declaração de Componente: No angular, ao criar um componente, usando o ``generate component``, será criado uma pasta referente ao respectivo componente, e lá estará os arquivos utilizados. O arquivo .ts do componente fará o gerenciamento de import e export, lá nós encontramos um **decorator** que terá os metadados do componente, e uma classe (a classe é onde encontramos os métodos e lógica do componente).

- A propriedade SELECTOR do componente é o nome de chamada dele, ou seja, para chamar um componente, utilizamos uma tag com o nome do selector

- Para um módulo identificar um componente, primeiro precisamos localziar o decorator @NgModule e declarar o componente lá.

Importação e Exportação de Componentes: No Angular, para utilizar um componente, logo após ele ser criado, precisamos referenciar a classe desse componente no seu respectivo módulo (dentro de um decorator **@NgModule**, na propriedade declarations).

- Um componente não pode ser referenciado em 2 ou mais módulos diferentes, isso dará um erro.

Importação e Exportação de Módulos: No angular, quando criamos um módulo e atribuimos componentes a esse módulo, podemos exportar o módulo e utilizar seus componentes em outros lugares. Para seus componentes serem exportados, realizamos isso através de 2 passos: 

1. primeiro precisamos importar o módulo 1 para dentro do módulo 2, através da propriedade **imports**.
2. voltando para o módulo 1, precisamos especificar os componentes que serão exportados, através de uma propriedade chamada **exports**, localizada dentro do @decorator. 

Agora com os componentes exportados e o módulo importado, podemos chamar suas tags dentro do HTML que necessita dos componentes importados.