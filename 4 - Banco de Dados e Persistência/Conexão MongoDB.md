# MongoDB

O **MongoDB** é um banco de dados **NoSQL** orientado a documentos, conhecido por sua escalabilidade, flexibilidade e alto desempenho. Diferente de bancos relacionais, ele armazena os dados em formato **JSON-like (BSON)**, permitindo estruturação dinâmica sem a necessidade de esquemas fixos.

No **Spring Boot**, o **MongoDB** pode ser integrado facilmente utilizando o **Spring Data MongoDB**, um módulo que simplifica o acesso ao banco de dados, fornecendo abstrações e suporte a repositórios automáticos, consultas derivadas e personalizadas.

**Modelo Flexível:** Permite armazenar documentos de diferentes estruturas na mesma coleção.

**Escalabilidade horizontal:** Suporta distribuição de dados em vários servidores.

**Alto Desempenho:** Consultas rápidas sem a necessidade de joins complexos.

**Integração Simplificada:** O SpringBoot facilita a conexão e manipulação de dados com o MongoDB

## Conceitos Fundamentais

**Como o MongoDB funciona internamente no código:** O MongoDB armazena dados em documentos BSON, que são representações binárias de JSON, permitindo tipos de dados mais avançados como datas e números inteiros de 64 bits. Cada documento é armazenado dentro de uma coleção, que funciona como um agrupamento lógico de documentos.

No Spring Boot, utilizamos o Spring Data MongoDB, que abstrai a comunicação com o banco de dados, eliminando a necessidade de escrever código de acesso a dados manualmente. Essa integração é feita com os seguintes componentes:

- **@Document:** Define uma classe como uma coleção do MongoDB.

- **@Id:** Especifica o campo identificador único.

- **MongoRepository:** Interface que fornece métodos para CRUD automaticamente.

- **MongoTemplate:** Alternativa mais flexível para interações diretas com o banco.

**Documento:** Equivalente a uma linha em um banco relacional, é uma estrutura de dados armazenada no formato BSON, semelhante a um objeto JSON.

**Coleções:** Agrupamento de documentos, similar a uma tabela em SQL.

## Configurando o MongoDB

Dependência necessária: Adicione a seguinte dependência ao pom.xml do seu projeto

``` xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>

```

Configurando o application.properties: Agora vamos configurar a localização do banco, para o Spring identificar aonde deve se conectar.

``` properties

spring.data.mongodb.uri=mongodb://localhost:27017/meubanco

```

Caso seu MongoDB exija autenticação, adicione **usuario:senha@** antes do host na URI.

## Estruturando o Código

- Definição do Modelo (Entidade)

``` Java

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
    private String nome;
    private int idade;
    
    // Construtores, Getters e Setters
}

```

Aqui, usamos **@Document(collection = "usuarios")** para mapear a classe **Usuario** à coleção **usuarios** no MongoDB.

---

- Criando um Repositório

``` Java

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByNome(String nome);
}

```

A interface **MongoRepository** já inclui métodos padrão como **save()**, **findById()**, **findAll()** e **delete()**, facilitando operações CRUD.

---

- Criando um Service

``` Java

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    public Usuario salvarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }
}

```

## Consultas Avançadas

O Spring Data MongoDB nos permite realizar consultas poderosas através de MongoRepository, @Query (JPQL para MongoDB) e MongoTemplate. Com isso podemos:

- Colsultar com filtros complexos
- Ordenação e Paginação ()
- Consultas Regex (Expressões Regulares)
- Consulta por Intervalos (Range Queries)
- Operações Lógicas (AND, OR, IN, NOT, etc)
- Busca textual (Full-Text Search)

### Usando o MongoRepository para Consultas Personalizadas

O MongoRepository permite criar métodos personalizados baseados na nomenclatura dos métodos.

``` Java

// Buscar usuário por idade mínima

List<Usuario> findByIdadeGreaterThan(int idade);


// Buscar usuários por nome contendo um trecho de texto

List<Usuario> findByNomeContaining(String nome);


// Buscar usuário por múltiplos critérios (idade e e-mail)

List<Usuario> findByIdadeGreaterThanEmailContaining(int idade, String email);

```

### Consultas Personalizadas com @Query

Se precisarmos de mais flexibilidade, podemos usar **MongoDB Query Language** com **@Query**.

``` Java

// Buscar usuários com idade maior que 30

@Query("{ 'idade' : { $gt: ?0 } }") // gt = greater than
List<Usuario> buscarUsuarioComIdadeMaiorQue(int idade)

// Buscar usuários com nome começando com "J" e idade maior que 25

@Query("{ 'nome' : { $regex: '^J', $options: 'i' }, 'idade': { $gt: 25 } }") // $regex: '^J' → Encontra nomes que começam com "J". e $options: 'i' → Ignora diferenças entre maiúsculas e minúsculas.
List<Usuario> buscarUsuariosNomeJMaior25();


## Boas Práticas

**Usar repositórios do Spring Data:** Aproveite MongoRepository para evitar código repetitivo.

**Criar índices:** Utilize @Indexed nos campos frequentemente pesquisados para otimizar consultas.

**Validação de dados:** Utilize @Valid para evitar inconsistências no banco.

**Gerenciar conexões corretamente:** Ajuste o pool de conexões para evitar sobrecarga.