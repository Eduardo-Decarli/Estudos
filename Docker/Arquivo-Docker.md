# O que é DockerFile

É um arquivo de texto simples chamado Dockerfile que contém instruções sequenciais para construir uma imagem Docker personalizada. Ele automatiza a criação de ambientes, instalando dependências, copiando arquivos, expondo portas etc.

# Estrutura Geral de um Arquivo DockerFile

``` Dockerfile

# 1. Imagem base
FROM openjdk:17-jdk

# 2. Autor (opcional)
LABEL maintainer="eduardo@email.com"

# 3. Diretório de trabalho dentro do container
WORKDIR /app

# 4. Copia arquivos do host para o container
COPY . .

# 5. Executa comandos de instalação
RUN javac Main.java

# 6. Porta exposta
EXPOSE 8080

# 7. Comando padrão que será executado ao rodar o container
CMD ["java", "Main"]

```

## Principais Instruções

| Instrução    | Descrição                                                      | Exemplo                                         |
| ------------ | -------------------------------------------------------------- | ----------------------------------------------- |
| `FROM`       | Define a imagem base                                           | `FROM node:18-alpine`                           |
| `LABEL`      | Metadados (autor, versão etc)                                  | `LABEL maintainer="edu@gmail.com"`              |
| `WORKDIR`    | Define o diretório de trabalho no container                    | `WORKDIR /app`                                  |
| `COPY`       | Copia arquivos do host para o container                        | `COPY . .`                                      |
| `ADD`        | Similar ao `COPY`, mas também descompacta `.tar` e aceita URLs | `ADD app.tar.gz /app/`                          |
| `RUN`        | Executa comandos na imagem (em tempo de build)                 | `RUN apt-get update && apt-get install -y curl` |
| `CMD`        | Comando padrão quando o container for iniciado                 | `CMD ["npm", "start"]`                          |
| `ENTRYPOINT` | Define um comando fixo que sempre será executado               | `ENTRYPOINT ["python"]`                         |
| `ENV`        | Define variáveis de ambiente                                   | `ENV PORT=8080`                                 |
| `EXPOSE`     | Indica qual porta será usada (não publica ainda)               | `EXPOSE 8080`                                   |
| `ARG`        | Define variáveis de build                                      | `ARG JAR_FILE=target/app.jar`                   |
| `VOLUME`     | Define pontos de montagem para volumes                         | `VOLUME /data`                                  |
| `USER`       | Define o usuário dentro do container                           | `USER root`                                     |
