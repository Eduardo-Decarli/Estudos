# Convenção sobre Configurações (Convention over Configuration)

O Spring Boot segue o princípio de Convenção sobre Configuração (Convention over Configuration), que significa que ele já vem com padrões pré-configurados, permitindo que você desenvolva aplicações com mínimo de configuração manual.

Antes do Spring Boot, com o Spring tradicional, os desenvolvedores precisavam configurar quase tudo manualmente. Isso incluía arquivos XML, definições de beans e configurações detalhadas. Agora com o Spring Boot, basta seguir a convenção e o framework cuida do resto. Se precisar de ajuste, você pode sobrescrever a configuração facilmente.

## O que é Convenção sobre Configuração?

- Sem Spring Boot (Configuração manual): Antes do Spring Boot, para configurar um DataSource para banco de dados, era necessário algo assim:

``` XML

<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://localhost:3306/meubanco" />
    <property name="username" value="root" />
    <property name="password" value="senha" />
</bean>

```

Isso significa que cada componente da aplicação precisava ser configurado manualmente

- Com Spring Boot (Convenção Automática): No Spring Boot, tudo o que você precisa fazer é adicionar a dependência do banco de dados no pom.xml:

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

```

E adicionar algumas configurações no **application.properties**:

``` properties

spring.datasource.url=jdbc:mysql://localhost:3306/meubanco
spring.datasource.username=root
spring.datasource.password=senha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update

```

O Spring Boot reconhece essa configuração e faz tudo automaticamente, pois não é necessário definir um **DataSource** manualmente, pois o Spring Boot já sabe o que fazer quando encontra essa configuração.

## Como funciona a Convenção sobre Configuração no Spring Boot?

O Spring Boot funciona da seguinte maneira: 

1. Ele detecta automaticamente as dependências do projeto.

- Se você adiciona spring-boot-starter-web, ele configura automaticamente o Spring MVC e um servidor embutido.

- Se adiciona spring-boot-starter-data-jpa, ele configura o acesso ao banco de dados.

2. Ele aplica configurações padrão (convenção).

- O Spring Boot assume que você deseja um servidor Tomcat embutido ao usar Spring MVC.

- Assume que o banco de dados usa Hibernate para gerenciamento de entidades.

3. Ele permite ajustes, se necessário.

- Caso você precise mudar algo, basta sobrescrever as propriedades no application.properties ou application.yml.