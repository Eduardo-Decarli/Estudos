# Testes no Spring Boot

Testar aplicações Spring Boot é essencial para garantir que o código funcione corretamente e continue estável conforme novas funcionalidades são adicionadas. O Spring Boot oferece um ecossistema completo para testes, abrangendo desde testes unitários até testes de integração.

No Spring Boot, os testes são feitos utilizando JUnit e Mockito, além de ferramentas como Spring Boot Test, que facilita a inicialização do contexto da aplicação durante os testes.

## Tipos de Testes no Spring Boot

**Testes Unitários:** Focam em testar unidades individuais do código, como métodos e classes isoladas.
Utilizam JUnit e Mockito para simular dependências.

**Testes de Integração:** Validam a interação entre diferentes partes do sistema, como banco de dados e serviços externos. Utilizam Spring Boot Test para carregar o contexto da aplicação.

**Testes de Controllers e Services:** Garantem que os endpoints e serviços funcionam corretamente. Podem ser feitos com MockMvc (para controllers) e Mockito (para serviços).

**Testes de Repositórios:** Testam a camada de persistência utilizando bancos de dados em memória, como H2. Utilizam Spring Data JPA para validar queries e operações com o banco de dados.

## O que é e para que serve?

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
