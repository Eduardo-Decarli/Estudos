# O que é Spring MVC?
Spring MVC (Model-View-Controller) é um módulo do Spring Framework que facilita o desenvolvimento de aplicações web, especialmente APIs REST. Ele segue o padrão de arquitetura MVC, que separa a lógica de negócios (Model), a interface do usuário (View) e o controle de fluxo (Controller).

## Componentes do Spring MVC

**Model:** Representa os dados da aplicação. No contexto de APIs REST, o Model geralmente é composto por entidades (classes Java) que representam os recursos da API.

**View:** Em APIs REST, a View é substituída pela serialização de dados (JSON, XML, etc.), que é enviada como resposta para o cliente.

**Controller:** Gerencia as requisições HTTP, invoca a lógica de negócios e retorna a resposta apropriada.

## Fluxo de uma Requisição no Spring MVC

1. O cliente (navegador, aplicativo móvel, etc.) faz uma requisição HTTP para um endpoint da API.

2. O **DispatcherServlet** (componente central do Spring MVC) recebe a requisição e a encaminha para o Controller apropriado com base no mapeamento de URLs.

3. O Controller processa a requisição, interage com a camada de serviço (se necessário) e retorna uma resposta.

4. A resposta é serializada (geralmente em JSON) e enviada de volta ao cliente.

# Criando Controllers (@RestController, @RequestMapping)

No Spring Boot, os controllers são responsáveis por lidar com as requisições HTTP e definir como a aplicação responde a elas. Eles são essenciais na construção de APIs REST.

**@RestController:**  anotação **@RestController** é uma especialização da anotação **@Controller**. Ela combina duas funcionalidades principais. 

- @Controller → Indica que a classe é um controlador no Spring MVC, responsável por processar requisições HTTP.

- @ResponseBody → Faz com que o retorno dos métodos do controlador seja convertido automaticamente para JSON (ou XML, dependendo da configuração).

Usamos @RestController quando queremos criar APIs REST que retornam dados estruturados, como JSON ou XML, em vez de páginas HTML.

**@RequestMapping:** A anotação @RequestMapping define o mapeamento de URLs para um controlador ou método. Pode ser aplicada tanto em nível de classe quanto em nível de métodos:

- No nível da classe → Define um prefixo comum para os endpoints dentro do controlador.

- No nível do método → Define um endpoint específico e pode incluir configurações como o método HTTP permitido.

Pode especificar o método HTTP (ex: method = RequestMethod.GET), mas é mais comum usar anotações específicas como @GetMapping.

``` Java

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExemploController {

    @GetMapping("/mensagem")
    public String obterMensagem() {
        return "Olá, Spring Boot!";
    }
}

```

- **@RestController** → Declara que esta classe é um controlador REST.

- **@RequestMapping("/api")** → Define um prefixo para todas as rotas dentro desta classe.

- **@GetMapping("/mensagem")** → Define um endpoint que responde a requisições GET na URL http://localhost:8080/api/mensagem.

- O retorno do método obterMensagem() é uma string, que será convertida automaticamente para JSON.

# Manipulando Requisições

No Spring Boot, o Spring MVC é o principal framework para criar APIs RESTful e manipular requisições HTTP. Ele fornece uma maneira simples e poderosa de mapear métodos de controle (controllers) para requisições específicas (como GET, POST, etc.). A chave para isso são as anotações (annotations) que você usa para mapear esses métodos.

- @GetMapping:  anotação @GetMapping é usada para mapear requisições HTTP GET para um método específico em um controller. O método anotado com @GetMapping é chamado sempre que uma requisição GET é recebida no endpoint especificado.

``` Java

@RestController
public class MyController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}

```

Aqui, toda vez que o endpoint **/hello** for acessado via requisição GET, o método sayHello() será executado e retornará a string "Hello, World!".

- @PostMapping: Similar ao @GetMapping, o @PostMapping é usado para mapear requisições HTTP POST para um método. O POST é normalmente usado para enviar dados para o servidor, como criar um novo recurso.

``` Java

@RestController
public class MyController {

    @PostMapping("/create")
    public String createEntity(@RequestBody MyEntity entity) {
        // Processamento da criação
        return "Entity created!";
    }
}

```

Neste exemplo, ao fazer uma requisição POST para o **endpoint /create**, o Spring chamará o método createEntity() e usará o corpo da requisição (enviado no formato JSON, por exemplo) para mapear os dados para a classe MyEntity.

- @PutMapping: A anotação @PutMapping é utilizada para mapear requisições HTTP PUT, que são frequentemente usadas para atualizar um recurso existente. Ela funciona de maneira similar ao @PostMapping, mas é usada quando você deseja modificar algo que já existe.

``` Java

@RestController
public class MyController {

    @PutMapping("/update/{id}")
    public String updateEntity(@PathVariable Long id, @RequestBody MyEntity entity) {
        // Atualizar a entidade com o ID
        return "Entity updated!";
    }
}

```

No exemplo acima, a requisição PUT para **/update/{id}** será capturada e o método updateEntity() será chamado para atualizar a entidade com o ID fornecido.

- @DeleteMapping: A anotação @DeleteMapping é usada para mapear requisições HTTP DELETE. Ela é tipicamente utilizada quando você quer deletar um recurso específico.

``` Java

@RestController
public class MyController {

    @DeleteMapping("/delete/{id}")
    public String deleteEntity(@PathVariable Long id) {
        // Deletar a entidade com o ID
        return "Entity deleted!";
    }
}

```

Aqui, ao fazer uma requisição DELETE para **/delete/{id}**, o método deleteEntity() será executado para excluir o recurso correspondente.

# O que é ResponseEntity?

O Spring Boot permite retornar diferentes tipos de respostas HTTP em um controller REST. O uso da classe ResponseEntity<T> é uma maneira poderosa de personalizar tanto o corpo da resposta quanto o código de status HTTP.

ResponseEntity<T> é uma classe do Spring que representa uma resposta HTTP completa, incluindo:

- O corpo da resposta (T pode ser um objeto, uma lista, uma string, etc.).

- O status HTTP (200 OK, 404 Not Found, 500 Internal Server Error, etc.).

- Os cabeçalhos HTTP (opcionais).

``` Java

@RestController
public class MyController {

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello, World!");
    }
}

```

Aqui, ResponseEntity.ok("Hello, World!") retorna a string "Hello, World!" com o status HTTP 200 OK.

## Personalizar o Status HTTP

Podemos especificar qualquer status HTTP com ResponseEntity.status().

``` Java

@GetMapping("/notfound")
public ResponseEntity<String> notFoundExample() {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recurso não encontrado");
}

```

Aqui, HttpStatus.NOT_FOUND retorna 404 Not Found, indicando que o recurso solicitado não foi encontrado.

## Trabalhando com Objetos no Corpo da Resposta

Podemos retornar um objeto Java como resposta.

``` Java

@RestController
public class MyController {

    @GetMapping("/user")
    public ResponseEntity<User> getUser() {
        User user = new User(1L, "João", "joao@email.com");
        return ResponseEntity.ok(user);
    }
}

```

O Spring automaticamente serializa o objeto User para JSON. O status HTTP 200 OK é retornado junto com o objeto.

# @PathVariable e @RequestParam

Vamos abordar como trabalhar com @PathVariable e @RequestParam no Spring Boot. Essas anotações são essenciais para extrair dados da URL e dos parâmetros de consulta (query parameters), permitindo que você crie endpoints dinâmicos e flexíveis.

## O que é @ParthVariable

@PathVariable é usada para extrair valores diretamente da URI (caminho da requisição). Ela mapeia segmentos da URL para os parâmetros do método do seu controller.

Imagine um endpoint para buscar informações de um usuário pelo seu ID. A URL pode ser: /users/123, onde 123 é o valor dinâmico do ID.

``` Java

@RestController
public class UserController {

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // Aqui você buscaria o usuário pelo ID informado.
        User user = userService.findById(id);
        
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(user);
    }
}

```

A parte **{id}** na anotação **@GetMapping("/users/{id}")** indica que esse segmento da URL será extraído e passado para o parâmetro id do método, graças à anotação **@PathVariable**.

## O que é @RequestParam?

**@RequestParam** é utilizada para capturar parâmetros de consulta que são passados na URL após o símbolo de ?.
Esses parâmetros geralmente representam filtros, paginação, ordenação ou outras informações opcionais.

Imagine um endpoint que pesquisa usuários pelo nome, usando a URL: /search?name=João.

``` Java

@RestController
public class UserController {

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String name) {
        // Aqui você aplicaria um filtro para buscar os usuários que contenham o nome informado.
        List<User> users = userService.findByName(name);
        return ResponseEntity.ok(users);
    }
}

```

# Serialização e Desserialização com Jackson

Vamos explorar como o Jackson é utilizado no Spring Boot para converter objetos Java em JSON (serialização) e JSON em objetos Java (desserialização). Essa funcionalidade é essencial para o desenvolvimento de APIs REST, pois permite o intercâmbio de informações entre o cliente e o servidor.

## Introdução ao Jackson

Jackson é uma biblioteca de processamento de JSON amplamente utilizada no ecossistema Spring.

Quando você adiciona o starter spring-boot-starter-web em seu projeto, o Spring Boot já configura automaticamente o Jackson para serializar e desserializar objetos.

No contexto de controllers REST, quando você retorna um objeto Java, o Spring Boot converte esse objeto para JSON antes de enviá-lo na resposta HTTP. Da mesma forma, dados JSON enviados no corpo de uma requisição são convertidos para um objeto Java.

## Serialização (Java → JSON)

Serialização é o processo de converter um objeto Java em uma representação JSON. O Jackson analisa os atributos do objeto e os transforma em pares chave/valor no JSON.

``` Java

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private Long id;
    
    private String name;
    
    @JsonProperty("email_address")
    private String email;
    
    @JsonIgnore
    private String password;

    // Construtores, getters e setters
    public User() {}

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    // Getters e Setters...
}

```

- @JsonProperty("email_address"): O campo email será mapeado para a chave email_address no JSON.

- @JsonIgnore: O campo password não será incluído na saída JSON, protegendo informações sensíveis.

## Desserialização (JSON → Java)

Desserialização é o processo de converter dados JSON recebidos em um objeto Java. O Jackson mapeia as chaves do JSON para os atributos do objeto, utilizando os setters ou construtores.

Você pode utilizar anotações para desserializar via construtor, garantindo imutabilidade ou preenchimento obrigatório dos atributos.

``` Java

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

    private Long id;
    private String name;
    private String email;

    @JsonCreator
    public User(@JsonProperty("id") Long id, 
                @JsonProperty("name") String name, 
                @JsonProperty("email_address") String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    // Getters (não precisamos de setters se o objeto for imutável)
}

```

## Customizações e Anotações Adicionais

Você pode customizar a formatação de datas e outros tipos

``` Java

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class Event {
    private String title;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime eventDate;

    // Construtores, getters e setters...
}

```

Ao serializar ou desserializar o atributo **eventDate**, o Jackson utilizará o padrão especificado.

Outras Anotações Úteis:

- @JsonInclude: Controla quais valores serão incluídos na serialização (por exemplo, ignorar null).

- @JsonIgnoreProperties: Permite ignorar propriedades desconhecidas ao desserializar.