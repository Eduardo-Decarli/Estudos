# Streams de Entrada e Saída (InputStream, OutputStream)

As Streams são abstrações de fluxo de dados em Java. Elas representam uma sequência de bytes ou caracteres sendo lidos ou gravados de forma sequencial. Em Java, as Streams são divididas em dois tipos principais:

**InputStream:** Para leitura de dados (entrada).
**OutputStream:** Para escrita de dados (saída).

Essas classes são fundamentais quando você precisa trabalhar com dados binários, como arquivos binários ou comunicação de rede.

**InputStream:** Representa um fluxo de entrada de dados (bytes)

Principais classes filhas

- FileInputStream: Lê dados de um arquivo.
- BufferedInputStream: Adiciona um buffer de memória para leitura mais eficiente.
- ByteArrayInputStream: Lê dados de um array de bytes.

Métodos principais

- read(): Lê o próximo byte de dados.
- read(byte[] b): Lê uma sequência de bytes e os coloca em um array.
- close(): Fecha o fluxo de entrada.

**OutputStream(Escrita de Dados):** Representa um fluxo de saída de dados (bytes)

Principais classes filhas

- FileOutputStream: Escreve dados em um arquivo.
- BufferedOutputStream: Escreve dados de forma mais eficiente, utilizando um buffer.
- ByteArrayOutputStream: Escreve dados em um array de bytes.

Métodos principais

- write(int b): Escreve um byte de dados.
- write(byte[] b): Escreve um array de bytes.
- flush(): Garante que todos os dados tenham sido escritos no destino.
- close(): Fecha o fluxo de saída.

``` Java

// Exemplo com FileInputStream e FileOutputStream

import java.io.*;

public class StreamExample {
    public static void main(String[] args) {
        FileInputStream inputStream = null;
        FileOutputStream outputStream = null;
        
        try {
            // Cria streams de entrada e saída
            inputStream = new FileInputStream("origem.txt");
            outputStream = new FileOutputStream("destino.txt");

            int byteLido;
            // Lê os bytes e escreve no arquivo de destino
            while ((byteLido = inputStream.read()) != -1) {
                outputStream.write(byteLido);
            }

            System.out.println("Arquivo copiado com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // Fechando os fluxos
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

// Exemplo com BufferedInputStream e BufferedOutputStream

import java.io.*;

public class BufferedStreamExample {
    public static void main(String[] args) {
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("origem.txt"));
             BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("destino.txt"))) {

            int byteLido;
            // Lê os bytes e escreve no arquivo de destino
            while ((byteLido = bis.read()) != -1) {
                bos.write(byteLido);
            }

            System.out.println("Arquivo copiado com buffer com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

## Boas Práticas

- **Use buffers quando possível:** A utilização de **BufferedInputStream** e **BufferedOutputStream** melhora a performance de leitura e escrita, especialmente quando lidamos com grandes volumes de dados.

- **Sempre feche os fluxos de I/O:** Não fechar um **InputStream** ou **OutputStream** pode causar vazamentos de recursos. Utilize **try-with-resources** para garantir o fechamento automático.

- **Evite ler ou escrever dados em grandes blocos de uma vez só**, especialmente se os arquivos forem grandes. Isso pode consumir muita memória. Prefira ler em partes, utilizando buffers.

- **Lidar com exceções:** As operações de **I/O** podem gerar várias exceções, como **FileNotFoundException** e **IOException**. Certifique-se de tratá-las adequadamente.

- Evite o uso de **read()** em loops em excesso, pois pode ser ineficiente. Utilize métodos que leem arrays de bytes ou caracteres para processar dados de forma mais eficiente.