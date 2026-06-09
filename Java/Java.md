# Sumário

[Roadmap de Java](https://roadmap.sh/java)

# JDK

O JDK é um SDK específico feito para desenvolver programas em Java. Dentro do JDK podemos encontrar um JRE (Java Runtime Environment) e um Kit de ferramentas de desenvolvimento.

JRE -> Significa Java Runtime Environment, e dentro desse ambiente, podemos encontrar a JVM e a biblioteca básica do próprio Java, como a java.lang, java.io, java.util ou até a java.net.

Kit de Desenvolvimento Java -> Esse kit fornece o compilador Javac, Jar, Javadoc, JDB, JavaP, KeyTool e Jarsigner. 

# LifeCicle do Java

Para um programa Java ser desenvolvido, ele passa por diversas etapas e processos para transformar um código-fonte em algo intendível pelo computador.

1. Escrita -> Na primeira etapa, o código Java é escrito através de um editor de código ou IDE (Integrated Development Enviroment), aqui o arquivo possui o código-fonte e é armazenado no formato ***.java***. Para as IDEs, temos exemplos como **IntelliJ EDEA**, **Eclipse** e **NetBeans**. Também podemos encontrar o **Spring Tools (STS)**, que é especializada em desenvolvimento com Spring, foi baseado no Eclipse e fornece suporte para rodar dentro do Eclipse, vsCode e Theia.

2. Compilação -> O segundo estado que encontramos, é o estado de arquivo compilado, pelo qual o código-fonte passa pelo processo de compilação do javac (compilador java) e armazena os novos dados, chamados de ***Bytecodes*** dentro de novos arquivos chamados ***.class***.

``` bash

javac NomeDoArquivo.java                            # Aqui nós chamamos o Javac para realizar a compilação do arquivo, gerando um novo arquivo.class
javac NomeDoArquivo.java -d <diretorio>             # Aqui podemos definir um diretório onde deverá salvar os arquivos .class que foram gerados
javac NomeDoArquivo.java -sourcepath <diretorio>    # Aqui podemos definir o local em que o javac recuperará o arquivo .java para realizar a compilação
javac NomeDoArquivo.java --encoding <nome>          # Aqui podemos definir a codificação dos caracteres do arquivo, como por exemplo, UTF-8

```

- Para melhor entendimento de como funciona a compilação em Java, é altamente recomendada realizar uma matéria ou curso referente a compiladores.

3. Carregamento -> O próximo passo é o processo de carregamento, onde a Java Virtual Machine (JVM) carrega as classes necessárias na memória. Ou seja, os arquivos bytecodes que estavam presentes dentro dos .class agora são carregados e jogados dentro da memória primária.

4. Validação -> Essa etapa ocorre simultaneamente com a etapa 3, pois a medida que os arquivos são carregados na memória primária, a JVM verifica e valida as classes que foram colocadas dentro da memória principal, na intenção de localizar violações de restrições ou erros de compilação.

5. Execução -> Aqui a JVM executa os ***bytecodes*** utilizando uma combinação de interpretação, chamada de compilação ***JIT (Just-In-Time)***, também conhecido como compilador **Java HotSpot**. A JVM pega os bytecodes dentro da memória primária, compila eles para a linguagem de computador (sendo muito próximo ou equivalente ao **Assembly** da CPU) e dessa forma, temos o código final.

---

# Optionals

Um Optional é uma classe Java que permite facilitar o trabalho com objetos que podem ser nulos e evitar o ***NullPointerException***. Ele foi introduzido no Java 8 e possui diversas utilidades.

Um Optional é uma classe que contem um tipo genérico, que representa o dado que você quer utilizar, dentro do Optional, existem alguns métodos no quais podemos utilizar para facilitar o desenvolvimento desses objetos com possibilidade de serem nulos.

O objetivo do Optional é permitir o desenvolvimento de objetos null de forma estratégica e não como um acidente.

Criação de um Optional:

- Optional.of(valor) -> Use quando o null e lógicamente impossível de ocorrer

- Optional.ofNullable(valor) -> Use quando o valor pode ser null.

- Optional.empty() -> Declara explicitamente a ausencia de um valor, ou seja, retorna null.

Verificação

- isPresent() -> Verifica se um Optional contem ou não um valor != null;

- ifPresent() -> Executa uma ação caso exista um valor

- ifPresentOrElse(ação, alternativa) -> Realiza uma ação caso houver a presença e outra ação caso não houver a presença.

Acesso do Valor

- get() -> Retorna o valor contido dentro da variável, ele pode retornar null se for o caso

- orElse(valorPadrão) -> Retorna um valor padrão caso for null.

- orElseThrow() -> lança um exception caso o valor retorne null.

- orElseThrow(exceção) -> Retorna uma exception personalizada.

- Caso for utilizar o get(), faça uma verificação utilizando isPresent().

---

# Abstract Class

Uma classe abstrata serve como um "molde" ou superclasse base. A classe abstrata sempre participará de uma herança e serve para ser herdada, para que as classes filhas sempre à utilizem como modelo, onde todos os métodos e propriedades dentro da classe abstrata serão obrigatóriamente implementadas pelas classes filhas.

- A classe abstrata não pode ser instanciada, ou seja, não pode utilizar diretamente o new.
- Utiliza a palavra chave ***Abstract*** para declarar uma classe abstrata
- Os métodos dentro da classe podem ser abstratos também, onde não podem possuir corpo, e servem como contrato para as classes filhas criarem.
- Podem ter métodos concretos, onde são herdados diretamente pelas classes filhas.

``` java

// Declaração da classe abstrata
public abstract class Animal {                 
    protected String nome;                                      

    public Animal(String nome) {
        this.nome = nome;
    }

    // Método concreto (comum a todos os animais)
    public void dormir() {
        System.out.println(nome + " está dormindo zzz");
    }

    // Método abstrato (sem corpo - cada animal faz de um jeito)
    public abstract void emitirSom();                       
}

// Classe concreta que herda a classe abstrata
public class Cachorro extends Animal {

    public Cachorro(String nome) {
        super(nome);
    }

    // Implementação obrigatória do método abstrato
    @Override
    public void emitirSom() {
        System.out.println(nome + " faz: Au au!");
    }
}

```

# Classe IO

## File Class

Essa é a classe do java que representa arquivos e diretórios de disco. Essa classe não abre arquivos de dados e não possui capacidade de processar os dados dentro de arquivos. A classe File possui 4 construtores diferentes.

``` java

public File(String name) // Especifica o name de um arquivo ou diretório para associar com o objeto instanciado
public File(String pathtoname, String name) // Utiliza o pathtoname para localizar o arquivo pelo name
public File(File directory, String name) // Utiliza um objeto File como diretório para localizar um arquivo
public File(URI uri) // Utiliza um objeto URI para localizar o arquivo

```

A classe File possui diversos métodos utilitários que permitem manipular arquivos dentro do dispositivo.

``` java 

boolean canRead()           // retorna true se o aplicativo pode ler o arquivo especificado; false, caso contrário;
boolean canWrite()          // retorna true se o aplicativo pode modificar o arquivo especificado; false, caso contrário;
boolean delete()            // exclui o arquivo ou diretório especificado pelo aplicativo retornando true se a exclusão foi realizada com sucesso; false, caso contrário;
boolean exits()             // retorna true se o nome usado como argumento no construtor File indica um arquivo ou diretório existente; false, caso contrário;
String getAbsolutePath()    // retorna uma String com o caminho absoluto do arquivo ou diretório. Um caminho absoluto contém o caminho completo com todos os diretórios desde o diretório-raiz até o arquivo ou o diretório especificado;
String getName()            // retorna uma String com o nome do arquivo ou diretório;
String getParent()          // retorna uma String com o diretório-pai do arquivo ou diretório;
String getPath()            // retorna uma String com o caminho do arquivo ou diretório;
boolean isFile()            // retorna true se o nome usado como argumento no construtor File é um arquivo; false, caso contrário;
boolean isDirectory()       // retorna true se o nome usado como argumento no construtor File é um diretório; false, caso contrário;
long lastModified()         // retorna um inteiro longo que representa a data/hora em que o arquivo ou diretório foi modificado pela última vez;
long length()               // retorna o comprimento do arquivo em bytes. Se for um diretório, o valor 0 será retornado;
String[] list()             // retorna um array de strings com os nomes de arquivos e diretórios que representam o conteúdo de um diretório. Retorna null se o objeto File for um arquivo;
boolean mkdir()             // cria o diretório especificado pelo aplicativo retornando true se a operação foi realizada com sucesso; false, caso contrário;
boolean mkdirs()            // cria toda a estrutura do diretório especificado pelo aplicativo retornando true se a operação foi realizada com sucesso; false, caso contrário.

```

# Java Net

O pacote java.net fornece classes com métodos que permite o programador implementar aplicações com rede em java, divide as classes em 2 aspectos, o **nível de socket** (transmissão de dados) e o **alto nível** (URLs e URIs).

As principais classes desse pacote incluem:

- Socket -> Implementa sockets TCP para conexão bidirecional
- ServerSocket -> Implementa sockets TCP do lado do servidor
- DatagramSocket -> Representa um socket para envio e recepção de pacotes UDP
- DatagramPacket -> Representa o pacote de dados enviado ou recebido via UDP.
- URI -> Representa um Uniform Resource Identifier genérico.
- URL -> Representa um Uniform Resource Locator e permite acessar recursos na web.
- InetAddress -> Abstração que representa um endereço IP (tanto IPv4 quanto IPv6).