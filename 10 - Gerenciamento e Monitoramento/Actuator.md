# O que é o Actuator

O Spring Boot Actuator é um módulo do Spring Boot que adiciona funcionalidades de monitoramento e gerenciamento a uma aplicação. Ele fornece endpoints prontos para uso que permitem visualizar métricas, informações do sistema, status da aplicação e muito mais.

O Actuator facilita a observação e a manutenção da aplicação ao expor endpoints HTTP que fornecem informações úteis, como:

**/actuator/health** → Mostra se a aplicação está saudável.

**/actuator/info** → Exibe informações personalizadas da aplicação.

**/actuator/metrics** → Apresenta métricas como uso de memória, CPU e tempo de resposta.

**/actuator/env** → Exibe variáveis de ambiente.

**/actuator/beans** → Lista todos os beans gerenciados pelo Spring.

## Como usar?

Para usar o Actuator, basta apenas adicionar a dependência ao projeto e o Spring toma conta do resto

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

Ao adicionar a dependência, o actuator já está funcionando, porem não irá listar todas as métricas possíveis, para expor, precisa-se adicionar ao application.properties as seguintes propriedades

``` properties

# Ativa todos os endpoints
management.endpoints.web.exposure.include=*

# Exibe métricas detalhadas
management.endpoint.metrics.enabled=true
management.metrics.export.prometheus.enabled=true


```

após isso, basta apenas acessar os endpoints do actuator e visualizar suas métricas, apenas lembre-se de permitir suas URIs no Spring Security caso esteja usando.