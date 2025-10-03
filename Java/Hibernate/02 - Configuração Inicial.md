# hibernate.cfg.xml ou application.properties/application.yml (com Spring Boot)

**hibernate.cfg.xml** → Usado em projetos sem Spring, ou com Hibernate puro

``` XML

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-configuration PUBLIC 
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN" 
  "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
  <session-factory>

    <!-- Configuração do banco -->
    <property name="hibernate.connection.driver_class">org.postgresql.Driver</property>
    <property name="hibernate.connection.url">jdbc:postgresql://localhost:5432/meubanco</property>
    <property name="hibernate.connection.username">postgres</property>
    <property name="hibernate.connection.password">1234</property>

    <!-- Dialeto -->
    <property name="hibernate.dialect">org.hibernate.dialect.PostgreSQLDialect</property>

    <!-- Mostrar SQL no console -->
    <property name="hibernate.show_sql">true</property>
    <property name="hibernate.format_sql">true</property>

    <!-- Criação do schema -->
    <property name="hibernate.hbm2ddl.auto">update</property>

    <!-- Classes mapeadas -->
    <mapping class="com.meuprojeto.model.Usuario" />
    <mapping class="com.meuprojeto.model.Produto" />

  </session-factory>
</hibernate-configuration>

```

Você precisa registrar manualmente as classes mapeadas com ***mapping class="..."/***.   
Dialetos comuns: MySQLDialect, PostgreSQLDialect, H2Dialect, OracleDialect.  
O hibernate procura esse arquivo por padrão na pasta ***src/main/resources***  

- **application.properties** ou **application.yml** → Usado em projetos com Spring Boot

Quando você usa o Hibernate com Spring Boot, o hibernate.cfg.xml é desnecessário. A configuração é feita via application.properties ou application.yml.

``` yml

# Datasource (banco)
spring.datasource.url=jdbc:postgresql://localhost:5432/meubanco
spring.datasource.username=postgres
spring.datasource.password=1234
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA e Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=update

```

### Opções para hibernate.bm2ddl.auto

| Valor         | Efeito                                                        |
| ------------- | ------------------------------------------------------------- |
| `none`        | Nada é feito (recomendado para produção)                      |
| `validate`    | Valida se o schema está de acordo com as entidades            |
| `update`      | Atualiza o schema (adiciona colunas/tabelas sem apagar dados) |
| `create`      | Cria o schema do zero (apaga dados toda vez)                  |
| `create-drop` | Cria e remove o schema ao iniciar/encerrar a aplicação        |

# Dependências no pom.xml (Maven) ou build.gradle (Gradle)

- Para Hibernate Puro (Java SE)

``` xml

<dependencies>

  <!-- Hibernate Core -->
  <dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>6.4.4.Final</version>
  </dependency>

  <!-- Driver JDBC (exemplo: PostgreSQL) -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.2</version>
  </dependency>

  <!-- JPA API (opcional para Hibernate puro, necessário se quiser usar anotações JPA) -->
  <dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.1.0</version>
  </dependency>

  <!-- Logging (necessário para log interno do Hibernate) -->
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.13</version>
  </dependency>

</dependencies>

```

- Para Hibernate com Spring Boot

``` xml

<dependencies>

  <!-- Spring Boot Starter com suporte JPA e Hibernate -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <!-- Driver do banco de dados -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>

</dependencies>

```

