# Sumário

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
[Angular Material](#angular-material)  
[Roteamento Estático](#roteamento-estático)   

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

**CSS:** Linguagem de estilização da web

**SCSS:** Aperfeiçoamento do CSS puro, trazendo novas e melhores funcionalidades, como aninhamento de seletores, variáveis e mais...

**Livereload:** O Livereload é o servidor que dispõe os arquivos do Angular para o navegador, semelhante ao nginx ou tomcat, mas claro, com a finalidade de servir os arquivos do Angular.

**Componente:** Um componente é um encaixe dentro da tela, tudo que podemos separar em blocos dentro de um layout chamamos de componente, o angular trabalha com chamadas de componentes filhos para formar componentes pai (maiores e agrupados por outros componentes).

**Template:** Conteudo HTML dentro do arquivo .html na pasta do componente.

**Módulo:** No angular, podemos classificar e organizar componentes por módulos, dentro de cada módulo, encontramos os componentes específicamente organizados.

- Normalmente fazemos uma tela se tornar um módulo e dentro do módulo (tela) temos vários componentes organizados.

**Declaração de Componente:** No angular, ao criar um componente, usando o ``generate component``, será criado uma pasta referente ao respectivo componente, e lá estará os arquivos utilizados. O arquivo .ts do componente fará o gerenciamento de import e export, lá nós encontramos um **decorator** que terá os metadados do componente, e uma classe (a classe é onde encontramos os métodos e lógica do componente).

- A propriedade SELECTOR do componente é o nome de chamada dele, ou seja, para chamar um componente, utilizamos uma tag com o nome do selector

- Para um módulo identificar um componente, primeiro precisamos localziar o decorator @NgModule e declarar o componente lá.

**Importação e Exportação de Componentes:** No Angular, para utilizar um componente, logo após ele ser criado, precisamos referenciar a classe desse componente no seu respectivo módulo (dentro de um decorator **@NgModule**, na propriedade declarations).

- Um componente não pode ser referenciado em 2 ou mais módulos diferentes, isso dará um erro.

**Importação e Exportação de Módulos:** No angular, quando criamos um módulo e atribuimos componentes a esse módulo, podemos exportar o módulo e utilizar seus componentes em outros lugares. Para seus componentes serem exportados, realizamos isso através de 2 passos: 

1. primeiro precisamos importar o módulo 1 para dentro do módulo 2, através da propriedade **imports**.
2. voltando para o módulo 1, precisamos especificar os componentes que serão exportados, através de uma propriedade chamada **exports**, localizada dentro do @decorator. 

Agora com os componentes exportados e o módulo importado, podemos chamar suas tags dentro do HTML que necessita dos componentes importados.

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

**Importações de CSS:** Utilizando o **@use** ou **@forward** dentro de um arquivo **CSS** ou **SCSS**, podemos passar um caminho para esse import, e o angular poderá identificar que os arquivos estão conectados, dessa forma podemos ter 2 arquivos dinâmicos, onde em um nós criamos variáveis CSS/SCSS e outro podemos utilizar essas variáveis.

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

:host: O uso do :host é uma ferramenta muito útil quando utilizamos o ::ng-deep, pois ele permite utilizar o ::ng-deep apenas no componente referenciado, sem afetar o funcionamento de outros componentes filhos iguais. (é fazer uso do ::ng-deep sem a obrigação de especificar um seletor como class/id para especificamente editar um componente filho.)

## Encapsulamento de Estilos

View Encapsulation: Os view encapsulations são formas de encapsular (ordenar o comportamento) do CSS, permitindo abrir maior leque de funcionamentos para o comportamento da estilização no angular. Para atribuir um view encapsulation, o angular se orienta através da propriedade **encapsulation** que pode ser inserida dentro do decoration do componente.

1. ViewEncapsulation.None: Essa propriedade remove o comportamento padrão da estilização dos componentes, com essa propriedaed, todos os componentes receberão escopo global de estilização, então ao editar um, todos serão editados (como um @ng-deep geral sem o uso da anotação).

2. ViewEncapsulation.emulated: Essa é a propriedade padrão do angular (não definir um encapsulation irá marcar essa como padrão), onde estilização feita no componente, permanece no componente, amenos que seja especificada de maior relevância e/ou nos arquivos globais.

3. ViewEncapsulation.ShadowDom: Essa propriedade define que os componentes não sofrerão estilização de arquivos CSS globais, e poderão apenas ser editados por eles próprios ou por componentes pais (essa regra de shadow dom define também que não é necessário utilizar o @ng-deep para realizar as alterações em componentes filhos).

- Uma dica de estilização CSS é que quando definimos um seletor CSS usando nome de tag e id, podemos deixar unificados sem espaço o id/class quando nos referimos a estar diretamente ligada a classe passada, ou seja: 

minha-tag.minha_classe -> Referesse a uma tag do tipo minha-tag que possui a classe especificada
minha-tag .minha_classe -> referesse a uma tag qualquer com a classe minha_classe dentro de uma tag minha-tag

Atributo vs Propriedade: Atributos são elementos de complemento e modificação do HTML, como o id, class, type, etc... Ao ser criado um elemento HTML, o navegador cria um objeto para o elemento e define propriedades (valores de objetos) que podem ser acessados via JS.

- Podem parecer similares, mas atributos são complementos do elemento HTML escritos, já as propriedades são as representações via objeto desses atributos, as propriedades podem ser modificadas.

API do DOM: O DOM é uma árvore que estrutura o HTML de um site dentro do navegador, um browser possui uma API de acesso e modificação desse comportamento, em javascript, podemos acessar essa API através do document, como document.className(), isso quer dizer que estamos chamando o atributo class do documento HTML.

- Ao apertar f12, podemos ir para a sessão properties e acessar todos os atributos da API do browser.

## Angular Material

O angular Material é uma biblioteca de componentes prontos onde, basta apenas importar o componente para dentro do módulo e fazer uso dele, para instalar o angular material, podemos usar o **ng add @angular/material** e seguir os passos, após isso, buscamos na internet o componente adequado, importamos ele para dentro de um módulo e fazemos uso dele.

---

## Data Binding

É o termo dado para referenciar a sincronia entre variáveis da tela e da lógica, ela pode ser dividida em Interpolation, React databiding, Propery Databiding e two-way Databiding.

**Interpolation:** É a sincronia de dados de variáveis entre a view e a lógica para expressar algo na tela, podemos passar as variáveis ou funções que irão realizar o comportamento da view sem necessariamente chamar os elementos HTML, esse processo é feito através das **{{nome-da-variavel}}**.

- Na interpolação, se uma variável de tela retornar um valor undefined, o Angular não irá imprimir nada na tela (Dificil de debugar). Se utilizarmos um optional change, ele ainda não mostrará os valores undefined, mas irá reservar espaço na tela e não irá quebrar completamente o comportamento gráfico.  Optional Change -> **{{nome-da-variavel?}}**, ou também podemos definir um comparador ternário para validar.

**Property Binding:** O property binding é a utilização direcional do uso de variáveis para manipulação de propriedades do DOM, o Angular consegue recuperar o identificador do elemento e realizar manipulações no DOM via sessão com variáveis JS. Para fazer isso, usamos os [nome-da-propriedade]="nome-da-variavel". Podemos fazer algo como <<input [value]="valueInput">>, assim, sempre que editar o valor da variável, ele automaticamente irá atualizar a tela.

- O property Binding é unidirecional, ou seja, atualizar na tela um valor, não irá atualizar o valor da variável na classe, para isso, é necessário o Two-Way databinding

**Event Binding:** O event Binding é o uso de eventos do navegador para chamar funções dentro da classe. Esse comportamento é de chamada e funciona no sentido contrário do property binding(um atualiza a tela, outro atualiza o código), podemos chamar funções de reação e atribuir funções do JS para dar comportamento. Isso é feito através das (), ex: <<button value="Meu botão" (click)="showClick()">> 

- O nome das funções de eventos são chamadas removendo o termo 'on', onclick -> click, onpresskey -> presskey.

**Atribute Binding:** È uma forma similar de trabalhar como property binding, mas mudando os atributos e não as propriedades, isso é feito através da seguinte forma: [attr.nome-do-atributo]="nome-da-variavel"

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

---

## Comunicação Entre Componentes

**@Input:** O @Input é a forma de conseguir enviar uma informação de um componente pai para dentro de um componente filho, essa tag possui algumas propriedades e é utilizada junto a uma variável. Dentro da classe do componente filho, podemos inicializar uma variável com @Input e declara que o componente, na hora de ser escrito como tag, terá uma propriedade como nome da variável atribuida (ou o nome do alias). O valor atribuido a essa propriedade será capturado pela variável especificada no componente filho e poderá ser utilizada.

``` Typescript

// Componente filho

  @Input({alias: "labelCard", required: true}) labelCard: string = "";
  @Input({alias: "price", required: true}) price: number = 0.0;

// Tag do Componente Pai

    <app-card [labelCard]="variavel" [price]="variavel"></app-card>

```

**@Output:** O @Output é utilizado para fazer o sentido inverso do @Input, ele é utilizado na chamada de eventos e pode fazer a comunicação de Filho para Pai, Um componente filho pode enviar informações através de um emmiter para o componente pai da seguinte forma:

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

Hook: Um hook é um método que o Angular chama automaticamente de acordo com um determinado ciclo de vida de um componente

OnInit: O OnInit é uma interface que podemos implementar na classe do componente, e ao implementar ela nos **fornece um método ngOnInit()**, que podemos utilizar para realizar instruções logo quando o Angular carrega o sistema de **@Input** do componente.

ngOnChanges: 

AfterViewInit: Esse hook é chamado pelo Angular, sempre que o Angular realizar a renderização do template, é um processo posterior ao OnIni, pois primeiro ele irá carregar a estrutura do DOM e as diretivas.

- Se precisar fazer manipulação de elementos HTML logo ao iniciar o sistema, o OnInit não encontrará os elementos.


## Diretivas

As diretivas são **formas de manipulação do DOM**, elas podem ser classificadas em  **Diretivas de Atributo**(Manipulam valores e comportamento de elementos), **Diretivas Estruturais**(Manipulam a estrutura dos elementos do DOM) e **Diretivas Personalizadas**.

### Diretivas de Atributo

**NgClass:** Permite adicionar ou remover dinamicamente uma classe CSS.

**NgStyle:** Permite adicionar ou remover dinâmicamente um estilo CSS

**NgModel:** Cria a comunicação de bidirecional entre o template e a classe do componente (famoso two-way data binding).

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

<div *ngFor="let item of vetor; i = index"> <!-- Aqui definimos uma variável que representará o item na posição do index e o vetor -->
  <h1>{{i}} - {{item}}</h1> <!-- Isso irá mostrar a interpolação entre o index e o item (poderia ser um objeto e representariamos a propriedade do item) -->
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

@HostListener: Podemos criar diretivas que reagem a eventos do usuário quando necessário, para realizar essa interação, temos o **@HostListener(nome-do-evento)**, que ficará escutando o evento especificado e irá executar a função na qual está atrelado

```typescript

@HostListener('mouseenter') onMouseEnter() {
  elRef.nativeElement.style.background = 'green';
}

@HostListener('mouseleave') onMouseLeave() {
  elRef.nativeElement.style.background = 'pink';
}

```

@HostBinding: Também podemos associar propriedades a uma variável, isso é interessante quando queremos trabalhar com diretivas sem precisar ficar chamando o nativeElement a todo momento, o @HostBinding() funciona similar ao @HostListener, mas é atribuido a uma variável.

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

Template Variables: Template Variables são variáveis que podemos criar dentro de elementos HTML (dentro do template) que fará referência ao próprio elemento ou a uma diretiva, ou seja, se eu tiver um elemento <<input type="text">> eu posso atribuir uma variável a ele que conseguirá fazer referência a ele mesmo, ficando assim: **input type="text" #myVariable**, podemos acessar essa variável em qualquer momento dentro do template e dentro de seu escopo.

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

@ViewChild(): Esse decorator tem a capacidade de inicializar uma variável no typescript e atribuir a essa variável, a referência ao objeto do elemento HTML, dessa forma, podemos manipular uma variável que armazena um elemento HTML dentro da nossa classe/metodo.

``` Typescript

<input type="text" #meuInput>

@ViewChild('meuInput')
meuInput!: ElementRef<HtmlInputElement>;

this.meuInput.nativeElement.value = 'valor atualizado';

```
@ViewChildren(): O ViewChildren é uma forma de conseguir capturar valores filhos de um elemento. Podemos por exemplo, ter um botão com for e os botões dentro do for pode ser capturado com o @viewChildren(), ele irá retornar uma lista de elementos que podem ser manipulados individualmente.

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

WildCard: 