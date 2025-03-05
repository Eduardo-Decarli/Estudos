# Dependências do Spring Boot (Spring Boot Starters)

O Spring Boot Starters são pacotes de dependências pré-configuradas que facilitam o desenvolvimento, evitando que você precise adicionar várias bibliotecas manualmente.

Em vez de configurar cada biblioteca separadamente, você pode simplismente adicionar um Starter, e ele já traz tudo o que é necessário.

## O que são Spring Boot Starters?

Antes do Spring Boot, ao desenvolver uma aplicação, você precisava adicionar múltiplas dependências manualmente no **pom.xml** (Maven) ou **build.gradle** (Gradle).

Por exemplo, para criar uma aplicação web no Spring sem o Spring Boot, você precisaria adicionar:

``` XML

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-core</artifactId>
</dependency>

```

E configurar tudo manualmente. Com o Spring Boot, basta adicionar 

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

O Spring Boot já adiciona todas as bibliotecas necessárias automaticamente.

## Principais Starters do Spring Boot

Os Starters seguem o padrão de nome: **spring-boot-starter-<funcionalidade>** e aqui estão os principais:

- **spring-boot-starter-web:** Para criar aplicações Web e APIs REST, ele inclui o Spring MVC, Jackson (para JSON) e Tomcat embutido.

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

- **spring-boot-starter-data-jpa:** Para trabalhar com banco de dados usando JPA (Hibernate), ele inclui Hibernate (ORM para java), Spring Data JPA (facilita acesso a dados) e suporte a vários bancos de dados (MySQL, PostgreSQL, H2, etc.)

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

```

- **spring-boot-starter-security:** Para adicionar autenticação e segurança à aplicação. Ele inclui Spring Security (Configuração padrão com login e senha), proteção contra CSRF e autenticação com banco de dados ou OAuth.

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

- **spring-boot-starter-thymeleaf:** Para criar aplicações web com HTML dinâmico. inclui o motor de templates Thymeleaf, que permite criar páginas HTML com integração direta ao backend.

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

```

No HTML, podemos usar o Thymeleaf para exibir variáveis do backend:

``` HTML

<p>Olá, <span th:text="${nome}"></span>!</p>

```

- **spring-boot-starter-test:** Para testes unitários e de integração, inclui JUnit 5, Mockito e Spring Boot Test (para testes de integração).

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

```

- **spring-boot-starter-actuator:** Para monitoramento e métricas da aplicação, inclui endpoints REST para ver o status da aplicação, como: **/actuator/health** (mostra se a aplicação está rodando) e **/actuator/metrics** (exibe métricas de desempenho).

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```