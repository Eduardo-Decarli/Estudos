# Comandos Úteis e Fundamentais do Docker

---

## 🚀 COMANDOS GERAIS

- **docker --version**  
Mostra a versão instalada do Docker

- **docker info**  
    Exibe informações detalhadas do Docker

- **docker help**  
    Lista os comandos disponíveis e mostra ajuda

---

## 📦 IMAGENS

- **docker pull 'imagem'**  
    Baixa uma imagem do Docker Hub (ou outro registry). Ex: *docker pull nginx*

- **docker images**  
    Lista todas as imagens disponíveis localmente

- **docker rmi 'imagem'**  
    Remove uma imagem local

- **docker build -t ''nome'':'tag' .**  
    cria uma imagem a partir de um Dockerfile Ex: *docker build -t meuapp:v1*

---  

## 📁 CONTAINERS

- **docker run 'opções' 'imagem'**  
   Cria e inicia um container. Ex: *docker run -d -p 80:80 nginx* 

- **docker ps**  
    Lista containers em execução

- **docker ps -a**  
    Lista todos os containers (inclusive os parados)

- **docker start 'id/nome'**  
    Inicia um container parado.

- **docker stop 'id/nome'**  
    Para um container

- **docker restart 'id/nome'**  
    Reinicia um container

- **docker rm 'id/nome'**  
    Remove um container

- **docker exec -it 'container' 'comando'**  
    Executa um comando dentro do container. Ex: *docker exec -it meuapp bash*

- **docker logs 'container'**  
    Exibe os logs de um container

---

## 🔗 VOLUMES E REDES

- **docker volume create 'nome'**  
    Cria um volume para persistência de dados

- **docker volume ls**  
    Lista todos os volumes

- **docker volume rm 'nome'**  
    Remove um volume

- **docker network ls**  
    Lista as redes do Docker

- **docker network create 'nome'**  
    Cria uma nova rede

- **docker network connect 'rede' 'container'**  
    Conecta um container a uma rede existente

---

## 🧹 Limpeza

- **docker system prune**  
    Remove tudo que não está sendo usado (container parados, redes não utilizadas, imagens não referenciadas).

- **docker image prune**  
    Remove images não utilizadas

- **docker container prune**  
    Remove containers parados

- **docker volume prune**  
    Remove volumes não utilizados

---

## 🛠️ OUTROS COMANDOS ÚTEIS

- **docker-compose up**  
    Sobe os serviços definidos no arquivo *docker-compose.yml*. Pode usar *-d* para modo background.

- **docker-compose down**  
    Para e remove os serviços criados com *docker-compose up*.

- **docker tag 'imagem' 'nome':'tag'**  
    Marca (ou renomeia) uma imagem local

- **docker push 'nome':'tag'**  
    Envia uma imagem para o Docker Hub ou outro registry.