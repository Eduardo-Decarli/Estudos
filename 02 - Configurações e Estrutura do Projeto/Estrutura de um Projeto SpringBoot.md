# Estrutura de um Projeto Spring Boot

O Spring Boot segue uma estrutura de projeto bem organizada e padronizada para facilitar o desenvolvimento de aplicações Java. Quando criamos um novo projeto Spring Boot usando o Spring Initializr, ele gera automaticamente essa estrutura, seguindo boas práticas.

meu-projeto/
│-- src/
│   ├── main/
│   │   ├── java/com/exemplo/
│   │   │   ├── MeuProjetoApplication.java
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   ├── config/
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   ├── templates/
│   │   │   ├── application.properties
│   │   │   ├── application.yml
│   ├── test/java/com/exemplo/
│-- pom.xml (Maven) ou build.gradle (Gradle)

- src/main/java/com/exemplo/ -> Essa pasta contém o código-fonte principal da aplicação.

    - MeuProjetoApplication.java → Classe principal com @SpringBootApplication, responsável por iniciar a aplicação.

    - controller/ → Contém os controladores REST (@RestController), responsáveis por receber requisições HTTP.

    - service/ → Implementa a lógica de negócios usando classes anotadas com @Service.

    - repository/ → Contém interfaces de acesso ao banco de dados (@Repository), geralmente usando Spring Data JPA.

    - model/ → Contém classes que representam as entidades do banco de dados (@Entity).

    - config/ → Contém configurações da aplicação, como Beans personalizados (@Configuration).

- src/main/resources/ -> Essa pasta contém arquivos de configuração e recursos estáticos.

    - static/ → Contém arquivos estáticos como imagens, CSS e JavaScript.

    - templates/ → Contém templates HTML (usado em aplicações com Thymeleaf ou FreeMarker).

    - application.properties e application.yml → Arquivos de configuração do Spring Boot.

- src/test/java/com/exemplo/ -> Pasta onde ficam os testes automatizados.

- pom.xml (Maven) ou build.gradle (Gradle) -> Define as dependências do projeto e a configuração da build.

## Classe Principal

A classe principal do projeto contém a anotação **@SpringBoot Application**, que habilita a configuração automática

``` Java

package com.exemplo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MeuProjetoApplication {
    public static void main(String[] args) {
        SpringApplication.run(MeuProjetoApplication.class, args);
    }
}

```
