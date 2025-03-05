# Arquitetura de Microsserviços com SpringBoot

A arquitetura de microsserviços é um estilo de desenvolvimento de software onde uma aplicação é dividida em pequenos serviços independentes, cada um com sua própria lógica de negócio e banco de dados. Diferente da abordagem monolítica, onde tudo está em um único código-fonte, os microsserviços se comunicam entre si por meio de APIs.

- Escalabilidade independente

- Manutenção e deploy mais fáceis

- Melhor resiliência e isolamento de falhas

- Uso de diferentes tecnologias para cada serviço.

O uso de microsserviços é contantemente usado em aplicações grandes e complexas, pois dessa forma consegue desmembrar o sistema em partes, trazendo mais autonomia e resiliência, além de ser usado também em sistemas que precisam escalar de forma eficiente.

## Conceitos Fundamentais

**Serviços Independentes** → Cada microsserviço é um sistema autônomo que pode ser desenvolvido, testado e implantado separadamente.

**Comunicação via APIs** → Microsserviços se comunicam via HTTP (REST) ou mensageria (Kafka, RabbitMQ).

**Banco de Dados Distribuído** → Cada microsserviço pode ter seu próprio banco de dados, evitando um único ponto de falha.

**Descoberta de Serviços** → Ferramentas como Eureka ajudam os serviços a se encontrarem dinamicamente.

**Balanceamento de Carga** → Ferramentas como Spring Cloud Load Balancer distribuem requisições entre instâncias do mesmo serviço.

**Configuração Centralizada** → Spring Cloud Config gerencia configurações para todos os serviços.

**Resiliência e Tolerância a Falhas** → Implementado com circuit breakers como o Resilience4j.

## Boas Práticas

- Dividir microsserviços por domínio de negócio, evitando criar serviços pequenos demais.

- Configuração centralizada → Use o Spring Cloud Config para gerenciar configurações.

- Monitoramento e logs → Use ferramentas como ELK Stack ou Prometheus + Grafana.

- Tolerância a falhas → Implementar circuit breakers com Resilience4j para evitar falhas em cascata.

# Comunicação entre Microsserviços com Spring Boot

Em uma arquitetura de microsserviços, os serviços precisam trocar informações entre si para garantir que a aplicação funcione corretamente. A comunicação pode ser feita de diferentes maneiras:

**Síncrona (REST):** Comunicação direta entre microsserviços usando HTTP (com RestTemplate ou WebClient). É uma boa forma para requisições rápidas e diretas, mas pode gerar acoplamento.

**Síncrona (Feign):** Cliente HTTP declarativo que facilita a comunicação entre serviços. Ele simplifica chamadas REST, reduzindo código boilerplate.

**Assíncrona (Mensageria - RabbitMQ/Kafka):** Comunicação via eventos, garantindo maior desacomplamento. É a melhor opção para sistemas de alta escalabilidade.

## Conceitos Fundamentais

**REST (HTTP Requests):** Usa RestTemplate(obsoleto) ou WebClient(Recomendado) para fazer chamadas entre serviços. Como por exemplo o **pedido-service** chama **pagamento-service** via HTTP.

**Feign Client:** Cliente declarativo para chamadas HTTP entre microsserviços. Ele reduz a complexidade da comunicação síncrona.

Mensageria (Event-Driven): Em vez de um serviço chamar outro diretamente, ele publica um evento. Outro serviço pode consumir esse evento quando necessário, por exemplo: **pedido-service** publica um evento de novo pedido, **pagamento-service** processa quando disponível

## Comunicação com REST(WebClient)

Suponha que **pedido-service** precise buscar informações de **pagamento-service**.

``` XML

<!-- Adicione a dependência no pom.xml -->

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

```

``` Java

@Service
public class PagamentoClient {
    
    private final WebClient webClient;

    public PagamentoClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://localhost:8081").build();
    }

    public String getStatusPagamento(Long pedidoId) {
        return webClient.get()
                .uri("/pagamentos/{id}", pedidoId)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // Evite em produção, prefira soluções reativas
    }
}

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PagamentoClient pagamentoClient;

    public PedidoController(PagamentoClient pagamentoClient) {
        this.pagamentoClient = pagamentoClient;
    }

    @GetMapping("/{id}/pagamento")
    public String verificarPagamento(@PathVariable Long id) {
        return pagamentoClient.getStatusPagamento(id);
    }
}

```

Agora, quando você chamar **http://localhost:8080/pedidos/1/pagamento**, ele buscará o status do pagamento do outro microsserviço!

## Comunicação com Feign Client

Em vez de WebClient, podemos usar Feign para simplificar chamadas HTTP.

``` XML

<!-- Adicione a dependência no pom.xml -->

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>

```

``` Java

// Habilite Feign na Main do Spring Boot

@EnableFeignClients
@SpringBootApplication
public class PedidoApplication {
    public static void main(String[] args) {
        SpringApplication.run(PedidoApplication.class, args);
    }
}


// Crie um Cliente Feign

@FeignClient(name = "pagamento-service", url = "http://localhost:8081")
public interface PagamentoFeignClient {

    @GetMapping("/pagamentos/{id}")
    String getStatusPagamento(@PathVariable Long id);
}


// Usando o Feign Client no Controller

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PagamentoFeignClient pagamentoFeignClient;

    public PedidoController(PagamentoFeignClient pagamentoFeignClient) {
        this.pagamentoFeignClient = pagamentoFeignClient;
    }

    @GetMapping("/{id}/pagamento")
    public String verificarPagamento(@PathVariable Long id) {
        return pagamentoFeignClient.getStatusPagamento(id);
    }
}

```

Agora, pedido-service pode se comunicar com pagamento-service com apenas uma interface Feign!

## Comunicação via Mensageria (RabbitMQ)

Em vez de chamadas HTTP diretas, podemos usar RabbitMQ para comunicação assíncrona.

``` XML

<!-- Adicione a dependência no pom.xml -->

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>

```

``` Java

// Criando um Publisher (Enviando eventos de pedidos criados)

@Service
public class PedidoProducer {

    private final RabbitTemplate rabbitTemplate;

    public PedidoProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarPedido(String pedido) {
        rabbitTemplate.convertAndSend("pedidos.exchange", "pedidos.novo", pedido);
    }
}


// Criando um Consumer no pagamento-service (Recebendo eventos de novos pedidos)

@RabbitListener(queues = "pedidos.queue")
public void processarPedido(String pedido) {
    System.out.println("Recebido novo pedido: " + pedido);
}

```

Agora, pedido-service publica um evento e pagamento-service consome de forma assíncrona!

## Boas Práticas

- Use Feign para chamadas REST simples, evitando código repetitivo.

- Use **WebClient** para chamadas REST assíncronas e reativas.

- Prefira mensageria (RabbitMQ/Kafka) para eventos, garantindo escalabilidade.

- Monitore falhas e implemente circuit breakers (Resilience4j) para evitar falhas em cascata.