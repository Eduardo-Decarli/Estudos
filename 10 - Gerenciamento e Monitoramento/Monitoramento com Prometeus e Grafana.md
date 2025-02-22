# Monitoramento com Prometheus e Grafana

O Prometheus e o Grafana são ferramentas amplamente utilizadas para monitoramento de aplicações:

**Prometheus:** Coleta e armazena métricas em um formato estruturado (time-series). Possui um poderoso sistema de consultas chamado PromQL.

**Grafana:** Fornece painéis interativos para visualização das métricas coletadas pelo Prometheus.

No contexto do Spring Boot, essas ferramentas permitem monitorar consumo de CPU, memória, latência de requisições, número de erros, entre outros indicadores.

## Conceitos Fundamentais

Exportação de métricas: O Spring Boot expõe métricas no formato Prometheus através do Actuator.

PromQL: Linguagem para consultas no Prometheus

Alerting: O Prometheus pode disparar alertas quando alguma métrica atinge um limite crítico

Dashboards no Grafana: Painéis configuráveis para visualizar as métricas coletadas

## Implementando o Prometheus

``` XML

<!-- Adicionando as Dependências -->

<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

```

``` properties

# Habilite a exportação de métricas no application.properties

management.endpoints.web.exposure.include=*
management.endpoint.metrics.enabled=true
management.metrics.export.prometheus.enabled=true

```

Após iniciar a aplicação, já é possível acessar algumas métricas através da URL **http://localhost:8080/actuator/prometheus**

``` txt

# HELP jvm_memory_used_bytes Used bytes of a given JVM memory area.
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="PS Eden Space"} 524288

```

``` yml

# Configure o Prometheus (prometheus.yml)

global:
  scrape_interval: 5s # Intervalo de coleta das métricas

scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['host.docker.internal:8080']

```

Após isso, execute o prometheus e o Grafana via Docker

``` yml

version: '3.7'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"

```

Após isso, podemos acessar as seguintes URLs

- Prometheus: **http://localhost:9090**

- Grafana: **http://localhost:3000**(usuário: admin, senha: admin)

Para configurar o Grafana a encontrar o Prometheus vá em Configuration → Data Sources e adicione o Prometheus (http://prometheus:9090).
Crie um dashboard e adicione gráficos baseados nas métricas do Prometheus.

## Boas Práticas

- Definir intervalos de coleta adequados para evitar sobrecarga na aplicação.

- Criar alertas para eventos críticos, como alto consumo de CPU ou erros HTTP 500.

- Utilizar dashboards claros no Grafana para facilitar a visualização dos dados.