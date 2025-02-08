# O que é Persistência de dados?

Persistência de dados refere-se ao armazenamento de informações em um meio não volátil, como um banco de dados, para que possam ser recuperadas posteriormente. Em aplicações Spring Boot, a persistência é frequentemente gerenciada usando o Spring Boot JPA e o Hibernate, que são frameworks que facilitam a interação com bancos de dados relacionais.

# O que é Spring Data JPA?

O Spring Data JPA é um módulo do Spring que simplifica o acesso ao banco de dados relacionais usando a Java Persistence API (JPA). Ele fornece uma camada de abstração sobre o JPA, reduzindo a quantidade de código boilerplate necessário para realizar operações de CRUD (Create, Read, Update e Delete).

Para usar o Spring Data JPA, você precisa adicionar as seguintes dependências no seu pom.xml ou build.gradle

``` xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

```

Para configurar a conexão com o banco de dados, você precisa definir as propriedades no arquivo de configuração. Aqui está um exemplo para um banco de dados H2.

``` properties

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true

```

Um repositório é uma interface que estende JpaRepository e fornece métodos prontos para operações de CRUD. Ele atua como uma camada de abstração entre a aplicação e o banco de dados.

- Entidade

``` Java

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;

    // Getters e Setters
}

```

- Repositório

``` Java

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}

```

- Usando o Repositório

``` Java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void salvarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public Usuario buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
}

```

## O que é Hibernate?

Hibernate é um framework de mapeamento objeto-relacional (ORM) que converte objetos Java em registros de bancos de dados e vice-versa. Ele é a implementação padrão do JPA no Spring Boot.

O Hibernate é configurado automaticamente pelo Spring Boot quando você usa o Spring Data JPA. No entando, você pode personalizar seu comportamento através de propriedades no application.properties ou application.yml

``` properties

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

```

- **show-sql:** Exibe as consultas SQL geradas pelo Hibernate no console.

- **ddl-auto:** Define o comportamento de criação/atualização do esquema do banco de dados. Valores comuns incluem **create**, **update**, **validate** e **none**.

## Anotações do JPA

Aqui estão algumas anotações JPA essenciais:

- @Entity: Indica que a classe é uma entidade mapeada para uma tabela no banco de dados.

- @Table: Especifica o nome da tabela no banco de dados.

- @Id: Indica que o campo é a chave primária da entidade.

- @GeneratedValue: Define a estratégia de geração de valores para a chave primária.

- @Column: Personaliza o mapeamento de um campo para uma coluna no banco de dados.

``` Java

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_completo", nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    // Getters e Setters
}

```

## Consultas Personalizadas com @Query e Query Methods

O Spring Data JPA permite criar consultas Personalizadas apenas definindo métodos na interface do repositório.

``` Java

@Query("SELECT u FROM Usuario u WHERE u.nome = :nome AND u.email LIKE %:termo%")
List<Usuario> buscarPorNomeEEmail(@Param("nome") String nome, @Param("termo") String termo);

```

Os Query Methos são definidos na interface do repositório que seguem uma convenção de nomeclatura. O Spring Data JPA interpreta esses métodos e gera automaticamente as consultas SQL correspondente.

A estrutura básica é baseada em: **findBy + NomeDoCampo + Operador + NomeDoCampo + ...**

**Operadores comuns:**

- And: Combina duas condições com AND.

- Or: Combina duas condições com OR.

- Between: Verifica se um valor está entre dois valores.

- Like: Verifica se um valor corresponde a um padrão.

- OrderBy: Ordena os resultados.

``` Java

// Busca por nome
List<Usuario> findByNome(String nome);

// Busca por nome e email
List<Usuario> findByNomeAndEmail(String nome, String email);

//Busca por email contendo um termo
List<Usuario> findByEmailContaining(String termo);

// Busca usuários com idade entre dois valores
List<Usuario> findByIdadeBetween(int idadeInicial, int idadeFinal);

// Busca e ordena por nome
List<Usuario> findByNomeOrderByNomeAsc(String nome);

```

Quando os Query Methods não são suficiente para expressar uma consulta complexa, você pode usar a anotação @Query para definir uma consulta personalizada.

``` Java

//JPQL (Java Persistence Query Language)
@Query("SELECT u FROM Usuario u WHERE u.nome = :nome AND u.email LIKE %:termo%")
List<Usuario> buscarPorNomeEEmail(@Param("nome") String nome, @Param("termo") String termo);

// SQL Nativo
@Query(value = "SELECT * FROM usuarios WHERE nome = :nome AND email LIKE %:termo%", nativeQuery = true)
List<Usuario> buscarPorNomeEEmailNativo(@Param("nome") String nome, @Param("termo") String termo);


