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

Template: Conteudo HTML dentro do arquivo .html na pasta do componente.

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

**Data-biding:** É o termo dado para referenciar a sincronia entre variáveis da tela e da lógica, ela pode ser dividida em Interpolation, React databiding, Propery Databiding e two-way Databiding.

**Interpolation:** É a sincronia de dados de variáveis entre a view e a lógica para expressar algo na tela, podemos passar as variáveis ou funções que irão realizar o comportamento da view sem necessariamente chamar os elementos HTML, esse processo é feito através das **{{nome-da-variavel}}**.

- Na interpolação, se uma variável de tela retornar um valor undefined, o Angular não irá imprimir nada na tela (Dificil de debugar). Se utilizarmos um optional change, ele ainda não mostrará os valores undefined, mas irá reservar espaço na tela e não irá quebrar completamente o comportamento gráfico.  Optional Change -> **{{nome-da-variavel?}}**, ou também podemos definir um comparador ternário para validar.

**Template dentro do Componente:** Ao criar um novo componente, definimos nosso template como nosso arquivo HTML dentro da pasta do componente, mas podemos inserir ele diretamente no arquivo.ts caso seja curto ou conveniente, para fazer isso, utilizamos a propriedade template? (Irá substituir a propriedade templateUrl?) dentro de @Component e passar uma String contendo o conteudo HTML.

``` typescript

@Component({
  selector: 'app-card-button-roxo',
  standalone: false,
  // templateUrl: './card-button-roxo.html', // Deixa de utilizar esse caminho para usar um template inline
  template: `
    <button class="card-button-roxo">Clique Aqui</button>
  `,
  styleUrl: './card-button-roxo.scss'
})
export class CardButtonRoxo {

}

```

**Estilização dentro do Componente:** Para o CSS, podemos ter um comportamento similar, em vez de referenciar uma localização de página de estilização, podemos usar a propriedade styles? e inserir uma string com o CSS requisitado.

- Podemos definir uma tag style dentro do template HTML para utilizar CSS inline

Importações de CSS: Utilizando o **@use** ou **@forward** dentro de um arquivo **CSS** ou **SCSS**, podemos passar um caminho para esse import, e o angular poderá identificar que os arquivos estão conectados, dessa forma podemos ter 2 arquivos dinâmicos, onde em um nós criamos variáveis CSS/SCSS e outro podemos utilizar essas variáveis.

- Para não precisar especificar sempre um caminho relativo ou absoluto, podemos especificar para o Angular sempre olhar para uma pasta específica para buscar os arquivos de estilizações, ai precisamos apenas especificar o nome do arquivo, para fazer isso, precisamos declarar no nosso arquivo angular.json

``` JSON

"projects": {
    "curso-angular": {
        "architect": {
            "build": {
                "stylePreprocessorOptions": {
                    "includePaths": [
                        "src/styles" // Aqui especificamos a localização da pasta geral de CSS/SCSS
                    ]
                }
            }
        }
    }
}

```

**::ng-deep:** O angular possui um comportamento de isolamento de componentes, ou seja, alterações feitas no CSS de um componente se tornam inalteráveis fora do componente (mesmo se chamarmos em um componente pai, não é possível alterar o CSS dos componentes filhos), utilizando o seletor ng-deep e o nome da classe/id do componente filho, é possível alterar as propriedades dentro da classe CSS do componente pai.

``` HTML

<div class="card">
    <div class="card__plan card__item">Plano, <b>{{plano.tipo}}</b></div>
    <div class="card__price card__item">{{plano.getFullPrice(plano.preco)}}</div>
    <app-card-button></app-card-button>
    <app-button-cancel id="cancel-button-red"></app-button-cancel>
</div>

```

``` CSS 

::ng-deep #cancel-button-red .card-button-cancel {
    background-color: yellow !important;
}

```

- Nesse exemplo, temos um trecho do arquivo CSS de um componente pai, e dentro dele, fazemos o ng-deep em uma classe de um componente filho para poder realizar as alterações. Se caso ocultarmos o id no seletor CSS, o ng-deep conseguiria perfurar essa proteção de isolamento em nível macro, dessa forma, todos os .card-button-cancel seriam alterados na página, sem conseguir separar qual especificamente.
