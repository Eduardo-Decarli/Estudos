# O que é e para que serve?

A manipulação de arquivos em Java envolve o uso de classes para criar, ler, modificar e excluir arquivos no sistema de arquivos. As principais classes para manipulação de arquivos são File e Files, ambas fornecidas pela biblioteca padrão do Java.

**File:** Permite interagir com o sistema de arquivos, verificando, criando, renomeando ou excluindo arquivos e diretórios.
**Files:** Introduzida no Java 7 como parte do pacote java.nio.file, oferece funcionalidades adicionais para ler, escrever e manipular arquivos de maneira mais eficiente e flexível, com melhor suporte para I/O não-bloqueante.

## Conceitos Fundamentais

Classe File: Representa arquivos ou diretórios no sistema de arquivos.

- createNewFile(): Cria um novo arquivo no sistema.
- delete(): Deleta o arquivo ou diretório.
- exists(): Verifica se o arquivo ou diretório existe.
- renameTo(): Renomeia o arquivo ou diretório.
- isDirectory(): Verifica se é um diretório.

Classe Files: Oferece métodos utilitários para leitura, escrita e manipulação de arquivos.

- readAllLines(): Lê todas as linhas de um arquivo de texto.
- write(): Escreve dados em um arquivo.
- copy(): Copia um arquivo de um lugar para outro.
- move(): Move um arquivo.
- delete(): Exclui um arquivo.
- exists(): Verifica se o arquivo existe.

``` Java

// Criando e verificando arquivos com File

import java.io.File;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) {
        File file = new File("exemplo.txt");

        // Verifica se o arquivo já existe
        if (!file.exists()) {
            try {
                // Cria o arquivo
                if (file.createNewFile()) {
                    System.out.println("Arquivo criado: " + file.getName());
                }
            } catch (IOException e) {
                System.out.println("Erro ao criar o arquivo.");
                e.printStackTrace();
            }
        } else {
            System.out.println("O arquivo já existe.");
        }
    }
}

// Lendo e Escrevendo arquivos com Files

import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class FilesExample {
    public static void main(String[] args) {
        Path path = Paths.get("exemplo.txt");

        // Escreve no arquivo
        try {
            Files.write(path, "Olá, mundo!".getBytes(), StandardOpenOption.CREATE);
            System.out.println("Texto escrito com sucesso.");
        } catch (IOException e) {
            System.out.println("Erro ao escrever no arquivo.");
            e.printStackTrace();
        }

        // Lê o conteúdo do arquivo
        try {
            List<String> linhas = Files.readAllLines(path);
            for (String linha : linhas) {
                System.out.println(linha);
            }
        } catch (IOException e) {
            System.out.println("Erro ao ler o arquivo.");
            e.printStackTrace();
        }
    }
}

```

## Boas Práticas

- **Verifique sempre se o arquivo existe** antes de tentar manipulá-lo para evitar exceções desnecessárias.

- **Feche os recursos de I/O adequadamente** para evitar vazamentos de memória. Usar try-with-resources é uma boa prática para garantir o fechamento automático.

- **Cuidado com exceções:** Manipulação de arquivos pode gerar diversas exceções, como IOException. É importante capturar e tratar essas exceções corretamente.

- **Evite a leitura e escrita de grandes arquivos de uma vez** só, especialmente em máquinas com recursos limitados. Use streams para processar os dados de forma eficiente quando necessário.