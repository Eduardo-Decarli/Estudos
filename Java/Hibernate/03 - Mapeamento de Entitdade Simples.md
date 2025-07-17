# Anotações básicas: @Entity, @Id, @GeneratedValue, @Column, @Table

Vamos para as anotações básicas do Hibernate/JPA, que são fundamentais para mapear suas classes Java para tabelas no banco de dados.

- **@Entity** -> Marca uma classe Java como uma entidade persistente (que será mapeada para uma tabela no banco).

``` Java

@Entity
public class Usuario {
    // campos e métodos
}

```

- @Table -> Define o nome da tabela no banco (opcional). Se não usar, o Hibernate cria a tabela com o nome da classe.

``` Java

@Entity
@Table(name = "USUARIOS")
public class Usuario {
    // ...
}

```

- @Id -> Marca o atributo que será a chave primária da tabela.

``` Java

@Entity
public class Usuario {
    @Id
    private Long id;
    // ...
}

```

- @GeneratedValue -> Define a estratégia de geração do valor do id (chave primária).

| Tipo       | Descrição                                           |
| ---------- | --------------------------------------------------- |
| `IDENTITY` | Auto-incremento do banco (ex: `SERIAL`)             |
| `SEQUENCE` | Usa uma sequência do banco (ex: Oracle, PostgreSQL) |
| `AUTO`     | Hibernate decide automaticamente                    |
| `TABLE`    | Usa uma tabela auxiliar para gerar ids              |

``` Java

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

```

- @Column -> Configura o mapeamento da propriedade para a coluna do banco (opcional).

    - name: nome da coluna
    - nullable: se pode ser null (default true)
    - unique: se deve ser único no banco
    - length: tamanho para colunas de texto (VARCHAR)
    - insertable e updatable: controla se pode ser inserido/atualizado


``` Java

@Column(name = "nome", nullable = false, length = 100, unique = true)
private String nome;

```

- @Transient -> Marca um atributo para não ser persistido no banco.

``` Java

@Transient
private String campoNaoPersistido;

```

- @Temporal -> Define como a data será armazenada (Data, Hora ou Timestamp)

``` Java

@Temporal(TemporalType.DATE)
private Date dataNascimento;

```

# Criação de entidades e persistência simples

Vamos montar um exemplo com uma classe Usuário para mostrar o fluxo

``` Java

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    // Construtores, getters e setters
}

public class UsuarioTeste {

    public static void main(String[] args) {
        
        // Criar SessionFactory (carrega config hibernate.cfg.xml)
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();

        // Abrir sessão
        Session session = sessionFactory.openSession();

        // Iniciar transação
        Transaction transaction = session.beginTransaction();

        // Criar objeto Usuario
        Usuario usuario = new Usuario("Eduardo", "eduardo@email.com");

        // Persistir
        session.save(usuario);

        // Commit e fechar
        transaction.commit();
        session.close();

        System.out.println("Usuário salvo com id: " + usuario.getId());
    }
}

```

# Operações básicas: CRUD com Session ou EntityManager