# Testes Unitários com JUnit e Mockito no Spring Boot

Testes unitários são testes automatizados que verificam o funcionamento de pequenas partes do código, como métodos de uma classe, de forma isolada. No Spring Boot, o JUnit é a biblioteca mais utilizada para escrever testes, enquanto o Mockito é uma ferramenta poderosa para criar objetos simulados (mocks), permitindo testar componentes sem dependências reais.

O objetivo dos testes unitários é garantir que cada parte do sistema funcione corretamente e evitar que mudanças no código introduzam erros inesperados.

## Conceitos Fundamentais

**JUnit:** JUnit é um framework para testes unitários em java. Ele fornece anotações para definir e organizar testes, além de métodos para verificar resultados esperados. Vamos ver algumas de suas anotações

- **@Test:** indica que o método é um teste.

- **@BeforeEach:** Enquadra algo a ser executado antes de cada teste.

- **@AfterEach:** Enquadra algo a ser executado após cada teste.

- **@BeforeAll** e **@AfterAll**: Executados uma única vez antes e depois de todos os testes.

- **@DisplayName:** Define um nome descritivo para o teste.

- **@Nested:** Agrupa testes relacionados.

**Mockito:** Mockito é uma biblioteca que permite criar **mocks**, ou seja, simular o comportamento de dependências externas (banco de dados, serviços, etc...). Suas principais anotações são:

- **@Mock:** Cria um mock de uma classe ou interface.

- **@InjectMocks:** Injeta mocks em uma classe que será testada.

- **@when(...).thenReturn(...):** Define o comportamento de um mock.

- **verify(...):** Verifica se um método foi chamado.

## Exemplos Práticos

Vamos criar um serviço de autenticação e testá-lo usando **JUnit** e **Mockito**.

``` Java

// Código da Classe de Serviço 

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}

// Código da classe de testes

@ExtendWith(MockitoExtension.class) // Ativa o suporte ao Mockito
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("Deve retornar verdadeiro quando as credenciais são válidas")
    void testLoginComCredenciaisValidas() {
        // Arrange
        User mockUser = new User("admin", "12345");
        when(userRepository.findByUsername("admin")).thenReturn(mockUser);

        // Act
        boolean resultado = authService.login("admin", "12345");

        // Assert
        assertTrue(resultado);
    }

    @Test
    @DisplayName("Deve retornar falso quando a senha está errada")
    void testLoginComSenhaErrada() {
        // Arrange
        User mockUser = new User("admin", "12345");
        when(userRepository.findByUsername("admin")).thenReturn(mockUser);

        // Act
        boolean resultado = authService.login("admin", "wrongPassword");

        // Assert
        assertFalse(resultado);
    }

    @Test
    @DisplayName("Deve retornar falso quando o usuário não existe")
    void testLoginUsuarioNaoEncontrado() {
        // Arrange
        when(userRepository.findByUsername("inexistente")).thenReturn(null);

        // Act
        boolean resultado = authService.login("inexistente", "12345");

        // Assert
        assertFalse(resultado);
    }
}

```

- Mockito simula o comportamento do **UserRepository**.

- JUnit valida se o método login retorna os valores esperados.

- Testamos cenários diferentes (credenciais corretas, senha errada, usuário inexistente)

## Boas práticas

- **Testes independentes:** Cada teste deve rodar sem depender de outro.

- **Cobertura de diferentes cenários:** Teste casos normais e limites (ex.: credenciais erradas).

**Use mocks para dependências externas:** Evita acessar banco de dados diretamente.

- **Dê nomes claros aos testes:** Facilita entender falhas rapidamente.

- **Automatize os testes:** Execute-os sempre antes de um commit.

## Conclusão

Testes unitários garantem qualidade e evitam regressões no código. O JUnit facilita a escrita dos testes, enquanto o Mockito permite simular dependências, tornando os testes mais eficientes. Com boas práticas, conseguimos criar uma base confiável de testes e aumentar a confiabilidade das nossas aplicações.