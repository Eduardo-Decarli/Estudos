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

@Controller -> Para Controladores MVC

