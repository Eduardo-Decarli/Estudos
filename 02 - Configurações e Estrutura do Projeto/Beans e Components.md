# Bean

No Spring, Beans são objetos que são instanciados, gerenciados e montados pelo Spring IoC (Inversion of Control) Container. Eles formam a base de qualquer aplicação Spring, pois representam os componentes que compõem a lógica do sistema.

Um Bean é um objeto que é configurado e gerenciado pelo Spring. Ele pode ser qualquer classe Java, como um serviço, um repositório, um controlador, etc.

Podemos definir um Bean dentro de uma classe de configurações usando a anotação @Bean

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MeuServico meuServico() {
        return new MeuServico();
    }
}

```

O Spring Boot cria e gerencia o objeto **MeuServico**, disponibilizando-o para onde a injeção for necessária.

Suas características são: 

- Criado e gerenciado pelo Spring IoC Container

- Definido dentro de uma classe de configuração (**@Configuration**)

- Registrado manualmente como **@Bean**

# Component no Spring Boot

Um Component é um Bean registrado automaticamente, o Spring Boot escaneia automaticamente as classes anotadas com @Component (e suas variações) e as registra como Beans no contexto da aplicação.

Em vez de definir manualmente um Bean, podemos anotar a classe como **@Component**:

``` Java

import org.springframework.stereotype.Component;

@Component
public class MeuServico {
    public String mensagem() {
        return "Olá, Spring Boot!";
    }
}

```

O Spring Boot detecta automaticamente essa classe e a torna um Bean.

Caracteristicas:

- Também é gerenciado pelo **Spring IoC Container**

- Registrado **automaticamente** através de anotação

- Detectado pelo **Component Scan** do Spring Boot

## Variações de @Component

O @Component pode ser substituido por anotações mais específicas

- @Service -> Para classes de Serviço

- @Repository -> Para classes de Repositório

- @Controller -> Para Controladores MVC

# O que é Scope?

No Spring, o Scope (escopo) define o ciclo de vida e a visibilidade de um Bean. Ele determina como e quando uma instância de um Bean é criada, compartilhada e destruída.

O Spring suporta vários escopos, mas os mais comuns são: 

- Singleton (padrão)
- Prototype
- Request (para app web)
- Session (para app web)
- Application (para app web)
- WebSocket (para app web com WebSocket)

## Escopo Sigleton

O escopo Singleton é o padrão no Spring. Quando um Bean é definido como Singleton, o Spring cria uma única instância desse Bean e a compartilha em todo o contexto da aplicação.

### Comportamento

- A mesma instância do Bean é retornada sempre que o Bean é solicitado. 

- A instância é criada quando o contexto da aplicação é inicializado (ou quando o Bean é solicitado pela primeira vez, dependendo da configuração)

- A instância é destruida quando o contexto da aplicação é encerrado.

Ideal para Beans que não mantêm estado (stateless) ou que são compartilhados entre várias partes da aplicação, como serviços, repositórios ou utilitários.

``` Java

@Service
@Scope("singleton") // Opcional, pois é o padrão
public class MeuServico {
    // Lógica do serviço
}

```

Neste exemplo, o Spring criará uma única instância de MeuServico e a compartilhará em toda a aplicação.

## Escopo Prototype

No escopo Prototype, o Spring cria uma nova instância do Bean sempre que ele é solicitado.

### Comportamento

- Cada vez que o Bean é injetado ou solicitado, uma nova instância é criada.

- O Spring não gerencia o ciclo de vida completo do Bean no escopo Prototype. Após a criação, o Bean é entregue ao cliente, e o Spring não rastreia sua destruição.

Ideal para Beans que mantêm estado (stetaful) ou que precisem ser instanciados várias vezes com configurações diferentes.

``` Java

@Component
@Scope("prototype")
public class MeuComponente {
    // Lógica do componente
}

```

Neste exemplo, cada vez que o MeuComponente for injetado ou solicitado, o Spring criará uma nova instância dele.
