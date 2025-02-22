# Testes no Spring Boot

Testar aplicações Spring Boot é essencial para garantir que o código funcione corretamente e continue estável conforme novas funcionalidades são adicionadas. O Spring Boot oferece um ecossistema completo para testes, abrangendo desde testes unitários até testes de integração.

No Spring Boot, os testes são feitos utilizando JUnit e Mockito, além de ferramentas como Spring Boot Test, que facilita a inicialização do contexto da aplicação durante os testes.

## Tipos de Testes no Spring Boot

**Testes Unitários:** Focam em testar unidades individuais do código, como métodos e classes isoladas.
Utilizam JUnit e Mockito para simular dependências.

**Testes de Integração:** Validam a interação entre diferentes partes do sistema, como banco de dados e serviços externos. Utilizam Spring Boot Test para carregar o contexto da aplicação.

**Testes de Controllers e Services:** Garantem que os endpoints e serviços funcionam corretamente. Podem ser feitos com MockMvc (para controllers) e Mockito (para serviços).

**Testes de Repositórios:** Testam a camada de persistência utilizando bancos de dados em memória, como H2. Utilizam Spring Data JPA para validar queries e operações com o banco de dados.

# O que é e para que serve?

Testes unitários garantem que pequenas partes do código (como métodos ou classes) funcionem conforme esperado de forma isolada. No Spring Boot, JUnit é a principal ferramenta para escrever testes, enquanto Mockito ajuda a simular dependências externas sem precisar instanciar objetos reais.

## Conceitos Fundamentais

- JUnit: Framework de testes unitários mais popular no Java.

- Mockito: Biblioteca de mocking que permite simular o comportamento de dependências.

- @Test: Indica que um método é um teste unitário.

- @BeforeEach / @AfterEach: Executam métodos antes ou depois de cada teste.

- @Mock: Cria um mock de uma classe ou interface.

- @InjectMocks: Injeta os mocks criados na classe testada.

- when(): Configura o comportamento de um mock.

Vamos testar um Service que depende de um Repository

``` Java

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }
}

```

``` Java

@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    @Test
    void buscarProdutoPorId_deveRetornarProduto_quandoExistir() {
        Produto produto = new Produto(1L, "Notebook", 3000.0);
        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Produto resultado = produtoService.buscarProdutoPorId(1L);

        assertNotNull(resultado);
        assertEquals("Notebook", resultado.getNome());
    }

    @Test
    void buscarProdutoPorId_deveLancarExcecao_quandoNaoExistir() {
        when(produtoRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> produtoService.buscarProdutoPorId(1L));
    }
}

```

# Testes de Integração com Spring Boot Test

Diferente dos testes unitários, que testam partes isoladas do código, os testes de integração verificam se múltiplos componentes do sistema funcionam juntos corretamente. No Spring Boot, o Spring Boot Test facilita a configuração e execução desses testes, permitindo testar desde a comunicação entre serviços até interações com o banco de dados.

- @SpringBootTest: Carrega o contexto da aplicação para permitir testes de integração

- @TestConfiguration: Define configurações específicas para os testes

- @Transactional: Garante que os dados inseridos durante o teste sejam revertidos ao final

- TestRestTemplate: Cliente HTTP simplificado para testes de integração

- @Sql: Permite executar scripts SQL antes e depois dos testes.

Vamos criar um teste de integração para validar um endpoint REST de busca de produtos.

``` Java

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProduto(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

```

``` Java

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Usa um banco real
@Transactional // Garante que os dados serão revertidos após o teste
class ProdutoControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Test
    void buscarProduto_deveRetornarProduto_quandoExistir() {
        Produto produto = new Produto(null, "Smartphone", 2500.0);
        produto = produtoRepository.save(produto);

        ResponseEntity<Produto> response = restTemplate.getForEntity("/produtos/" + produto.getId(), Produto.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Smartphone", response.getBody().getNome());
    }

    @Test
    void buscarProduto_deveRetornar404_quandoNaoExistir() {
        ResponseEntity<Produto> response = restTemplate.getForEntity("/produtos/999", Produto.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}

```

# Testando Controllers e Services no SpringBoot

Os testes de Controllers verificam se os endpoints da API retornam os resultados esperados, enquanto os testes de Services validam a lógica de negócio.
No Spring Boot, usamos o MockMvc para testar Controllers de forma isolada e o Mockito para simular dependências nos Services.

- @WebMvcTest: Carrega apenas os componentes relacionados à Web, sem iniciar toda a aplicação.

- MockMvc: Simula requisições HTTP e verifica respostas.

- @MockBean: Cria um mock de um bean no contexto do Spring (ideal para services).

- @Service: Define classes de serviço no Spring Boot.

``` Java

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto buscarProduto(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }
}

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProduto(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(produtoService.buscarProduto(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

```

Testando o Service

``` Java

@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    @Test
    void buscarProduto_deveRetornarProduto_quandoExistir() {
        Produto produto = new Produto(1L, "Notebook", 3000.0);
        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Produto resultado = produtoService.buscarProduto(1L);

        assertNotNull(resultado);
        assertEquals("Notebook", resultado.getNome());
    }

    @Test
    void buscarProduto_deveLancarExcecao_quandoNaoExistir() {
        when(produtoRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> produtoService.buscarProduto(1L));
    }
}

```

Testando os Controllers

``` Java

@WebMvcTest(ProdutoController.class)
class ProdutoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProdutoService produtoService;

    @Test
    void buscarProduto_deveRetornarProduto_quandoExistir() throws Exception {
        Produto produto = new Produto(1L, "Smartphone", 2500.0);
        when(produtoService.buscarProduto(1L)).thenReturn(produto);

        mockMvc.perform(get("/produtos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Smartphone"));
    }

    @Test
    void buscarProduto_deveRetornar404_quandoNaoExistir() throws Exception {
        when(produtoService.buscarProduto(1L)).thenThrow(new RuntimeException("Produto não encontrado"));

        mockMvc.perform(get("/produtos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

```

# Teste de Repositórios com banco de dados em memória (H2)

Os testes de repositório verificam se a camada de persistência está funcionando corretamente. Para evitar impactar um banco de dados real, usamos o H2, um banco em memória que permite rodar testes isolados.

- H2 Database: Banco de dados em memória usado para testes.

- @DataJpaTest: Configuração que carrega apenas os componentes do JPA e desativa outras partes da aplicação.

- @Transactional (por padrão no @DataJpaTest): Garante que cada teste seja revertido ao final.

- @TestEntityManager: Alternativa ao EntityManager para gerenciar entidades nos testes.

Primeiro vamos configurar o H2 no nosso ambiente de testes **application-test.yml**

``` yml

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driverClassName: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: update
    show-sql: true

```

``` Java

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Usa o banco H2
class ProdutoRepositoryTest {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Test
    void salvarProduto_devePersistirDados() {
        Produto produto = new Produto(null, "Teclado", 150.0);
        Produto salvo = produtoRepository.save(produto);

        assertNotNull(salvo.getId());
        assertEquals("Teclado", salvo.getNome());
    }

    @Test
    void buscarPorNome_deveRetornarProdutos() {
        Produto p1 = new Produto(null, "Mouse", 50.0);
        Produto p2 = new Produto(null, "Mousepad", 30.0);
        produtoRepository.saveAll(List.of(p1, p2));

        List<Produto> resultado = produtoRepository.findByNomeContaining("Mouse");

        assertEquals(2, resultado.size());
    }
}

```