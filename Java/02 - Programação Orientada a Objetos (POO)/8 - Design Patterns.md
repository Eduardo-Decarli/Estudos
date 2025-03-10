# Design Patterns

Padrões de projeto (Design Patterns) são soluções comprovadas para problemas comuns de design de software. Eles ajudam a criar sistemas mais flexíveis, reutilizáveis e fáceis de manter. Existem muitos padrões de projeto, mas vamos explorar alguns dos mais conhecidos, divididos em três categorias principais: criacionais, estruturais e comportamentais.

## Padrões Criacionais

Esses padrões tratam da criação de objetos, ajudando a abstrair o processo de instanciamento. Temos os tipos seguintes padrões e para um projeto, é recomendado utilizar ao menos um deles:

**Singleton:** O Singleton é um padrão de criação que garante a existência de apenas uma instância de uma classe e proporciona um ponto global de acesso a ela. 
Este padrão ajuda a controlar a criação de objetos únicos, evitando o problema de ter múltiplas instâncias desse objeto no sistema. O livro ressalta a importância de garantir a inicialização preguiçosa da instância para otimizar a eficiência.

``` Java

public class Singleton {
    private static Singleton instanciaUnica;

    private Singleton() {}

    public static Singleton getInstancia() {
        if (instanciaUnica == null) {
            instanciaUnica = new Singleton();
        }
        return instanciaUnica;
    }
}

```

**Factory Method:** O Factory Method é um padrão de criação que define uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados.

A flexibilidade proporcionada pelo Factory Method, permite que uma classe delegue a responsabilidade de criar instâncias para suas subclasses, proporcionando uma extensibilidade eficiente.

``` Java

interface Produto {
    void operacao();
}

class Criador {
    public Produto criar() {
        return new ProdutoConcreto();
    }
}

class ProdutoConcreto implements Produto {
    @Override
    public void operacao() {
        System.out.println("Operação do Produto Concreto");
    }
}

```

**Abstract Factory:** Fornece uma interface para criar famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.

``` Java

public interface FabricaAbstrata {
    ProdutoA criarProdutoA();
    ProdutoB criarProdutoB();
}

```

## Padrões Estruturais

Esses padrões tratam da composição de classes e objetos para formar estruturas maiores.

**Adapter:** Permite que interfaces incompatíveis trabalhem juntas, convertendo a interface de uma classe em outra esperada pelos clientes.

``` Java

public interface Alvo {
    void metodoAlvo();
}

public class Adaptador implements Alvo {
    private Adaptee adaptee;

    public Adaptador(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void metodoAlvo() {
        adaptee.metodoExistente();
    }
}

```

**Decorator**: Adiciona responsabilidades a objetos dinamicamente, fornecendo uma alternativa flexível à subclasse.

``` Java

public interface Componente {
    void operacao();
}

public class DecoradorConcreto implements Componente {
    private Componente componente;

    public DecoradorConcreto(Componente componente) {
        this.componente = componente;
    }

    @Override
    public void operacao() {
        componente.operacao();
        // Adiciona comportamento extra
    }
}

```

**Composite:** Compõe objetos em estruturas de árvore para representar hierarquias parte-todo, permitindo que clientes tratem objetos individuais e composições de objetos de maneira uniforme.

``` Java

public interface Componente {
    void operacao();
}

public class Composto implements Componente {
    private List<Componente> filhos = new ArrayList<>();

    public void adicionar(Componente componente) {
        filhos.add(componente);
    }

    @Override
    public void operacao() {
        for (Componente filho : filhos) {
            filho.operacao();
        }
    }
}

```

## Padrões Comportamentais

Esses padrões tratam da comunicação entre objetos.

**Observer:** Define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente.

``` Java

public interface Observador {
    void atualizar();
}

public class Sujeito {
    private List<Observador> observadores = new ArrayList<>();

    public void adicionarObservador(Observador observador) {
        observadores.add(observador);
    }

    public void notificarObservadores() {
        for (Observador observador : observadores) {
            observador.atualizar();
        }
    }
}

```

**Strategy:** Define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis. Permite que o algoritmo varie independentemente dos clientes que o utilizam.

``` Java

public interface Estrategia {
    void executar();
}

public class Contexto {
    private Estrategia estrategia;

    public Contexto(Estrategia estrategia) {
        this.estrategia = estrategia;
    }

    public void executarEstrategia() {
        estrategia.executar();
    }
}

```

**Command:** Encapsula uma solicitação como um objeto, permitindo parametrizar clientes com diferentes solicitações, enfileirar ou registrar solicitações e suportar operações que podem ser desfeitas.

``` Java

public interface Comando {
    void executar();
}

public class Invocador {
    private Comando comando;

    public void definirComando(Comando comando) {
        this.comando = comando;
    }

    public void executarComando() {
        comando.executar();
    }
}

```

Padrões de projeto são ferramentas poderosas para resolver problemas comuns de design de software. Eles ajudam a criar sistemas mais robustos, flexíveis e fáceis de manter. A escolha do padrão adequado depende do problema específico que você está tentando resolver.