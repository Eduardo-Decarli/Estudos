# Deploy e Containers

Deploy é o processo de colocar uma aplicação em produção, ou seja, disponibilizar ela para o público ou usuários finais. Isso envolve mover o código da fase de desenvolvimento para um ambiente onde ele será executado, seja em servidores físicos, virtuais ou na nuvem.

Containers são uma tecnologia que permite empacotar uma aplicação com todas as suas dependências, configurando-a de forma que seja executada de maneira consistente em qualquer ambiente, seja localmente, em servidores ou na nuvem.

Em resumo, containers ajudam a criar ambientes isolados e portáveis para aplicações, o que facilita o deploy e a escalabilidade.

## Conceitos Fundamentais

**Docker:** Uma plataforma que facilita a criação, o envio e a execução de containers. Cada container contém uma aplicação e todas as suas dependências necessárias para rodar, sem interferir no sistema operacional subjacente.

**Docker Image:** A imagem é o pacote que contém o código da aplicação e suas dependências. Pode ser compartilhada e reutilizada.

**Docker Container:** A instância de uma imagem em execução. Cada container é isolado e tem seu próprio sistema de arquivos.

**Dockerfile:** Um arquivo de texto que contém os comandos necessários para construir uma imagem Docker. Ele define como a aplicação será empacotada no container.

**Orquestração de Containers:** Ferramentas como Kubernetes ou Docker Compose ajudam a gerenciar múltiplos containers, distribuindo a carga e mantendo a disponibilidade da aplicação.

## Exemplo Prático

1. Construção e empacotamento da aplicação (mvn package ou gradle build)

``` bash

mvn clean package

```

Isso vai gerar um arquivo JAR (ou WAR) na pasta target/.

2. Criando o Dockerfile

Vamos criar um Dockerfile para a nossa aplicação Spring Boot. Ele vai indicar como a imagem será construída:

``` Dockerfile

# Usando uma imagem base do OpenJDK
FROM openjdk:11-jdk-slim

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o JAR gerado para dentro do container
COPY target/myapp.jar myapp.jar

# Comando para rodar o JAR
ENTRYPOINT ["java", "-jar", "myapp.jar"]

# Expondo a porta que a aplicação vai rodar
EXPOSE 8080

```

3. Contruindo a imagem Docker

Com o Dockerfile pronto, podemos construir a imagem com o comando

``` bash

docker build -t myapp .

```

Esse comando cria uma imagem chamada **myapp**.

4. Rodando o container

Após a construção da imagem, podemos rodar o container:

``` bash

docker run -p 8080:8080 myapp

```

Isso faz com que a aplicação esteja disponível na porta 8080 do seu sistema local.

## Boas práticas

Use imagens pequenas: Escolha uma imagem base mais leve, como openjdk:11-jre-slim, para otimizar o tamanho final do container.

Não exponha portas desnecessárias: Exponha apenas as portas que a aplicação realmente vai usar.

Gerencie variáveis de ambiente: Utilize variáveis de ambiente ou arquivos de configuração (como .env) para parametrizar o comportamento do seu aplicativo.

Imagens imutáveis: Evite fazer modificações no container durante a execução. Sempre construa a imagem e execute uma nova versão do container.