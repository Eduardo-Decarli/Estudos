# Leitura e Escrita com BufferedReader e BufferedWriter

são classes utilizadas para manipulação de arquivos de texto de maneira eficiente, proporcionando uma leitura e escrita mais rápidas do que usando apenas **FileReader** e **FileWriter**.

**BufferedReader:** Usado para ler texto de maneira eficiente, utilizando um buffer interno. Ele permite ler linhas completas de um arquivo de forma mais rápida, evitando que o programa precise acessar o disco repetidamente.

**BufferedWriter:** Usado para escrever texto de maneira eficiente, também utilizando um buffer interno. Ele grava os dados em um arquivo de forma mais eficiente, minimizando o número de acessos ao disco.

Ambas as classes são mais adequadas para manipulação de arquivos de texto, pois leem e escrevem caracteres, enquanto as classes **InputStream** e **OutputStream** são para dados binários.

## Conceitos Fundamentais

**BufferedReader:** Ler dados de arquivos ou outras fontes de entrada de maneira eficiente.

- readLine(): Lê uma linha de texto.
- read(): Lê um único caractere.
- close(): Fecha o fluxo de leitura.

**BufferedWriter:** Escrever dados de maneira eficiente em arquivos ou outras saídas de texto.

- write(String str): Escreve uma string no arquivo.
- newLine(): Insere uma nova linha (equivalente ao caractere de nova linha).
- flush(): Garante que todos os dados no buffer sejam escritos.
- close(): Fecha o fluxo de escrita.

``` Java

// Exemplo com BufferedReader (Leitura de Arquivo)

import java.io.*;

public class BufferedReaderExample {
    public static void main(String[] args) {
        BufferedReader reader = null;

        try {
            // Cria um BufferedReader para ler o arquivo
            reader = new BufferedReader(new FileReader("exemplo.txt"));

            String linha;
            // Lê o arquivo linha por linha
            while ((linha = reader.readLine()) != null) {
                System.out.println(linha);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // Fecha o BufferedReader
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

// Exemplo com BufferedWriter (Escrita em Arquivo)

import java.io.*;

public class BufferedWriterExample {
    public static void main(String[] args) {
        BufferedWriter writer = null;

        try {
            // Cria um BufferedWriter para escrever no arquivo
            writer = new BufferedWriter(new FileWriter("saida.txt"));

            // Escreve algumas linhas no arquivo
            writer.write("Primeira linha de texto.");
            writer.newLine(); // Adiciona uma nova linha
            writer.write("Segunda linha de texto.");
            writer.newLine();
            writer.write("Terceira linha de texto.");

            System.out.println("Texto escrito com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // Fecha o BufferedWriter
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```

## Boas Práticas

- **Use buffers sempre que possível:** O uso de BufferedReader e BufferedWriter melhora significativamente a performance ao lidar com arquivos de texto grandes, pois eles fazem a leitura e escrita em blocos ao invés de acessos individuais ao disco.

- **Sempre feche os fluxos de I/O:** Como em outros tipos de fluxos, é fundamental fechar os recursos após o uso para evitar vazamentos de memória ou problemas de desempenho. A forma mais segura de fazer isso é utilizando **try-with-resources**.

- **Use newLine() para compatibilidade entre sistemas operacionais:** Diferentes sistemas operacionais usam diferentes sequências para nova linha (por exemplo, \n no Linux e \r\n no Windows). O método **newLine()** resolve isso automaticamente.

- **Evite escrever ou ler de uma vez grandes volumes de dados:** Isso pode consumir muita memória. Prefira ler ou escrever em blocos (linhas ou buffers), especialmente para arquivos grandes.

- **Trate exceções de I/O:** As exceções como **IOException** podem ocorrer frequentemente durante a leitura ou escrita de arquivos. Certifique-se de tratá-las adequadamente para não interromper o funcionamento do seu programa.