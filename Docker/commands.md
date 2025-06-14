# Comandos Úteis e Fundamentais do Docker

---

## 🚀 COMANDOS GERAIS

- **docker --version**
  Mostra a versão instalada do Docker

- **docker info**
    Exibe informações detalhadas do Docker

- **docker help**
    Lista os comandos disponíveis e mostra ajuda

## 📦 IMAGENS

- **docker pull <imagem>**
    Baixa uma imagem do Docker Hub (ou outro registry). Ex: "docker pull nginx"

- **docker images**
    Lista todas as imagens disponíveis localmente

- **docker rmi <imagem>** 
    Remove uma imagem local

- **docker build -t <nome>:<tag> .**
    cria uma imagem a partir de um Dockerfile Ex: "docker build -t meuapp:v1"
