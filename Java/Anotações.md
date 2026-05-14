# LifeCicle do Java

Para um programa Java ser desenvolvido, ele passa por diversas etapas e processos para transformar um código-fonte em algo intendível pelo computador.

1. Na primeira etapa, o código Java é escrito através de um editor de código ou IDE (Integrated Development Enviroment), aqui o arquivo possui o código-fonte e é armazenado no formato ***.java***. Para as IDEs, temos exemplos como **IntelliJ EDEA**, **Eclipse** e **NetBeans**. Também podemos encontrar o **Spring Tools (STS)**, que é especializada em desenvolvimento com Spring, foi baseado no Eclipse e fornece suporte para rodar dentro do Eclipse, vsCode e Theia.

2. O segundo estado que encontramos, é o estado de arquivo compilado, pelo qual o código fonte passa pelo processo de compilação do javac (compilador java) e armazena os dados dos arquivos dentro de novos arquivos chamados ***.class***.

``` bash

javac NomeDoArquivo.java                            # Aqui nós chamamos o Javac para realizar a compilação do arquivo, gerando um novo arquivo.class
javac NomeDoArquivo.java -d <diretorio>             # Aqui podemos definir um diretório onde deverá salvar os arquivos .class que foram gerados
javac NomeDoArquivo.java -sourcepath <diretorio>    # Aqui podemos definir o local em que o javac recuperará o arquivo .java para realizar a compilação
javac NomeDoArquivo.java --encoding <nome>          # Aqui podemos definir a codificação dos caracteres do arquivo, como por exemplo, UTF-8

```

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
