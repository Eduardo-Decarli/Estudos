# Sumário

[Instalando o Angular CLI](#instalação-do-angular)   
[Conceitos Importantes do Angular](#conceitos-importantes-do-angular)   
[Anatomia de um Componente](#componentes)   
[Estilizando com o Angular](#estilização-com-angular)   
[Angular Material](#angular-material)   
[Data Binding](#data-binding)  
[Comunicação Entre Componentes (Input and Output)](#comunicação-entre-componentes)  
[Ciclo de vida do Componente](#ciclo-de-vida-do-componente)  
[Encapsulamento de Estilos](#encapsulamento-de-estilos)  

[Diretivas](#diretivas)  
  - [Diretivas de Atributos](#diretivas-de-atributo)  
  - [Diretivas Estruturais](#diretivas-estruturais)  
  - [Diretivas Personalizadas](#diretivas-personalizadas)   
  
[Pipes](#pipes)  
[Template Variables](#template-variables)  
[Acesso de Componentes Filhos](#acesso-de-componentes-filhos)
[Roteamento Estático](#roteamento-estático)   
[Roteamento Dinâmico](#roteamento-dinâmico)
[Requisições HTTP](#requisições-http)
[Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Instalação do Angular

**Node.JS:** Node.js é um ambiente de execução JavaScript do lado do servidor. Permitindo que o JS, que é uma linguagem interpretada pelo navegador, também seja interpretada por um motor que é o NodeJS, permitindo assim rodar código JavaScript fora do navegador.  

**Gerenciador de Pacotes do Node (NPM):** O npm (Node Package Manager) é o gerenciador de pacotes que vem junto com o Node. Ele permite instalar bibliotecas, como o **Angular CLI**, com um único comando, muito similar ao Maven.

- Angular depende do Node e do NPM para funcionar, pois utiliza pacotes do ecossistema Node.

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
- Gerar automaticamente arquivos/estruturas de **componentes**, **serviços**, **módulos**, etc.
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

# Irá imprimir as alterações que o generate component fará, mas sem realiza-las
ng generate component nome-do-componente --dry-run

# Irá imprimir as alterações que o generate component fará, mas sem realiza-las
ng generate component nome-do-componente --dry-run

```

**ng generate:** O ng generate serve para gerar novas estruturas para o projeto, os tipos de estruturas são:

- **Componente** -> ng g component meu-nome
- **Serviços** -> ng g service meu-nome
- **Classe** -> ng g class meu-nome
- **Interface** -> ng g interface meu-nome

---

## Conceitos Importantes do Angular

**HTML:** O HTML é uma linguagem de marcação de texto que a web utiliza para indexar informações.

**CSS:** Linguagem de estilização da web, significa cascade style sheet

**SCSS:** Aperfeiçoamento do CSS puro, trazendo novas e melhores funcionalidades, como aninhamento de seletores, variáveis e mais... É apenas disponiveis para projetos NodeJS, pois no final do projeto, para subir em produção, o SCSS é convertido para CSS automaticamente.

**JavaScript:** Para estudar Angular, é muito importante ter uma boa base de JS, pois como vimos até agora, ele será interpretado pelo NodeJS.

**TypeScrpt:** Além de ter noções de **JavaScript**, o Angular normalmente é programado em **TypeScript**, que é um **superset** do JS que permite a tipagem e restrições de código.

**Livereload:** O Livereload é o servidor que dispõe os arquivos do Angular para o navegador, semelhante ao **nginx** ou **tomcat**, mas claro, com a finalidade de servir os arquivos do Angular.

**Componente:** Um componente é um encaixe dentro da tela, tudo que podemos separar em blocos dentro de um layout chamamos de componente, o angular trabalha com chamadas de componentes filhos para formar componentes pai (maiores e agrupados por outros componentes), em geral, também podemos dizer que um componente é um bloco que é possível ser reaproveitado em diferentes lugares do código sem a necessidade de reescrita. Um componente pode ser gerado via Angular CLI e possui uma estrutura onde contém:

- um template HTML
- um arquivo CSS 
- uma classe TypeScript.

**Template:** Dentro de um **Componente**, podemos encontrar um template, que seria um arquivo HTML que representará a estrutura do componente, será localizado dentro do arquivo .html na pasta do componente. A classe do componente irá informar para o **core** do angular que deverá utilizar um arquivo HTML específico (template) para reenderizar.

**Data Binding:** O Data Binding é um mecanismo do próprio Angular que permite realizar sincronia automática de dados entre o **template** (view) e a **classe** (modelo). Existem 4 tipos de Data Binding que será visto mais a frente, mas previamente podemos chamar eles de Interpolação, Event Binding, Property Binding e Two-Way Data Binding.

**Diretivas:** As diretivas no Angular são ferramentas que permitem a manipulação do template ou a transformação do DOM de forma dinâmica, existem dois tipos de diretivas:

- **Diretivas Estruturais:** Tais como ***ngIf**, ***ngFor**.
- **Diretivas de Atributo:** São as ***ngClass***, ***ngStyle***, ***ngModel***, ***ngTemplate*** e ***ngContent***.

**Serviços e Injeção de Dependência(DI):** Os serviços são classes separadas que servem exclusivamente para compartilhar lógica, dados e funcionalidades entre diferentes componentes. Por exemplo, requisições HTTP feitas por um serviço, podem ser utilizadas por diferentes componentes que necessitem das mesmas requisições. A injeção de dependência é a forma como o Angular gerencia a instanciação das classes de serviços.

**Roteamento:** O roteamento no Angular é uma ferramenta extremamente útil quando estamos lidando com SPA, ele permite mudarmos rotas de acesso, alterar o estado da página, renderizando apenas os componentes específicos que queremos e tudo isso de forma dinâmica e única na tela, onde não será necessariamente recarregada a página e sim trocada as informações por baixo dos panos.

**Gerenciamento de Estado (RxJS):** O Angular faz uso da biblioteca RxJS para gerenciar eventos assincronos, permitindo um desenvolvimento reativo através do Desing Pattern **Observable**. Permite que o código entenda estados e identifique suas mudanças, permitindo um desenvolvimento não tão linear e sim reativo as alterações do usuário.

**Módulo:** No angular, podemos classificar e organizar componentes por módulos, dentro de cada módulo, encontramos os componentes específicamente organizados. Normalmente fazemos uma tela se tornar um módulo e dentro do módulo (tela) temos vários componentes organizados.

---   

## Componentes

Para indicar ao Angular um novo componente, utilizamos um decorator dentro da classe TS do componente. Dentro do Decoretor **@Component**, podemos definir um objeto anônimo que pode receber diversos parâmetros de configuração, os mais comuns e importantes são os seguintes: 

- **selector:** O selector é a definição do nome do componente, ou seja, como poderemos chamar esse componente como tag HTML, escolhendo um nome como 'app-component-overview', podemos chamar o seguinte componente como uma tag HTML utilizando esse nome. 

- **templateUrl:** Esse parâmetro recebe uma string como caminho de um template HTML, sendo o respectivo template que a classe do template instruirá o Angular core que deverá usar aquele código HTML para renderizar na chamada do componente.

- **template:** Podemos utilizar apenas template e instruir como string o código HTML diretamente na classe TS em vez de utilizar um arquivo separado.

- **styleUrls:** Será similar ao templateUrl, mas aqui estamos instruindo um vetor que conterá arquivos CSS que irão estilizar o template.

- **styles:** Utilizando esse parâmetro, podemos inserir como string o estilo diretamente na classe TS.

- **imports:** Esse parâmetro é muito utilizado para padrões de projeto standalone, aqui devemos informar um array contendo quais outros componentes, diretivas ou pipes serão utilizados pelo componente, esse parâmetro substitui o imports de módulos inteiros e torna as importações individuais para cada componente.

- **providers:** Aqui criamos um array que receberá uma lista de serviços que nosso componente poderá utilizar.

- **standalone:** Nesse parâmetro definimos ele como um booleano, informando se o componente deverá gerenciar por conta própria suas importações e dependências ou se dependerá de um modulo para isso.

``` typescript

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <button class="card-button-roxo">Clique Aqui</button>
  `,
  styleUrl: './card-button-roxo.scss',
  providers: [MeuServicoHTTP],
  imports: [MeuPipe]
})
export class CardButtonRoxo {

}

```

---

## Estilização com Angular

**Importações de Arquivos CSS:** Utilizando o **@use** ou **@forward** dentro de um arquivo **CSS** ou **SCSS**, podemos passar um caminho para esse import, e o angular poderá identificar que os arquivos estão conectados, dessa forma podemos ter 2 arquivos dinâmicos, onde em um nós criamos variáveis CSS/SCSS e outro podemos utilizar essas variáveis.

**Importações Globais:** Para não precisar especificar sempre um caminho relativo ou absoluto, podemos especificar para o Angular sempre olhar para uma pasta específica para buscar os arquivos de estilizações, ai precisamos apenas especificar o nome do arquivo, para fazer isso, precisamos configurar isso no nosso arquivo **angular.json**

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

**:host:** O uso do :host é uma ferramenta muito útil quando utilizamos o ::ng-deep, pois ele permite utilizar o ::ng-deep apenas no componente referenciado, sem afetar o funcionamento de outros componentes filhos iguais. (é fazer uso do ::ng-deep sem a obrigação de especificar um seletor como class/id para especificamente editar um componente filho.)

### Encapsulamento de Estilos

**View Encapsulation:** Os view encapsulations são formas de encapsular (ordenar o comportamento) do CSS, permitindo abrir maior leque de funcionamentos para o comportamento da estilização no angular. Para atribuir um view encapsulation, o angular se orienta através da propriedade **encapsulation** que pode ser inserida dentro do decoration do componente.

- **ViewEncapsulation.None:** Essa propriedade remove o comportamento padrão da estilização dos componentes, com essa propriedaed, todos os componentes receberão escopo global de estilização, então ao editar um, todos serão editados (como um @ng-deep geral sem o uso da anotação).

- **ViewEncapsulation.emulated:** Essa é a propriedade padrão do angular (não definir um encapsulation irá marcar essa como padrão), onde estilização feita no componente, permanece no componente, amenos que seja especificada de maior relevância e/ou nos arquivos globais.

**ViewEncapsulation.ShadowDom:** Essa propriedade define que os componentes não sofrerão estilização de arquivos CSS globais, e poderão apenas ser editados por eles próprios ou por componentes pais (essa regra de shadow dom define também que não é necessário utilizar o @ng-deep para realizar as alterações em componentes filhos).

- Uma dica de estilização CSS é que quando definimos um seletor CSS usando nome de tag e id, podemos deixar unificados sem espaço o id/class quando nos referimos a estar diretamente ligada a classe passada, ou seja: 

**minha-tag.minha_classe** -> Referesse a uma tag do tipo minha-tag que possui a classe especificada

**minha-tag .minha_classe** -> referesse a uma tag qualquer com a classe minha_classe dentro de uma tag minha-tag

**Atributo vs Propriedade:** Atributos são elementos de complemento e modificação do HTML, como o id, class, type, etc... Ao ser criado um elemento HTML, o navegador cria um objeto para o elemento e define propriedades (valores de objetos) que podem ser acessados via JS.

- Podem parecer similares, mas atributos são complementos do elemento HTML escritos, já as propriedades são as representações via objeto desses atributos, as propriedades podem ser modificadas.

**API do DOM:** O DOM é uma árvore que estrutura o HTML de um site dentro do navegador, um browser possui uma API de acesso e modificação desse comportamento, em javascript, podemos acessar essa API através do document, como document.className(), isso quer dizer que estamos chamando o atributo class do documento HTML.

- Ao apertar f12, podemos ir para a sessão properties e acessar todos os atributos da API do browser.

---

## Angular Material

O angular Material é uma biblioteca de componentes prontos onde, basta apenas importar o componente para dentro do módulo e fazer uso dele, para instalar o angular material, podemos usar o **ng add @angular/material** e seguir os passos, após isso, buscamos na internet o componente adequado, importamos ele para dentro de um módulo e fazemos uso dele.

---

## Data Binding

É o termo dado para referenciar a sincronia entre variáveis da tela e da lógica, ela pode ser dividida em Interpolation, React databiding, Propery Databiding e two-way Databiding.

**Interpolation:** É a sincronia de dados de variáveis entre a view e a lógica para apresentar algo na tela, podemos passar as variáveis ou funções que irão realizar o comportamento da view sem necessariamente chamar os elementos HTML, esse processo é feito através das **{{nome-da-variavel}}**. Importante destacar que a interpolação é unidirecional, ou seja, ela trafega apenas da variavel -> elemento, e jamais no sentido contrário.

- Interpolation **aceita lógica dentro das chaves duplas**, então pode realizar calculos, formatar variáveis, utilizar métodos, etc...

- Na interpolação, se uma variável de tela retornar um valor **undefined**, o Angular não irá imprimir nada na tela (Dificil de debugar). Se utilizarmos um **optional change**, ele ainda não mostrará os valores **undefined**, mas irá reservar espaço na tela e não irá quebrar completamente o comportamento gráfico.  Optional Change -> **{{nome-da-variavel?}}**, ou também podemos definir um comparador ternário para validar.

**Property Binding:** O property binding permite o uso de variáveis para manipulação de propriedades do DOM, o Angular consegue recuperar o identificador do elemento e realizar manipulações no DOM via sessão com variáveis JS. Para fazer isso, usamos os [nome-da-propriedade]="nome-da-variavel". Podemos fazer algo como ***[value]="valueInput"***, assim, sempre que editar o valor da variável valueInput, a propriedade que utiliza ela, também irá receber seu valor.

- O **property Binding é unidirecional**, ou seja, atualizar na tela um valor, não irá atualizar o valor da variável na classe, para isso, é necessário o **Two-Way databinding**

**Event Binding:** O event Binding é o uso de eventos do navegador para chamar funções dentro da classe, muito similar ao JavaScript padrão, mas do jeito do Angular. Esse comportamento é de chamada e funciona no sentido contrário do Property Binding(O Property Binding atualiza a tela, o Event Binding atualiza o código), ou seja, com Event Binding, podemos chamar funções que irão reagir às ações do usuário via funções TypeScript dentro da classe do componente. Isso é feito através das (), ex: ***button value="Meu botão" (click)="showClick()"***

- O nome das funções de eventos são chamadas removendo o termo 'on', onclick -> click, onpresskey -> presskey.

**Atribute Binding:** È uma forma similar de trabalhar como Property Binding, mas mudando os atributos e não as propriedades, isso é feito através da seguinte forma: [attr.nome-do-atributo]="nome-da-variavel".

**Style Binding:** O Style Binding é uma forma de trabalhar com estilização inline de forma dinâmica com o JS, ele permite passar um objeto **style** e definir seus atributos (propriedades CSS). Ex: **[style.width]="styleWidth" [style.height]="styleHeight" [style.backgroundColor]="backgroundColor"**, Alem dessa forma, podemos passar um objeto direto do código, como [style]="nome-do-objeto"

**Class Binding:** O Class Binding é uma forma de trabalhar com classes de forma dinâmica, pois esse método permite definir se uma classe irá estar ou não presente através de um boolean, ex: [class.nome-da-classe]="true" [class.nome-da-classe]="!buttonClass".

**Two-way DataBinding:** O Two-Way Databind é uma forma de sincronizar um evento com uma variável, ou seja, transformar automaticamente a entrada de dados em um valor de variável, podemos fazer isso usando a importação de um módulo e utilizando uma propriedade na tag do template. Vamos ver um exemplo mais explícito sobre como fazer o two-way databinding

``` Typescript

@Component({
  imports: [
    FormsModule // Isso permite o uso de NgModel e NgModelChange
  ]
})

<input [NgModel]='variavel' (NgModelChange)='funcaoDeAtribuicao($event)' > // O NgModel puxa a informação da 'variavel' para dentro do input e a função deve atualizar a variavel com o valor do input através do $event
<h2>{{variavel}}</h2> // Interpolação da variavel

<input [(NgModel)]="variavel"> // Processo simplificado de realizar o two-way databinding
<p>{{ variavel }}</p>

```

- O Two-Way Data Binding exige o uso da classe FormsModule para sua importação.

---

## Comunicação Entre Componentes

**@Input:** O @Input é a forma de conseguir enviar uma informação de um componente pai para dentro de um componente filho, essa tag possui algumas propriedades e é utilizada junto a uma variável. Dentro da classe do componente filho, podemos inicializar uma variável com @Input e declarar que o componente, na hora de ser escrito como tag, terá uma propriedade como nome da variável atribuida (ou o nome do alias). O valor atribuido a essa propriedade será capturado pela variável especificada no componente filho e poderá ser utilizada.

``` Typescript

// Componente filho

  @Input({alias: "labelCard", required: true}) labelCard: string = "";
  @Input({alias: "price", required: true}) price: number = 0.0;

// Tag do Componente filho

    <app-card [labelCard]="variavel" [price]="variavel"></app-card>

```

- Aqui o fluxo é unidirecional, sendo respectivamente: Pai -> Filho.

**@Output:** O **@Output** é utilizado para fazer o sentido inverso do **@Input**, ele é utilizado na chamada de eventos e pode fazer a comunicação de Filho -> Pai, Um componente filho pode enviar informações através de um **EventEmmiter** para o componente pai da seguinte forma:

``` typescript

// Componente filho

@Output('eventoEmitido') eventoEmitido = new EventEmitter<Object>();

  onButtonClick() {
    this.eventoEmitido.emit(this.objectResponse);
  }

// HTML do Componente Pai (Pode ser passada uma função qualquer, mas para capturar alguma informação, é precisso do $event)

<app-card-button (eventoEmitido)="buttonClicked($event)"></app-card-button>

```

---

## Ciclo de vida do Componente

**Hook:** Um hook é um método que o Angular chama automaticamente de acordo com um determinado ciclo de vida de um componente

**OnInit:** O OnInit é uma interface que podemos implementar na classe do componente, e ao implementar ela nos **fornece um método ngOnInit()**, que podemos utilizar para realizar instruções logo quando o Angular carrega o sistema de **@Input** do componente. O método ngOnInit() irá rodar uma única vez durante a vida do componente. É nesse método que podemos realizar:

- A busca por dados iniciais.
- Inicializar estados
- Configurar Streams

**OnChanges:** Esse é um método de reação a alterações, se por acaso uma variável atribuida a um @Input mudar após o OnInit, esse método poderá ser chamado, isso permite a classe realizar reações para novas entradas de dados. É implementada pela interface ngOnChange

**AfterViewInit:** Esse hook é chamado pelo Angular, sempre que o Angular realizar a renderização do template, é um processo posterior ao **OnInit**, pois primeiro ele irá carregar a estrutura do DOM e as diretivas.

OnDestroy: Esse é um método que executa quando o ciclo de vida chega ao fim, ou seja, quando o componente é destruido na página, o método **OnChange()** é chamado. É util para:

- Cancelar Subscriptions
- Remover Listeners
- Limpar Timers

- Se precisar fazer manipulação de elementos HTML logo ao iniciar o sistema, o OnInit não encontrará os elementos.

---   

## Diretivas

As diretivas são **formas de manipulação do DOM**, elas podem ser classificadas em  **Diretivas de Atributo**(Manipulam valores e comportamento de elementos), **Diretivas Estruturais**(Manipulam a estrutura dos elementos do DOM) e **Diretivas Personalizadas**.

### Diretivas de Atributo

**NgClass:** Permite adicionar ou remover dinamicamente uma classe CSS. Ele irá adicionar ou remover uma classe declaradamente especificada, as classes dentro de um arquivo CSS ou SCSS não irão sofrer alterações.

``` HTML

  <!-- property binding referencia a propriedade estilo que está no arquivo TS -->
  <p [ngClass]="estilo">comp-atributos works!</p>

  <!-- Botão com event binding que dispara o método trocar() 
  que está no arquivo TS -->
  <button (click)="trocar()">trocar estilo</button>

```

``` typescript

@Component()
export class DiretivaNgClass {
  minhaClasse: string = "minha-classe-css";

  public troca() {
    if(minhaClasse === "minha-classe-css") {
      this.minhaClasse = "outra-classe-css"
    } else {
      minhaClasse = "minha-classe-css"
    }
  }
}

```

**NgStyle:** Permite adicionar ou remover dinâmicamente um estilo CSS

**NgModel:** Cria a comunicação de bidirecional entre o template e a classe do componente (famoso two-way data binding), esse conceito é estudado e aprofundado no módulo sobre Data Binding.

**NgTemplate:** Cria um template modelo, que possui um rendered=falso por padrão, se utilizar junto com *NgIf, poderá renderiza-lo.

**NgContent:** Permite que o elemento pai renderize os elementos filho.

### Diretivas Estruturais

***NgIf:** O *NgIf é a propriedade HTML da diretiva estrutural de condição, uma tag que possui um NgIf pode receber uma condição, e dependendo da condição, o elemento será ou não mostrado ao usuário. Podemos inserir um template padrão para termos um else dentro da diretiva, vamos ver o exemplo:

``` HTML
  <h1 *ngIf="condicao;">Lista de Tarefas</h1>  <!-- Caso a condição não seja atendida, será ocultada a Tag -->

  <h1 *ngIf="condicao; else contentElse"> Não será mostrado </h1> <!-- Caso a condição não seja atendida, podemos definir um template para ser exibido no lugar do elemento -->
  <ng-template #contentElse> Será mostrado </ng-template>
```

***NgFor:** Essa é uma diretiva que consegue percorrer sobre um array (seja string, number, misto ou objeto) e criar um elemento para cada valor, vamos para um exemplo para entendermos

``` html

<!-- Aqui definimos uma variável que representará o item na posição do index e o vetor -->
<div *ngFor="let item of vetor; i = index"> 

<!-- Isso irá mostrar a interpolação entre o index e 
o item (poderia ser um objeto e representariamos a propriedade do item) -->
  <h1>{{i}} - {{item}}</h1> 
</div>

```

**NgSwitchCase:** Cria blocos condicionais, que dependendo da variável atrelada, poderá renderizar conteudos diferentes

``` HTML

<div [ngSwitch]="menuType">
  <div *ngSwitchDefault="'user'">
    <ul>
      <li>Editar Perfil</li>
      <li>Adiconar cartão</li>
    </ul>
  </div>
  <div *ngSwitchCase="'admin'">
    <ul>
      <li>Editar Perfil</li>
      <li>Adiconar cartão</li>
      <li>Gerenciar usuários</li>
    </ul>
  </div>
  <div *ngSwitchCase="'superUser'">
    <ul>
      <li>Editar Perfil</li>
      <li>Adiconar cartão</li>
      <li>Gerenciar usuários</li>
      <li>Gerenciar Admins</li>
    </ul>
  </div>
</div>

```

### Diretivas Personalizadas

Para criar uma diretiva personalizada, precisamos utilizar o comando de geração de diretiva: **ng generate directive nome-da-diretiva**, isso irá criar um arquivo ts da diretiva e vincular ela ao app.module

- Se referir, pode colocar a diretiva dentro de uma pasta separada para ela.

``` typescript

@Direcive({
  selector: ["minhaDiretiva"] // Define como chamar a diretiva
})
export class MinhaDiretiva {
  constructor(private elRef: ElementRef) { // Uma diretiva possui em seu construtor, uma referência ao próprio elemento HTML na qual está definida
    elRef.nativeElement.style.background = 'red'; // Com o elRef, podemos acessar o elemento HTML e alterar suas propriedades (Manipulando o DOM)
  } 
}

```

**@HostListener:** Podemos criar diretivas que reagem a eventos do usuário quando necessário, para realizar essa interação, temos o **@HostListener(nome-do-evento)**, que ficará escutando o evento especificado e irá executar a função na qual está atrelado

```typescript

@HostListener('mouseenter') onMouseEnter() {
  elRef.nativeElement.style.background = 'green';
}

@HostListener('mouseleave') onMouseLeave() {
  elRef.nativeElement.style.background = 'pink';
}

```

**@HostBinding:** Também podemos associar propriedades a uma variável, isso é interessante quando queremos trabalhar com diretivas sem precisar ficar chamando o nativeElement a todo momento, o @HostBinding() funciona similar ao @HostListener, mas é atribuido a uma variável.

``` typescript

@HostBinding('target.value') valorDoElemento = 'Um valor de Elemento';

```

- Vamos ver um exemplo extendido de como podemos criar uma diretiva funcional

``` typescript

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class Highlight {

  @HostBinding('style.background-color') bgColor = 'transparent'; // Define que a variavel irá fazer referência ao background color de todos os elementos que usarem essa diretiva

  @HostListener('mouseover', ) onMouseOver() { // HostListener ficará escutando um evento para realizar um método
    this.bgColor = 'orange';
  }

  @HostListener('mouseout', ) onMouseOut() {
    this.bgColor = 'transparent';
  }
  constructor() { }

}

<p appHighlight>Sou um Paragrafo com Diretiva</p> // Para atribuir uma diretiva, basta colocar o nome do seletor dentro do elemento HTML

```

---

## Pipes

**pipe:** O pipe no Angular é uma ferramenta útil para fazer transformações em variáveis dentro do template, podemos usar uma variável e atribuila a um pipe que por sua vez irá delegar a tarefa para uma função criada em alguma classe Typescript, seja ela nativa do angular ou criada via classe Pipe. Uma classe Pipe importa a interface PipeTransform e utiliza a decoration @Pipe().

- Os pipes nativos do angular são importados da biblioteca ComumModule

``` HTML

<<h1>{{ variavel | upercase }}</h1>> <!-- O valor dentro da variavel será expresso em letra maiúscula -->

```

``` typescript

@Pipe({
  name: 'nome-do-meu-pipe',
})
export class MeuPipePersonalizado implements PipeTransform { // Lembrando que precisamos importar nosso pipe para dentro do nosso modulo
  transform(status: string): string {
    // Aqui criamos uma lógica com retorno
    if(status == 1) {
      return valorRetornado
    }
  }
}

```

---

- ngModel é um parâmetro que avisa para o Angular acionar o Change Detector no contexto, isso permite a sincronização de valores de elementros HTML com variáveis especificadas.

---

## Template Variables

**Template Variables:** Template Variables são variáveis que podemos criar dentro de elementos HTML (dentro do template) que fará referência ao próprio elemento ou a uma diretiva, ou seja, se eu tiver um elemento <<input type="text">> eu posso atribuir uma variável a ele que conseguirá fazer referência a ele mesmo, ficando assim: **input type="text" #myVariable**, podemos acessar essa variável em qualquer momento dentro do template e dentro de seu escopo.

``` HTML

  <input #myInput type="text" ngModel>

  <h2>{{myInput.value}}</h2>

```

- Acima temos um input com a variável declarada e no próprio template, temos a chamada ao valor do input, o ngModel é importante, pois ele avisa ao observableChange do Angular para monitorar a atualização simultânea do valor da variável (similar ao two-way databinding).

**Template Variable Scope:** O escopo das variáveis de template é definido na ordem similar ao javascript, se criarmos um escopo (escopo são criados com diretivas, como ngFor ou ngIf), as template variables irão seguir a sequência onde variáveis de elementos pais podem ser acessados dentro de elementos filhos, mas o contrário não.

``` html

  <div>
    <input #myInput type="text" *nfIf(true)>
  </div>

  <h2>{{myInput.value}}</h2> <!-- Irá dar erro, pois a variável não pode ser acessada, o escopo da variável se limita à div-->

```

## Acesso de componentes filhos

**@ViewChild():** Esse decorator tem a capacidade de inicializar uma variável no typescript e atribuir a essa variável, a referência ao objeto do elemento HTML, dessa forma, podemos manipular uma variável que armazena um elemento HTML dentro da nossa classe/metodo.

``` Typescript

<input type="text" #meuInput>

@ViewChild('meuInput')
meuInput!: ElementRef<HtmlInputElement>;

this.meuInput.nativeElement.value = 'valor atualizado';

```
**@ViewChildren():** O ViewChildren é uma forma de conseguir capturar valores filhos de um elemento. Podemos por exemplo, ter um botão com for e os botões dentro do for pode ser capturado com o @viewChildren(), ele irá retornar uma lista de elementos que podem ser manipulados individualmente.

``` HTML

<button #meuButton class="btn-{{ i }}"
    *ngFor="let btn of buttonsList; let i = index" (click)="changeColor($event)">{{ btn }}</button>

```

``` Typescript

buttonsList = [ // Define a lista de botões de forma dinâmica usando diretiva estrutural (*for)
    'botao 1',
    'botão 2',
    'botão 3'
  ]

  @ViewChildren('meuButton') 
    buttonsEl!: QueryList<ElementRef<HTMLButtonElement>>; // Define uma lista de referencias a um Elemento HTML do tipo Botão

  changeColor(event: Event) {
    const buttonRef = event.target as HTMLButtonElement;

    buttonRef.style.backgroundColor = 'green';
    buttonRef.style.color = 'white';
  }

  resertButtons() {
    this.buttonsEl.forEach((button) => { // Permite iterar sobre a lista de buttons capturada pelo ViewChildren
      button.nativeElement.style.backgroundColor = '';
      button.nativeElement.style.color = 'black';
    })
  }

```

### Serviços

Serviços são classes com propósitos lógicos e definidos, elas são caracterizadas por realizar lógica de negócio, realizar validações, conexões com servidores e qualquer outras coisas que não envolvam a visualização ou interação do usuário. No Angular, um serviço é caracterizado pelo decorador **@Injectable**, pois define a criação de um serviço e permite chama-lo para dentro de um módulo ou classe. Podendo reutilizar o nosso serviço em quantos lugares precisarmos.

- Podemos criar um serviço através do **ng generate service nomeDoServico**

``` Typescript

@Injectable({
  providedIn: 'root'
})
export class heroService() {

}

```

- Quando o Angular renderiza um componetne, ele identifica quais serviços esse componente precisa, através dos parametros do construtor, por isso, para instanciar um serviço, é necessário inicializar ele pelos parametros do construtor. Se o Angular identificar a necessidade de um serviço, ele irá verificar se já existe uma instância para esse serviço, caso não houver ele irá criar uma instância, caso já houver, ele irá reaproveitar a referência. Então podemos dizer que sempre haverá apenas uma instância de um serviço naturalmente criado pelo Angular, caso tenha mais referências, será reaproveitada a instância existente.

- Por padrão, os serviços root do Angular são **singleton**

Provedores: Povedores definem como o serviço será visto pelos componentes e como o Angular deve gerenciar ele, ao criar um novo serviço pelo Angular CLI, ele irá vir com um providedIn no decorator, esse providedIn define aonde o serviço deverá ser gerenciado, por padrão, ele é definido no root, o que quer dizer que o Angular irá instânciar de forma natural na raiz, permitindo todos os componentes poderem acessar ele e reutilizar instâncias existentes.

- Caso no componente seja registrado um providres, o Angular irá criar uma nova instância do serviço especificado para cada referência ao componente criado na aplicação.

``` typescript

@Component({
  providers: [HeroService] // Essa propriedade no @Component define que a cada nova instanciação do respectivo componente, o Angular irá criar um novo serviço.
})

```

## Roteamento Estático

O Angular nos fornece uma estrutura de mapeamento de componentes, esse mapeamento transforma nossa aplicação componentizada em uma SPA, permitindo uma navegação fluida entre URLs através das rotas, é um conceito extremamente importante e permite criar telas com rotas separadas e específicas, vamos primeiramente entender o roteamento estático.

- O Angular define diferentes formas de implementar um roteamento entre os modelos padrões e standalone do Angular.

Para o standalone, irei deixar um arquivo que demonstra como utilizar sistema de roteamento estático na pasta [Roteamento Estático](/Angular/Roteamento%20Estático/1-roteamento-standalone/). E irei deixar abaixo algumas definições.

**app.routers.ts:** Esse é o arquivo onde iremos configurar nossas rotas e os componentes que serão carregados ao entrar na respectiva rota (importante notar que o componente só será renderizado quando a rota for acessada, até lá, o angular não irá inicializar o componente, isso é demonstrado através do OnInit).

``` typescript

export const routes: Routes = [ // Variável de rotas do tipo Routes é criada e exportada para o Angular
  { path: 'primeiro', component: Primeiro }, // Rotas de exemplo, onde ao acessar localhost:2400/primeiro, iremos renderizar o componente Primeiro
  { path: 'segundo', component: Segundo }
];

```

**router-outlet:** Esse router-outlet é uma diretiva estrutural que define o comportamento de rotas, ela é necessária dentro do template para permitir a exibição dos componentes em rotas.

``` typescript

<div class="menu__item">
  <a class="menu__link" routerLink="/segundo">Segundo</a> // O RouterLink irá realizar a navegação entre rotas, iniciando e destruindo componentes (ele não é obrigatório estar em um link, mas recomendado por convenção)
</div>

```

- Caso seja utilizada o href do link para navegar entre as rotas, o Angular não irá funcionar como SPA e sim como carregamento total de páginas, onde cada troca de link, o cliente fará as requisições dos arquivos.

**RouterLinkActive:** O RouterLinkActive é uma diretiva com a habilidade de implementar classes CSS a um elemento que ela esteja, ele implementa a classe CSS com base no RouterLink mais próximo, por exemplo: Se eu tiver um RouterLink e um RouterLinkActive próximo a ele (talvez no componente pai), ao ser ativado o RouterLink, o RouterLinkActive irá implementar as classes CSS atribuidas, fazendo um comportamento dinâmico dependendo do link ativo.

``` HTML

<div class="menu">
    <div class="menu__item" routerLinkActive="menu__item--selected">
        <a class="menu__link" routerLink="/primeiro">Primeiro</a> <!-- Se o /primeiro for clicado (ativado), o menu__item--selected será atribuida a div -->
    </div>
    <div class="menu__item" routerLinkActive="menu__item--selected"> <!-- Se o /segundo for clicado (ativado), a classe será removida do RouterLinkActive próximo ao /primeiro e atribuida à div do /segundo -->
        <a class="menu__link" routerLink="/segundo">Segundo</a>
    </div>
</div>

<router-outlet></router-outlet>

```

- O Elemento que possui um RouterLinkActive irá receber também uma propriedade chamada **isActive** que irá ser um boolean para verificar se o link está ou não ativado.

``` HTML

<div class="menu__item" routerLinkActive="menu__item--selected" #rlaPrimeiro="routerLinkActive">
    <a class="menu__link" routerLink="/primeiro">
      Primeiro {{ rlaPrimeiro.isActive ? 'Ativado' : '' }}
    </a>
</div>

```

**Lazy Loading:** O Lazy Loading é uma ferramenta das rotas que permite configurar como os componentes serão carregados para o browser, podemos configurar para trazer tudo de uma vez no main.js (arquivo do Angular que traz o código, podemos localizar ele em network), que é o comportamento padrão, ou podemos utilizar o lazy loading para trazer os componentes sob demanda.

``` typescript

export const routes: Routes = [
  { path: 'components', loadComponent: () => import('./components/base/base').then(m => m.Base)}, // Isso define o comportamento de lazy loading para o componente base 
  { path: 'components/primeiro', component: Primeiro },
  { path: 'components/segundo', component: Segundo },
];

```

**Path Vazio:** Para criarmos uma rota para o path vazio, podemos apenas no app.routes.ts, criar uma nova rota com um path vazio e associar um componente a ele, importante entender que para entrar no path root através de link, o acesso é via '/'

WildCard: Os WildCards são considerados coringas, onde eles servem para redirecionar o usuário para página específica caso o Angular não consida dar match na URL com nenhuma rota existente no projeto. Para entender o wildcard, precisamos ter uma noção sobre o sistema de localizar rotas do Angular, no nosso arquivo app.routes.ts, escrevemos vários objetos para representar uma rota e associar ela a um componente, o Angular costuma realizar a leitura de forma progressiva (de cima para baixo), se colocarmos um wildcard no último objeto, podemos ter um comportamento de redirecionamento caso o Angular não encontre a rota (isso é o comportamento de 'página não encontrada').

``` typescript

export const routes: Routes = [
  { path: '', title: 'Index', component: Inicial },
  {
    path: 'components',
    title: 'Componentes',
    loadComponent: () => import('./components/base/base').then((m) => m.Base),
  },
  { path: 'components/primeiro', title: 'Primeiro', component: Primeiro },
  { path: 'components/segundo', title: 'Segundo', component: Segundo },
  { path: '**', title: 'Página Não Encontrada', component: PaginaNaoEncontrada }, // Caso o usuário não acesse o root, /compontents, /Primeiro ou /Segundo, ele será redirecionado para o coringa
];

```

**Título da Página:** Para definir um título para a aba do navegador, utilizamos o atributo **title** dentro do objeto de Routes

**Rotas Filhas:** O sistema de rotas filhas permite os desenvolvedores de utilizar uma hierarquia de rotas, onde o componente pai possui um Route-Outlet e um componente filho também possua um (com seus próprios objetos de rotas), isso ajuda na organização das rotas e permite melhor manutenção e entendimento do contexto de rotas na aplicação, é uma melhor abordagem do que criar um arquivo gigante com 50-100 rotas misturadas.

``` typescript
[
  {
    path: 'components/primeiro',
    title: 'Primeiro',
    component: Primeiro,
    children: [ // Definimos que a rota terá rotas filhas
      { path: 'filho-a', title: 'filho-a', component: FilhoA }, // O acesso é via /components/primeiro/filho-a
      { path: 'filho-b', title: 'filho-b', component: FilhoB },
    ],
  }
]

```

- Agora que definimos as rotas filhas de components/primeiro, vamos ver como seria o template do componente /primeiro

``` HTML

<p>primeiro works!</p>

<a routerLink="filho-a">Filho A</a>

<br>

<a routerLink="filho-b">Filho B</a>

<router-outlet></router-outlet>

```

## Roteamento Dinâmico

**Query Params x Query Strings x Property 'data':** Os 3 são formas de comunicação com APIs via HTTP, o Params são valores passados dentro de uma URL para retorno de coleções ou objetos sem filtragem ou consulta avançada, isso permite passar uma rota com valores dinâmicos, como um id de usuário ou recuperar postagens de uma vez só. Os Query Strings são valores de consulta avançada passadas pela URL, são informações visíveis ao usuário da aplicação (importante tomar cuidado com o que é passado), isso permite realizar buscas por parâmetros específicos ou realizar consultas extensas com vários atributos. O Property Data é um objeto armazenado dentro da rota Angular que irá guardar informações de metadados.

``` 

https://jsonplaceholder.typicode.com/posts?userId=2 // Query String

https://jsonplaceholder.typicode.com/users // Query Params

```

- Agora vamos ver como podemos realizar a chamada de Query Params dentro de uma rota Angualar:

``` typescript

// Routes

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'posts/:userId', // Definimos aqui um Query Param como:userId
    component: Posts
  }
];

// Service

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http = inject(HttpClient);

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}

export type Root = IUser[];

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// Template

@for (user of usersList$ | async; track user) {
  <div style="cursor: pointer;" [routerLink]="['/posts', user.id]"> // Fazemos o property binding do routerLink para poder acessar com variáveis e definimos a junção entre os valores para sair algo como /posts/user.id
    <div>Id: {{user.id}}</div>
    <div>Name: {{user.name}}</div>
  </div>

}

```

**Acessando Parâmetros da URL:** Para acessar os parâmetros da URL, nós precisamos criar um Input() com o mesmo nome do parâmetro que queremos acessar, o input irá procurar na URL e retornar o valor associado a esse parametro

``` typescript

// Routes

export const routes: Routes = [
  {
    path: 'posts/:userId', // Definimos aqui um Query Param como:userId
    component: Posts
  }
];

// Component

@Input() userId: string = ''; // Informamos que o nome do input será o mesmo do parametro da rota

```

**Query Strings:** Para poder criar rotas utilizando query strings é bem simples e fácil, é utilizado apenas um parâmetro a mais junto com um RouterLink. Vamos ver o exemplo abaixo para entendermos

``` typescript

<button routerLink="/comp1" [queryParams]="{ nome: 'Eduardo', idade: 21}">Redirecionar Eduardo</button> // Aqui definimos os parâmetros em forma de objeto que será passado para a URL
<button routerLink="/comp1" [queryParams]="{ nome: 'Gustavo', idade: 34}">Redirecionar Gustavo</button>

<router-outlet></router-outlet> // Aqui será o redirecionamento

```

**Recuperação de Query Strings da URL:** Para recuperarmos os Query Strings, utilizmaos um meio similar ao de recuperação de Query Params, utilizando o @Input, mas em vez de passar o nome do Query Param, utilizamos o nome da propriedade do Objeto do Query String.

## Observables

Um Observable é uma implementação do padrão Observer, usada para representar fluxos de dados ao longo do tempo. Em vez de devolver um valor imediatamente, um Observable descreve como produzir valores e notifica seus observadores sempre que um novo valor é emitido, ocorre um erro ou o fluxo é finalizado. Esse fluxo pode reagir a:

- Eventos externos, como respostas de um servidor;
- Eventos internos, como ações do usuário ou mudanças de estado;
- Qualquer fonte de dados assíncrona ou contínua.

**Observable vs Promise:** Uma Promise, muito usada no JavaScript para chamadas HTTP, também representa um valor assíncrono, mas com limitações importantes:

- Resolve uma única vez
- Executa imediatamente
- Não pode ser cancelada

Já um observable 

- Pode emitir vários valores
- Só executa quando alguém se inscreve (subscribe)
- Pode ser cancelado (unsubscribe)

E por padrão, o Angular busca escolher os Observables por serem mais adequados a aplicações web.

**Observable no Angular:** No Angular, o HttpClient não retorna diretamente os dados de uma requisição. Ele retorna um Observable que sabe como realizar aquela requisição.

``` typescript

// Retorna um Observable que sabe realizar a requisição get
this.http.get<Usuario[]>(url);

// Busca o dado via get utilizando o Observable
this.http.get<Usuario[]>(url).subscribe(dados => {
  console.log(dados);
});

```

Componentes do Observable: Um Observable possui 3 possíveis caminhos a se seguir de acordo com o dado recebido por ele. Sendo respectivamente: 

- Next - Chegou dado
- Error - Algo deu errado
- Complete - Acabou o Fluxo

Normalmente é estruturado da seguinte forma:

``` typescript

ngOnInit() {
  this.api.getUsuarios().subscribe({
    next: usuarios => this.usuarios = usuarios,
    error: erro => console.error(erro),
    complete: () => console.log('Finalizado')
  });
}

```

Cancelando Inscrições: Para os observables, é muito importante realizar o unsubscribe quando um componente for destruido, isso evita vazamento de memória ou problemas de performance difíceis de serem encontrados. Podemos usar o ngOnDestroy() para realizar o unsubscribe.

## Requisições HTTP

Para realizar chamadas HTTP, o Angular fornece uma API HTTP própria para clientes em aplicações Angular, podemos chamar uma classe de serviço nomeada de **HttpClient** provinda diretamente do **@angular/commom/http**.
   
Precisamos prover esse serviço na nossa classe de configuração (appConfig), para realizar a invocação da classe de serviço, chamamos o provideHttpClient(), assim como abaixo e poder injetar o serviço como dependência dos componentes que solicitarem.

``` typescript

// Classe de Configuração do App
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};

// Classe de serviço que conterá as requisições HTTP
@Injectable({providedIn: 'root'})
export class ConfigService {
  // Inject do serviço
  private http = inject(HttpClient);
}

```

- Caso esteja utilizando módulos, deverá inclui-lo nos provedores do **@NgModule**.

**WithFetch:** No momento de provisão da classe de serviço HttpClient para nosso App.config, podemos informar uma propriedade chamada **withFetch()**, que fará o Angular utilizar a **API Fetch** padrão do JS, pois, por default, o Angular utilizará **XMLHttpRequest** em vez do Fetch.

``` typescript

// Classe de Configuração do App
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch())
  ]
};

```

- Existem outras configurações, mas por enquanto vamos nos atentar a essa.

**Requisições HTTP:** O HttpClient possui métodos respectivos para cada verbo HTTP, onde pode receber 2 parâmetros, um para a rota e outro como body. Todos os métodos retornam um **Observable** do tipo Object.

``` typescript

// GET — obter um usuário
public getUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.baseUrl);
}

// POST — criar um novo usuário
public criarUsuario(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.baseUrl, usuario);
}

// PUT — atualizar completamente um usuário
public atualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
}

// PATCH — atualizar parcialmente um usuário
public atualizarParcial(id: number, dados: Partial<Usuario>): Observable<Usuario> {
  return this.http.patch<Usuario>(`${this.baseUrl}/${id}`, dados);
}

// DELETE — remover um usuário
public deletarUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}

```

Utilizando o Serviço HTTP: 

## Variáveis de Ambiente

Variáveis de ambientes são úteis para definir configurações e definições, como padrões no projeto, manutenabilidade de rotas de APIs e chamadas e diversas outras configurações. Para definir variáveis de ambientes no Angular, utilizamos o seguinte comando para solicitar ao Angular CLI gerar:

``` bash

ng generate environments

```

