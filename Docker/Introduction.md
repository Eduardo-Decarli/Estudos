# Introdução ao Docker

Docker é uma plataforma open-source que automatiza o deployment de aplicações dentro de containers, que são ambientes isolados que contêm tudo que uma aplicação precisa para rodar.

Ele permite que desenvolvedores empacotem uma aplicação com todas as suas dependências em um “container”. Esses containers são leves, portáteis e podem rodar em qualquer sistema que tenha o Docker instalado.

## Por que usar o Docker?

- **Portabilidade:** Containers garantem que sua aplicação funcione da mesma forma em qualquer ambiente (desenvolvimento, teste, produção).

- **Leveza:** Containers compartilham o kernel do sistema operacional, tornando-os mais leves que máquinas virtuais.

- **Isolamento:** Cada container é isolado, evitando conflitos entre dependências de diferentes aplicações.

- **Escalabilidade:** Docker facilita o escalonamento de aplicações para lidar com picos de carga.

## Conceitos Fundamentais

O Docker é uma ferramenta amplamente utilizada para criar, distribuir e executar aplicativos em contêineres. Os conceitos fundamentais do Docker incluem:

- **Imagem:** Uma imagem é uma espécie de “modelo” imutável que serve de base para criar containers. Contém o sistema operacional base, bibliotecas e o software que você deseja executar, Imagens podem ser criadas através de um aplicativo usando docker-compose ou buscadas e baixadas do docker-hub.

- **Container:** Um Container é uma unidade leve e isolada que contém tudo o que é necessário para executar um aplicativo, incluindo o código, bibliotecas, dependências e configurações. Ele é baseado em uma imagem e usa recursos compartilhados do sistema operacional do host.

- **DockerFile:** Um arquivo de texto que define como a imagem será construída. Contém comandos para configurar o ambiente(por exemplo, copiar arquivos, instalar pacotes, definir variáveis de ambiente).

- **Volumes:** Mecanismo para persistir dados usados pelos contêineres, garantindo que os dados não sejam perdidos quando o contêiner é reiniciado ou removido. Muito útil para armazenar dados de bancos de dados ou logs, por exemplo.

- **Rede:** Docker permite a configuração de redes para conectar contêineres entre si e/ou com o mundo externo. Existem tipos de redes como bridge, host e overlay, cada uma com casos de uso diferentes.

- **Registro e Docker Hub:** O Docker Hub é um repositório público (ou privado) onde as imagens podem ser armazenadas e compartilhadas. Alternativas incluem registros privados para equipes ou empresas.

- **Orquestração:** Ferramentas como docker-compose e plataformas como Kubernetes ajudam a gerenciar vários contêineres ao mesmo tempo. Permite criar ambientes com múltiplos serviços interconectados.