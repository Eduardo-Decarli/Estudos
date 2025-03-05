
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