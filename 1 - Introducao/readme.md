# Introdução ao Java

Java é uma linguagem de programação orientada a objetos amplamente utilizada para desenvolvimento de aplicações em diversas plataformas, como desktops, dispositivos móveis e servidores. Ela foi criada pela Sun Microsystems em 1995 e hoje pertence à Oracle. Java é conhecida por sua portabilidade, ou seja, a capacidade de "escrever uma vez, rodar em qualquer lugar" (WORA - "Write Once, Run Anywhere").

## Características principais do Java

### 1. **Portabilidade**
O Java é compilado para bytecode, que pode ser executado em qualquer sistema operacional que possua a JVM (Java Virtual Machine). Isso permite que o mesmo código funcione em diferentes plataformas, como Windows, Linux ou Mac.

### 2. **Orientação a Objetos**
Java é uma linguagem orientada a objetos, o que significa que tudo no Java é baseado em "objetos" que interagem entre si. Isso permite modularidade e reuso de código.

### 3. **Simplicidade e Facilidade de Uso**
Java possui uma sintaxe clara e limpa, eliminando complexidades presentes em outras linguagens como C++. Além disso, o gerenciamento automático de memória com o **garbage collector** simplifica a alocação e desalocação de memória.

### 4. **Segurança**
O Java possui recursos de segurança robustos que protegem aplicações de possíveis ataques, especialmente ao rodar em ambientes distribuídos, como na web.

### 5. **Multithreading**
Java permite que programas realizem várias tarefas ao mesmo tempo usando threads, o que é útil para aumentar a eficiência de programas que realizam múltiplas operações simultaneamente.

### 6. **Desempenho**
Embora o Java não seja tão rápido quanto linguagens compiladas diretamente como C ou C++, ele oferece um desempenho excelente graças à otimização da JVM.

## Como o Java funciona

### 1. **Compilação**
O código Java é escrito em arquivos `.java`, que são compilados pelo **javac** (Java Compiler) para gerar bytecode. O bytecode é um código intermediário que não é específico de um sistema operacional, mas sim da JVM.

Exemplo de código Java:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

```

### 2. **Armazenamento dos ByteCode**

Os arquivos .class gerados pelo javac contêm o bytecode do programa. Esses arquivos são armazenados no mesmo diretório onde o código fonte estava, a menos que você tenha especificado um diretório diferente.

### 3. **Execução do ByteCode**

Para executar o bytecode, você usa a Java Virtual Machine (JVM), que interpreta e executa o bytecode. O comando java é utilizado para iniciar a JVM e executar o programa.