TypeScript: É um superset para o JavaScript, ou seja, uma forma de mascarar a programação do javascript para uma forma mais fortemente tipada e escapando um pouco das regras e convenções naturais da linguagem. O TypeScript pode ser utilizado a partir da instalação via npm rodando o comando ``npm install typescript --save-dev``. 

Compilação Typescript para JavaScript: O TypeScript pode ser compilado e convertido para JavaScript utilizando o seguinte comando:

``` bash

npx tsc

```

Isso fará a geração de uma arquivo .js contendo o novo código gerado a partir do typescript

- Por padrão, ao realizar o comando de instalação, será gerado os arquivos do node e utilitários de dependências, podemos dar o comando ``npx tsc --init`` para que o npx possa nos servir o arquivo de configuração do typescript

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