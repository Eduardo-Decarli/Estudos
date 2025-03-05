# Fundamentos do MongoDB

O **MongoDB** é um banco de dados **NoSQL** orientado a documentos, conhecido por sua escalabilidade, flexibilidade e alto desempenho. Diferente de bancos relacionais, ele armazena os dados em formato **JSON-like (BSON)**, permitindo estruturação dinâmica sem a necessidade de esquemas fixos.

No **Spring Boot**, o **MongoDB** pode ser integrado facilmente utilizando o **Spring Data MongoDB**, um módulo que simplifica o acesso ao banco de dados, fornecendo abstrações e suporte a repositórios automáticos, consultas derivadas e personalizadas.

**Modelo Flexível:** Permite armazenar documentos de diferentes estruturas na mesma coleção.

**Escalabilidade horizontal:** Suporta distribuição de dados em vários servidores.

**Alto Desempenho:** Consultas rápidas sem a necessidade de joins complexos.

**Integração Simplificada:** O SpringBoot facilita a conexão e manipulação de dados com o MongoDB

O MongoDB armazena dados em documentos **BSON**, que são representações **binárias de JSON**, permitindo tipos de dados mais avançados como datas e números inteiros de 64 bits. Cada documento é armazenado dentro de uma **coleção**, que funciona como um agrupamento lógico de documentos.

No Spring Boot, utilizamos o **Spring Data MongoDB**, que abstrai a comunicação com o banco de dados, eliminando a necessidade de escrever código de acesso a dados manualmente.

## Conceitos Fundamentais

- BSON (Binary JSON): Formato binário baseado em JSON, usado pelo MongoDB.

**Documento:** Equivalente a uma linha em um banco relacional, é uma estrutura de dados armazenada no formato BSON, semelhante a um objeto JSON.

**Coleções:** Agrupamento de documentos, similar a uma tabela em SQL.

- **@Document:** Define uma classe como uma coleção do MongoDB.

- **@Id:** Especifica o campo identificador único.

- **MongoRepository<T, ID>:** Interface que fornece métodos para CRUD automaticamente.

- **@Query:** Permite definir consultas personalizadas em MongoDB.

- **MongoTemplate:** Alternativa mais flexível para interações diretas com o banco.

# Configuração e Conexão do SpringBoot com MongoDB

Agora vamos ver os passos que devemos tomar para configurar o MongoDB em um projeto SpringBoot

## Adicionando as Dependências Necessárias

Adicione a seguinte dependência ao **pom.xml** do seu projeto

``` xml

<dependencies>
    <!-- Spring Boot Starter para MongoDB -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>

    <!-- Driver oficial do MongoDB -->
    <dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongodb-driver-sync</artifactId>
    </dependency>
</dependencies>

```

O Spring Boot Starter Data MongoDB já inclui o driver do MongoDB, mas podemos adicionar o mongodb-driver-sync para funcionalidades extras.

## Configurando a Conexão com o MongoDB

O Spring Boot permite configurar a conexão no application.properties ou application.yml.

``` properties

spring.data.mongodb.uri=mongodb://localhost:27017/meubanco

```

Caso seu MongoDB exija autenticação, adicione **usuario:senha@** antes do host na URI.

Caso você esteja conectando ao **MongoDB Atlas** (Banco para Nuvem), copie a URI de conexão do seu cluster e adicione ao arquivo de configuração

``` properties

spring.data.mongodb.uri=mongodb+srv://usuario:senha@cluster0.mongodb.net/meu_banco?retryWrites=true&w=majority

```

## Criando a Primeira Entidade com @Document

Agora, vamos criar um modelo que representa uma coleção no MongoDB.

``` Java

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios") // Define a coleção no MongoDB
public class Usuario {

    @Id
    private String id; // O _id do MongoDB é sempre String

    private String nome;
    private String email;
    private int idade;

    // Getters e Setters
}

```

A anotação **@Document(collection = "usuarios")** indica que essa classe será salva na coleção **usuarios**.

## Criando um Repositório MongoRepository

Agora, criamos um repositório para manipular os dados no MongoDB.

``` Java

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    // Métodos personalizados
    List<Usuario> findByNome(String nome);
    List<Usuario> findByIdadeGreaterThan(int idade);
}

```

O **MongoRepository<Usuario, String>** já oferece métodos CRUD prontos, como **save()**, **findAll()**, **deleteById()**, etc.
Também criamos dois métodos personalizados usando **Query Methods**.

## Criando um Service para Manipular Usuários

Agora vamos criar um UsuarioService para podermos inserir a lógica do sistema e fazer uso dos métodos do repositório do MongoDB.

``` Java

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletar(String id) {
        usuarioRepository.deleteById(id);
    }
}

```

# Trabalhando com Repositórios (MongoRepository)

O MongoRepository é uma interface fornecida pelo Spring Data MongoDB que facilita o acesso ao banco de dados sem precisar escrever queries manuais.

- Facilita operações **CRUD (Create, Read, Update, Delete)** com métodos prontos.

- Suporta consultas personalizadas com **@Query**.

- Oferece paginação e ordenação nativas.

- Permite a criação automática de consultas pelo nome do método (Query Methods).

- Usa o Spring Data para gerenciar e otimizar as interações com o MongoDB.

O MongoRepository evita que você tenha que escrever código repetitivo e consultas manuais.

## Criando um Repositório no Spring Data MongoDB

Agora, vamos criar um repositório que nos permita interagir com os dados.

``` Java

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}

```

Extende MongoRepository<Usuario, String>, onde:

Usuario → é o tipo da entidade.

String → é o tipo do id (_id no MongoDB).

Apenas com essa interface, já podemos fazer CRUD automaticamente com métodos nativos internos da interface, tais como:

``` Java

@Autowired
private UsuarioRepository usuarioRepository;

// Create - Save

Usuario usuario = new Usuario("Maria", "maria@email.com", 28);
usuarioRepository.save(usuario);

// Read - FindAll

List<Usuario> usuarios = usuarioRepository.findAll();
usuarios.forEach(u -> System.out.println(u.getNome()));

// Read - FindById

Optional<Usuario> usuario = usuarioRepository.findById("65f1c23a45b8cd1e");
usuario.ifPresent(u -> System.out.println(u.getNome()));

// Update - save

Optional<Usuario> usuarioOptional = usuarioRepository.findById("65f1c23a45b8cd1e");

if (usuarioOptional.isPresent()) {
    Usuario usuario = usuarioOptional.get();
    usuario.setNome("Maria Souza");  // Alterando nome
    usuarioRepository.save(usuario); // Salva a atualização
}

// Delete - DeleteById

usuarioRepository.deleteById("65f1c23a45b8cd1e");

```

## Criando Consultas Personalizadas (Query Methods)

O Spring Data permite criar consultas automáticas apenas pelo nome do método dentro da interface que estende o repositório!

``` Java

List<Usuario> findByNome(String nome);  // Busca pelo nome exato
List<Usuario> findByIdadeGreaterThan(int idade);  // Maiores que X anos
List<Usuario> findByEmailContaining(String email);  // Contém um termo no email

```

O Spring gera automaticamente as consultas baseadas no nome do método!

# Modelagem de Dados

A modelagem de dados no MongoDB define como os documentos são estruturados e como as coleções são organizadas. Nesse tópico, nosso objetivo será:

- Definir a estrutura dos documentos de forma eficiente.

- Garantir desempenho e escalabilidade da aplicação.

- Otimizar as consultas e reduzir a necessidade de joins complexos.

- Adaptar os dados para o uso do MongoDB, que é orientado a documentos, e não baseado em tabelas relacionais.

A diferença entre Modelagem relacional vs o MongoDB

| **Banco Relacional (SQL)**         | **MongoDB (NoSQL)**                             |
|------------------------------------|-------------------------------------------------|
| Usa tabelas e colunas              | Usa coleções e documentos                       |
| Dados normalizados                 | Dados desnormalizados (embutidos)               |
| Requer joins para relacionar dados | Usa documentos aninhados para reduzir consultas |
| Schema rígido (colunas fixas)      | Schema flexível (JSON dinâmico)                 |

No MongoDB, o design da modelagem muda bastante em relação a bancos SQL. É preciso pensar em como os dados serão consultados para definir a melhor abordagem.

## Conceitos Fundamentais sobre a Modelagem

**Documentos e Coleções:** No MongoDB, os dados são armazenados em coleções, e cada documento é um JSON (BSON) independente.

**Modelagem normalizada:** Cada entidade é separada em coleções distintas, e os documentos são referenciados entre si.

``` JSON

// Coleção 1

{
  "_id": "1",
  "nome": "Carlos",
  "pedido_id": "1001"
}

// Coleção 2

{
  "_id": "1001",
  "descricao": "Notebook Dell",
  "valor": 5000
}

```

Essa abordagem é Similar a uma relação **1:N** no SQL (chave estrangeira). É boa para relacionamentos complexos e dados que mudam com frequência, Porém, requer múltiplas consultas para recuperar os dados completos!

**Modelagem Desnormalizada (Documentos Embutidos):** Os dados relacionados são armazenados dentro do próprio documento, reduzindo a necessidade de consultas adicionais.

``` JSON

// Coleção 1

{
  "_id": "1001",
  "cliente": {
    "nome": "Carlos",
    "email": "carlos@email.com"
  },
  "descricao": "Notebook Dell",
  "valor": 5000
}

```

Se os dados forem quase sempre acessados juntos, use documentos embutidos. Caso contrário, use referências para evitar duplicação excessiva.

## Exemplos Práticos

- Modelagem com Documentos Embutidos: Agora, vamos criar um exemplo prático para ilustrar documentos embutidos.

``` Java

@Document(collection = "clientes")
public class Cliente {
    
    @Id
    private String id;
    private String nome;
    private String email;

    private Endereco endereco; // Documento embutido

    // Getters e Setters
}

public class Endereco {
    private String rua;
    private String cidade;
    private String cep;

    // Getters e Setters
}

```

- Modelagem com Referencia (**@DBRef**): Agora, vamos modelar um sistema onde Pedidos fazem referência aos Clientes, em vez de embutir tudo no mesmo documento.

``` Java

@Document(collection = "clientes")
public class Cliente {
    
    @Id
    private String id;
    private String nome;
    private String email;

    // Getters e Setters
}

@Document(collection = "pedidos")
public class Pedido {
    
    @Id
    private String id;
    private String descricao;
    private double valor;

    @DBRef  // Referência para outro documento
    private Cliente cliente;
    
    // Getters e Setters
}

```

# Queries Avançadas com Spring Data MongoDB

As consultas avançadas no Spring Data MongoDB permitem: Filtrar documentos com critérios complexos. Usar operadores como **$gte**, **$lte**, **$in**, **$regex** etc. Criar consultas personalizadas com **@Query** e Executar agregações para cálculos e estatísticas.

## Query Methods

O Spring Data permite criar consultas automaticamente, apenas pelo nome do método na interface do repositório.

``` Java

List<Usuario> findByNome(String nome); // Busca exata
List<Usuario> findByIdadeGreaterThan(int idade); // Maior que X
List<Usuario> findByEmailContaining(String email); // Contém um termo
List<Usuario> findByIdadeBetween(int min, int max); // Intervalo de idade

```

## Consultas Personalizadas com @Query

Se precisar de algo mais complexo, você pode usar a anotação **@Query**.

``` Java

@Query("{ 'idade': { $gte: ?0, $lte: ?1 } }")
List<Usuario> buscarPorFaixaEtaria(int min, int max);

```

**?0** e **?1** representam os parâmetros passados no método.

O MongoDB tem diversos operadores que podem ser usados dentro de **@Query**:

| **Operador** | **Significado**   | **Exemplo**                                  |
|--------------|-------------------|----------------------------------------------|
| $eq          | Igualdade         | { 'idade': { $eq: 25 } }                     |
| $ne          | Diferente         | { 'cidade': { $ne: 'São Paulo' } }           |
| $gt          | Maior que         | { 'preco': { $gt: 100 } }                    |
| $gte         | Maior ou igual    | { 'idade': { $gte: 18 } }                    |
| $lt          | Menor que         | { 'estoque': { $lt: 50 } }                   |
| $lte         | Menor ou igual    | { 'idade': { $lte: 30 } }                    |
| $in          | Contido em        | { 'status': { $in: ['ATIVO', 'PENDENTE'] } } |
| $regex       | Expressão Regular | { 'email': { $regex: '^a.*@gmail.com' } }    |

Por exemplo, vamos ver dois cenários de utilização para entendermos como encontrar informações de forma adequada

``` Java

// Buscar usuários que moram em "São Paulo" ou "Rio de Janeiro"

@Query("{ 'cidade': { $in: ['São Paulo', 'Rio de Janeiro'] } }")
List<Usuario> buscarPorCidade();

// Buscar usuários cujo nome começa com "A"

@Query("{ 'nome': { $regex: '^A.*' } }")
List<Usuario> buscarNomesQueComecamComA();

```

## Paginação e Ordenação

O Spring Data permite paginar os resultados usando Pageable.

``` Java

// Retorna usuários por página (5 por vez)

Page<Usuario> findByIdadeGreaterThan(int idade, Pageable pageable);

// Chamada no service

Pageable pageable = PageRequest.of(0, 5, Sort.by("nome").ascending());
Page<Usuario> pagina = usuarioRepository.findByIdadeGreaterThan(18, pageable);

```

## Agregações (@Aggregation)

As agregações permitem realizar cálculos, agrupamentos e transformações nos dados.

``` Java

// Contar quantos usuários existem por cidade

@Aggregation("{ $group: { _id: '$cidade', total: { $sum: 1 } } }")
List<CidadeUsuarios> contarUsuariosPorCidade();

// Criando a classe para representar o resultado

public class CidadeUsuarios {
    private String cidade;
    private int total;
}

```

Isso deve retornar algo como

``` JSON

[
  { "cidade": "São Paulo", "total": 120 },
  { "cidade": "Rio de Janeiro", "total": 85 }
]

```