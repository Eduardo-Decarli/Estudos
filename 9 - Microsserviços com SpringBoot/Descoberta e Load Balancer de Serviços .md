# Service Discovery com Eureka

Em uma arquitetura de microsserviços, os serviços precisam se comunicar, mas suas instâncias podem mudar dinamicamente (por exemplo, devido a escalonamento automático ou falhas).

O Spring Cloud Netflix Eureka resolve esse problema atuando como um Service Discovery, onde os microsserviços se registram e descobrem uns aos outros dinamicamente.

**Sem Eureka:** Os serviços precisam de URLs fixas para comunicação.

**Com Eureka:** Os serviços apenas sabem o nome lógico do outro serviço, e Eureka encontra a instância correta.

- Permite escalabilidade dinâmica.

- Evita a necessidade de hardcoding de URLs

- Funciona bem com balanceadores de carga (Ribbon, Load Balancer)

## Conceitos Fundamentais

**Eureka Server:** Centraliza o registro de microsserviços e também armazena a lista de instâncias ativas.

**Eureka Client:** Microsserviços que se registram no Eureka Server. Descobrem outros serviços dinamicamente.

**Self-Preservation:** Mecanismo para evitar que serviços sejam removidos prematuramente da lista de registros.

## Configuração do Eureka Server

Primeiro, criamos o Eureka Server, que atuará como o "catálogo" de serviços.

``` XML

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>

```

``` Java

// Habilitando o Eureka Server na aplicação

@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

```

``` yml

// Configurar application.yml para Eureka Server

server:
  port: 8761

eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false

```

Agora, ao rodar a aplicação e acessar **http://localhost:8761**, veremos o painel do Eureka Server!

## Configurando um microsserviço como Eureka Client

Agora, vamos registrar um microsserviço (pedido-service) no Eureka.

``` XML

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>

```

``` Java

// Habilitar Eureka Client na aplicação

@EnableEurekaClient
@SpringBootApplication
public class PedidoApplication {
    public static void main(String[] args) {
        SpringApplication.run(PedidoApplication.class, args);
    }
}

```

``` YML

server:
  port: 8080

spring:
  application:
    name: pedido-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true

```

Agora, pedido-service será registrado automaticamente no Eureka Server!

## Boas práticas

- Sempre tenha múltiplas instâncias do Eureka Server para evitar pontos únicos de falha.

- Use Load Balancer (Ribbon ou Spring Cloud Load Balancer) para distribuir chamadas entre instâncias.

- Combine com circuit breakers (Resilience4j) para evitar falhas em cascata.

# Balanceador de Carga com Spring Cloud Load Balancer

Quando temos múltiplas instâncias de um mesmo microsserviço, precisamos distribuir as requisições entre elas para evitar sobrecarga em apenas uma.

**Sem balanceamento:** Uma única instância pode receber todas as requisições, causando gargalos.

**Com balanceamento:** As requisições são distribuídas automaticamente entre as instâncias disponíveis.

- Melhor distribuição de carga

- Redundância e alta disponibilidade

- Maior resiliência contra falhas

## Conceitos Fundamentais

**Load Balancer no Spring Cloud:** O Spring Cloud Load Balancer é a solução recomendada para balanceamento de carga, substituindo o antigo Netflix Ribbon. Ele trabalha diretamente com o Service Discovery (Eureka) para distribuir requisições entre instâncias registradas.

Estratégia Round Robin: Distribui as requisições de forma circular e igualitária entre as instâncias.

Estratégia Random: Escolhe uma instância aleatória para cada requisição

Estratégia Weighted Response Time: Direciona as requisições para as instâncias mais rápidas.

## Exemplos

Agora, vamos configurar um balanceamento de carga entre múltiplas instâncias de um serviço (**pagamento-service**) chamado pelo **pedido-service**.

``` XML

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>

```

``` Java

// Atualize o Feign Client no pedido-service
// O Feign já utiliza automaticamente o Spring Cloud Load Balancer para distribuir requisições!

@FeignClient(name = "pagamento-service")
public interface PagamentoClient {

    @GetMapping("/pagamentos/{id}")
    String getStatusPagamento(@PathVariable Long id);
}


// Configurar um WebClient com Load Balancer

@Configuration
public class WebClientConfig {

    @LoadBalanced
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}


// Agora, podemos chamar o serviço sem precisar de URLs fixas

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final WebClient.Builder webClientBuilder;

    public PedidoController(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @GetMapping("/{id}/pagamento")
    public String verificarPagamento(@PathVariable Long id) {
        return webClientBuilder.build()
                .get()
                .uri("http://pagamento-service/pagamentos/" + id)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}

```

Para subir múltiplas instâncias do pagamento-service, podemos simular múltiplas instâncias, rodamos o mesmo serviço em portas diferentes

``` yaml
# 1ª instância

# application-8081.yml
server:
  port: 8081
spring:
  application:
    name: pagamento-service
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/


# 2ª instância

# application-8082.yml
server:
  port: 8082
spring:
  application:
    name: pagamento-service
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/

```

Rodamos os serviços em diferentes portas e Eureka os reconhece como instâncias do mesmo **pagamento-service**.

Agora, as requisições ao **pagamento-service** serão balanceadas automaticamente entre as instâncias!

## Boas Práticas

- Utilize o Feign ou WebClient com @LoadBalanced.

- Monitore o balanceamento usando logs ou métricas.

- Teste o comportamento ao remover instâncias do Eureka.

# Configuração Centralizada com Spring Cloud Config

Em aplicações baseadas em microsserviços, cada serviço tem suas configurações (como credenciais, URLs e parâmetros). Manter essas configurações em cada instância do serviço pode ser um problema, pois qualquer alteração exige a reinicialização manual de cada um.

O Spring Cloud Config resolve isso ao centralizar todas as configurações em um único servidor, permitindo que os microsserviços obtenham suas configurações dinamicamente.

- Facilidade na gestão de configurações

- Atualização dinâmica sem reiniciar os servidores

- Suporte a diferentes ambientes (dev, test, prod)

- Segurança e versionamento usando Git

## Conceitos Fundamentais

Config Server – Serviço central que armazena as configurações.

Config Clients – Microsserviços que buscam configurações do servidor.

## Exemplos Práticos

``` XML

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

``` Java

// Habilite o servidor de configuração na classe principal

@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}

```

``` yaml

# Configure o servidor para ler arquivos de um repositório Git

# application.yml do Config Server
server:
  port: 8888

spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/seu-usuario/config-repo
          default-label: main

```

Agora, no microsserviço que usará o Config Server (pedido-service):

``` XML

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>

```

``` yaml

# No bootstrap.yml, configure o cliente para buscar as configurações do servidor

spring:
  application:
    name: pedido-service
  cloud:
    config:
      uri: http://localhost:8888

```

Agora, qualquer mudança no repositório Git pode ser aplicada dinamicamente aos microsserviços!

## Boas Práticas

- Armazene configurações no Git para versionamento.

- Use **@RefreshScope** para atualizar valores sem reiniciar.

- Mantenha variáveis sensíveis (senhas, tokens) protegidas no Vault.