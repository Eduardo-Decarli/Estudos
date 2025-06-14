# 🧩 O que é Docker Compose?

O Docker Compose permite definir e gerenciar múltiplos containers usando um único arquivo YAML (docker-compose.yml). Com ele, você consegue subir, parar, remover e configurar serviços com poucos comandos.

## 📦 Estrutura Básica de um **docker-compose.yml**

``` yaml

version: "3.8"  # Versão do Compose

services:
  app: 
    build: . 
    ports:
      - "8080:8080" 
    networks:
      - minha_rede
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_PORT=5432

  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: edu
      POSTGRES_PASSWORD: senha123
      POSTGRES_DB: meu_banco
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:

networks:
  minha_rede:

```

- **app** -> Nome do serviço que ficará atrelado ao container
- **build** -> diretório que fará o buil (ele irá procurar por um docker file no diretório)
- **port** -> A ordem é (host:container)
- **environment** -> variáveis de ambiente para o projeto (opcional)
- **networks** -> Define a rede que ele fará parte

## 🎯 Explicação por Blocos

| Bloco         | Explicação                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `version`     | Define a versão do schema do Docker Compose. Recomenda-se `"3.8"` para versões modernas do Docker. |
| `services`    | Define os containers que serão criados. Cada "serviço" é um container.                             |
| `build`       | Informa que o container será construído a partir de um `Dockerfile`.                               |
| `image`       | Especifica uma imagem do Docker Hub ou privada.                                                    |
| `ports`       | Mapeia portas do host para o container (host\:container).                                          |
| `environment` | Define variáveis de ambiente para o container.                                                     |
| `volumes`     | Mapeia volumes do host para o container (útil para persistência de dados).                         |
| `depends_on`  | Indica dependências entre serviços (app depende de db).                                            |
| `restart`     | Define política de reinício (ex: `always`, `on-failure`).                                          |

## Benefícios do DOcker Compose

- Orquestração simples de múltiplos containers.
- Substitui scripts longos com vários comandos docker run.
- Fácil de versionar e compartilhar com o time (arquivo YAML).
- Suporte a variáveis de ambiente com .env.