# Sumário

[Conceitos Fundamentais](#conceitos-fundamentais)   
[Ambiente Inicial](#ambiente-inicial)   
[TSConfig.ts](#tsconfigts)

# Conceitos Fundamentais

**TypeScript:** É um superset para o JavaScript, ou seja, uma forma de mascarar a programação do javascript para uma forma mais fortemente tipada e escapando um pouco das regras e convenções naturais da linguagem. O TypeScript pode ser utilizado a partir da instalação via npm rodando o comando ``npm install typescript --save-dev``. 

- O typescript é um dos projetos que mais possuem contribuições no GitHub.

**JavaScript XML (JSX):** É uma extensão do JavaScript que permite escrever código muito semelhante ao HTML dentro de um arquivo de lógica, foi criado pela equipe do **React** para facilitar a criação de **Interfaces de Usuários (UI)**.

- **Combinação de Lógica e Visual:** Permite criar o comportamento e a estrutura visual em um mesmo ambiente (no mesmo lugar).

- **Uso de Chaves({}):** Pode-se incorporar qualquer expressão javascript apenas utilizando chaves no arquivo de código.

- **Leitura do Navegador:** O navegador não irá ler o JSX e sim um código montado por um processo de transpilação que converte o JSX em chamadas de função JavaScript, como variable.createElement().


``` javascript

// Exemplo de código JSX
const nome = "Maria";
const elemento = <h1>Olá, {nome}!</h1>;

// Após a Conversão
const elemento = React.createElement('h1', null, 'Olá, ', nome, '!');

```

- **Compilação Typescript para JavaScript:** O TypeScript pode ser compilado e convertido para JavaScript utilizando o seguinte comando:

``` bash

npx tsc

```

Isso fará a geração de uma arquivo .js contendo o novo código gerado a partir do typescript

- Por padrão, ao realizar o comando de instalação, será gerado os arquivos do node e utilitários de dependências, podemos dar o comando ``npx tsc --init`` para que o npx possa nos servir o arquivo de configuração do typescript

# Ambiente Inicial

O typescript é instalado através do Node.JS, para isso, precisa-se dele instalado no dispositivo para dar início ao processo de configuração de ambiente do typescript. No site do TypeScript, há uma área de instação global onde possui as linhas de comando necessárias para baixar o typescript usando o NPM.

``` bash

# Baixa a ultima versão do typescript de forma global
npm install -g typescript

# Verificar a versão do TypeScript
tsc --version

```

# TSConfig.ts

O arquivo TSConfig.ts é um arquivo de configuração interna do próprio Typescript que é gerado quando inicializamos um projeto typescript. Ele apresenta uma estrutura simples em um arquivo .json demonstrada da seguinte forma:

``` json

{
    // O compilerOptions define as opções/configurações que o compilador irá seguir para compilar
    "compilerOptions":{
        "lib": ["es2015"],
        "module": "commonjs",
        "outDir": "dist",   // Define a pasta onde o JavaScript transpilado ficará armazenado
        "sourceMap": true,
        "strict": true,     // Define como verdadeiro o uso das verificações de tipos durante o processo de transpilação
        "target": "es2015"  // Define a versão do JavaScript transpilado
    },
    // O include define onde o typescript irá procurar arquivos typescript para transpilar
    "include": [
        "src"
    ],
    // Define pastas e arquivos que serão excluidos da verificação e busca para transpilar
    "exclude": [

    ]
}

```

Para mais informações sobre o uso do TSConfig.json, pode-se utiliar o site oficial do typescript para consultar configurações: [Site Oficial das referências do TSConfig.json](https://www.typescriptlang.org/tsconfig/#references).

# Comandos TypeScript

Para realizar ações dentro do TypeScript, devemos fazer uso do terminal e das linhas de comando que o próprio software do npm e do typescript (tsc) oferecem para nós:

``` bash

tsc ./app.ts    # Realiza a Transpilação de um arquivo específico que seja .ts
tsc --init      # Inicializa o typescript no diretório atual e cria o arquivo tsconfig.json

```

## Tipos de dados em TypeScript

String: Utilizado para definir sequencia de caracteres
Number: Representa Integer e Float 
Boolean: Representa true ou false
BigInt: Representa valores maiores que 2⁵³ - 1; é necessário identificar com um 'n' no final do número.
Symbol: Utilizado para representar o tipo Symbol, ou seja, um identificador único de objetos.

- Em typescript existem duas formas de declarar tipos de variáveis, a forma declarativa explícita e a inferência, usamos o tipo atribuido quando explicitamente falamos o tipo da variável e a forma inferência quando deixamos o contexto interpretar que variável terá que ser usada.

``` typescript

// Tipo explícito
let age: number = 23;

function dizOi(nome: string, sobrenome: string): void {
    return nome + " " + sobrenome + ", Olá";
}

// Tipo inferência
let nome = "Eduardo";

nome = 100 // Erro de conversão, o TS entende o contexto

function dizOi(nome, sobrenome) {
    return null;
}

```

- Se uma variável for declarada sem valor, o typescript declara ela como any, e ela acaba fugindo do contexto de tipagem, então ela pode receber tipos diferentes em diferentes chamadas (será um bug da linguagem?).

**Any e Void:** Em Typescript, pode-se determinar que o retorno de uma variável ou função é do tipo any ou void, o tipo any determina qualquer retorno, seja numero, string, vetor ou misturado, semelhante ao comportamento do JS, e tipo void não retorna nada.

- Se utilizar um comentário e definir **@ts-ignore** acima de uma variávei, o typescript irá ignorar a validação de tipo da variável

## Definição de Variáveis

``` typescript

// Definição de variáveis
let nome: string = "Eduardo";

// Definição de Funções
function mostraNome(nome :string, sobrenome?:string): string {
    return nome + " " + sobrenome;
}

```

---

Restrição de Valores: No Typescript, podemos passar valores limitados para uma variável, onde a variável só poderá receber um conjunto restrito de valores, isso é feito através da atribuição usando um pipe, podemos fazer assim -> minhaVariavel: 'branco' | 'preto' = 'branco'; Isso define que a minhaVariavel só poderá receber branco ou preto como valores e por default, atribuimos branco como valor de inicialização.

Interfaces: As interfaces no Typescript representam um contrado, onde quem as implementa é obrigado a seguir suas definições de métodos ou propriedades, uma interface pode ser utilizada para definir como uma classe deve implementar os métodos ou quais atributos um objeto deve ter.

``` typescript

interface Pessoa {
    nome: string,
    idade: number,
    sexo: string = 'masculino' | 'feminino'
}

class ImplementaPessoa {

    const pessoa: Pessoa = {
        nome: 'Eduardo',
        idade: 21,
        sexo: 'masculino'
    }
}