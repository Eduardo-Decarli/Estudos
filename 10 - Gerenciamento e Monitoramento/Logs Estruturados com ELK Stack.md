# Logd estruturados com ELK Stack (Elasticsearch, Logdtash, Kibana)

O ELK Stack é um conjunto de ferramentas que permite coletar, armazenar e visualizar logs de maneira estruturada e eficiente. Ele é composto por:

Elasticsearch: Banco de dados NoSQL otimizado para buscar e armazenar logs.

Logstash: Pipeline de processamento que coleta, transforma e envia logs para o Elasticsearch.

Kibana: Interface para visualização e análise de logs.

No contexto do Spring Boot, integrar o ELK Stack ajuda a monitorar o comportamento da aplicação, identificar falhas rapidamente e facilitar a auditoria de eventos.

## Conceitos Fundamentais

**Logging estruturado:** Em vez de logs em texto simples, os logs são formatados em JSON para facilitar a análise automatizada.

**Appender do Logback para Elasticsearch:** Utilizado para enviar logs diretamente para o Elasticsearch.

**Filebeat:** Alternativa ao Logstash para coletar logs de arquivos e enviá-los para o Elasticsearch.

## Modo de Implementar

No contexto do Spring Boot com ELK Stack (Elasticsearch, Logstash e Kibana) e log estruturado, a estrutura do projeto pode ser organizada da seguinte forma:

spring-boot-app/
│── src/
│   ├── main/
│   │   ├── java/com/exemplo/
│   │   │   ├── controller/             # Controllers da aplicação
│   │   │   ├── service/                # Lógica de negócio
│   │   │   ├── repository/             # Acesso a banco de dados
│   │   │   ├── config/                 # Configurações (ex: CORS, segurança)
│   │   │   ├── logging/                # Configuração de logs
│   │   │   │   ├── LoggingAspect.java  # Exemplo de logs para monitoramento
│   │   ├── resources/
│   │   │   ├── application.yml         # Configurações do Spring Boot
│   │   │   ├── logback-spring.xml      # Configuração de logs estruturados (Logstash)
│   │   │   ├── static/                 # Arquivos estáticos (se necessário)
│   │   │   ├── templates/              # Templates Thymeleaf (se for uma aplicação web)
│── logs/                               # Diretório onde logs podem ser armazenados (caso use Filebeat)
│── docker/                             # Configuração do ambiente Docker
│   ├── docker-compose.yml              # Subir Elasticsearch, Logstash e Kibana
│   ├── logstash.conf                   # Configuração do Logstash para ingestão de logs
│── pom.xml                             # Dependências do projeto (Spring Boot, Logstash Encoder)
│── Dockerfile                          # Dockerfile para containerizar a aplicação
│── README.md                           # Documentação do projeto

- logback-spring.xml → Configuração dos logs estruturados para envio ao Logstash.

- logstash.conf → Configuração do Logstash para receber, processar e enviar logs ao Elasticsearch.

- docker-compose.yml → Subir todo o stack ELK (Elasticsearch, Logstash e Kibana).

- logs/ → Caso os logs sejam escritos em arquivos antes de serem enviados ao Logstash via Filebeat.

- logging/LoggingAspect.java → Pode conter lógica para capturar requisições e respostas de APIs (opcional).

Primeiro vamos adicionar as dependências 

``` XML

<!-- Adicione a dependência do Logdback Encoder no pom.xml-->

<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.0</version>
</dependency>

```

Agora configure o Logback para JSON e envio ao Logstash, isso é feito apartir de um arquivo que deve ser criado na pasta **src/main/resources** com o nome **logback-spring.xml**

``` XML

<configuration>
    <appender name="logstash" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination> <!-- Porta do Logstash -->
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>

    <root level="info">
        <appender-ref ref="logstash" />
    </root>
</configuration>

```

Configuração do Logstash (logstash.conf)
Configure o Logstash para processar os logs do Spring Boot e enviá-los ao Elasticsearch

``` txt

input {
  tcp {
    port => 5000
    codec => json
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "spring-logs-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug } # Para visualizar logs no console
}

```

Agora precisamos executar o ELK Stack, podemos usar o Docker para fazer isso, crie um docker-compose.yml para subir Elasticsearch Logstash e Kibana

``` yaml

version: '3.7'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.10.1
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:7.10.1
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch
    ports:
      - "5000:5000"

  kibana:
    image: docker.elastic.co/kibana/kibana:7.10.1
    depends_on:
      - elasticsearch
    ports:
      - "5601:5601"

```

Após subir os containers (**docker-compose up**), acesse o Kibana em **http://localhost:5601**, configure um índice para **spring-logs-*** e visualize os logs em tempo real.

## Boas Práticas

- Usar logs estruturados em JSON para facilitar a indexação e consulta no Elasticsearch.

- Filtrar logs desnecessários para evitar sobrecarga no armazenamento.

- Definir políticas de retenção no Elasticsearch para evitar consumo excessivo de espaço.