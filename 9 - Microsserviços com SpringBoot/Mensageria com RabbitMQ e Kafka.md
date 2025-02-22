# Mensageria com RabbitMQ/Kafka no Spring Boot

Mensageria é um padrão de comunicação assíncrona entre microsserviços. Diferente da comunicação REST, onde um serviço precisa esperar pela resposta do outro, a mensageria permite que os serviços enviem e recebam mensagens de forma desacoplada.

RabbitMQ: Baseado no protocolo AMQP, ideal para comunicação confiável ponto a ponto.

Kafka: Baseado em logs distribuídos, ideal para processamento de eventos em larga escala.

- Maior escalabilidade e desacoplamento dos microsserviços

- Melhor desempenho, pois os serviços não precisam esperar respostas

- Resiliência e tolerância a falhas

- Possibilidade de reprocessar mensagens em caso de falha

## Conceitos Fundamentais

No contexto do RabbitMQ, temos 3 conceitos:

- Exchange – Responsável por distribuir mensagens para as filas.

- Queue – Fila onde as mensagens são armazenadas até serem consumidas.

- Binding – Ligação entre uma Exchange e uma fila.

No contexto do Kafka, temos 3 conceitos:

- Producer – Publica mensagens em um tópico.

- Topic – Armazena mensagens de forma ordenada e distribuída.

- Consumer – Lê mensagens dos tópicos e as processa.

## Exemplos Práticos

Usando RabbitMQ no Spring Boot

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>

```

``` Java

// Criando a configuração do RabbitMQ

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue minhaFila() {
        return new Queue("minha-fila", true);
    }
}


// Criando um produtor de mensagens

@Service
public class RabbitMQProducer {

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarMensagem(String mensagem) {
        rabbitTemplate.convertAndSend("minha-fila", mensagem);
    }
}


// Criando um consumidor de mensagens

@Component
public class RabbitMQConsumer {

    @RabbitListener(queues = "minha-fila")
    public void consumirMensagem(String mensagem) {
        System.out.println("Mensagem recebida: " + mensagem);
    }
}

```

Agora, quando chamarmos **enviarMensagem("Olá, RabbitMQ!")**, a mensagem será armazenada na fila e processada pelo consumidor. 🎉

Usando Kafka

``` XML

<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>

```

``` yml

# Configuração do Kafka

spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: meu-grupo
      auto-offset-reset: earliest

```

``` Java

// Criando um produtor Kafka

@Service
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void enviarMensagem(String mensagem) {
        kafkaTemplate.send("meu-topico", mensagem);
    }
}


// Craindo um consumidor Kafka

@Component
public class KafkaConsumer {

    @KafkaListener(topics = "meu-topico", groupId = "meu-grupo")
    public void consumirMensagem(String mensagem) {
        System.out.println("Mensagem recebida: " + mensagem);
    }
}

```

## Boas Práticas

- Definir um Dead Letter Queue (DLQ) para mensagens não processadas.

- Monitorar filas para evitar sobrecarga.

- Configurar persistência para não perder mensagens em caso de falha.
