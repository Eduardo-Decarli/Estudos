# Exceções Personalizadas e Manipulação Global em Java

Quando algo não sai como esperado, uma exceção é lançada. Se essa exceção não for tratada de forma adequada, o usuário pode receber mensagens técnicas e pouco amigáveis – ou, pior, informações sensíveis sobre o sistema. Para resolver isso, adotamos duas boas práticas:

**Criação de Exceções Personalizadas:** Permite identificar e tratar erros específicos de forma mais clara.

**Manipulação Global de Exceções:** Com o uso de anotações como **@ControllerAdvice** ou **@RestControllerAdvice**, centralizamos o tratamento de erros, retornando respostas padronizadas e amigáveis ao cliente.


## Criando Exceções Personalizadas

Criar exceções personalizadas pode ajudar a tornar seu código mais legível e a fornecer mensagens de erro mais significativas. Aqui está um exemplo de como criar uma exceção personalizada:

``` Java

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

```

Agora, podemos lançar essa exceção quando o recurso não for encontrado:

``` Java

public Usuario buscarUsuarioPorId(Long id) {
    return usuarioRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Usuário com ID " + id + " não encontrado"));
}

```

## Manipulação Global de Exceções

Sem um tratamento global, o Spring Boot retorna mensagens de erro genéricas. Para customizá-las, usamos uma classe anotada com **@ControllerAdvice** (ou **@RestControllerAdvice**, se estivermos trabalhando com APIs REST) e métodos anotados com **@ExceptionHandler**. Vamos criar uma classe de exemplo que captura as exceptions da aplicação.


``` Java

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request, BindingResult result){
        ErrorMessage error = new ErrorMessage(request, HttpStatus.BAD_REQUEST, "The fields entered are invalid", result);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.APPLICATION_JSON).body(error);
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorMessage> handlerNotFoundException(NotFoundException ex, HttpServletRequest request) {
        ErrorMessage error = new ErrorMessage(request, HttpStatus.NOT_FOUND, ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(DuplicateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorMessage> handlerDuplicateException(DuplicateException ex, HttpServletRequest request) {
        ErrorMessage error = new ErrorMessage(request, HttpStatus.CONFLICT, ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}

```

- **@RestControllerAdvice:** Esta anotação marca a classe como um componente especializado para tratamento global de exceções. Permite centralizar o tratamento de exceções para toda a aplicação. Combina as funcionalidades de **@ControllerAdvice** e **@ResponseBody**

- **@ExceptionHandler:** Esta anotação é usada para definir métodos que lidam com tipos específicos de exceções. No exemplo acima, temos dois métodos: um para **ResourceNotFoundException** e outro para exceções genéricas.

Este código define um **GlobalExceptionHandler** em uma aplicação Spring, com o objetivo de centralizar o tratamento de exceções. Quando uma exceção ocorre durante a execução de um controller, o **GlobalExceptionHandler** captura e processa essas exceções, retornando respostas adequadas ao cliente. 

**MethodArgumentNotValidException** é uma exceção gerada quando a validação dos dados de entrada falha. Ela é comum em **APIs REST**, onde os parâmetros enviados para o servidor (como um corpo JSON) não atendem às regras de validação (como as anotações @NotNull, @Pattern, etc.).

**BindingResult** contém os detalhes dos erros de validação, como quais campos falharam e a mensagem de erro associada a cada falha.

Um ErrorMessage é criado com os seguintes parâmetros:

- **HttpServletRequest:** Usado para obter informações sobre a requisição (por exemplo, caminho e método).

- **HttpStatus.BAD_REQUEST:** O código de status HTTP 400 (Bad Request) indica que a requisição do cliente contém erros (no caso, erros de validação).

- A mensagem padrão "The fields entered are invalid" é usada para indicar que houve um erro de validação.

- **result:** O objeto **BindingResult** contém os erros de validação que são passados para o ErrorMessage.

A resposta é retornada com o **status 400** e o tipo de conteúdo como **JSON (contentType(MediaType.APPLICATION_JSON))**.
O corpo da resposta conterá os detalhes do erro de validação, incluindo os campos inválidos e as mensagens associadas a eles.

``` JSON

{
    "path": "/api/v1/user",
    "method": "POST",
    "status": 400,
    "statusText": "Bad Request",
    "message": "The fields entered are invalid",
    "errors": {
        "firstName": "First name must start with a capital letter.",
        "email": "Email must be a valid format."
    }
}


```

## Uso em Controladores

Quando você lança uma exceção em um controlador, o **@ControllerAdvice** intercepta essa exceção e executa o método anotado com **@ExceptionHandler** correspondente:

``` Java

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @GetMapping("/{id}")
    public ResponseEntity<String> getResource(@PathVariable String id) {
        // Suponha que não encontramos o recurso
        throw new ResourceNotFoundException("Recurso com ID " + id + " não encontrado.");
    }
}

```

## Respostas Personalizadas

Para tornar as respostas de erro mais informativas e padronizadas, é interessante definir uma classe que represente os detalhes do erro. Assim, podemos incluir informações como código de status, mensagem e timestamp.

Primeiro criados uma classe-entidade para servir como modelo de respostas de erro.

``` Java

@Data
public class ErrorMessage {

    private String path;
    private String method;
    private int status;
    private String statusText;
    private String message;

    private Map<String, String> errors;

    public ErrorMessage() {
    }

    public ErrorMessage(HttpServletRequest request, HttpStatus status, String message) {
        this.path = request.getRequestURI();
        this.method = request.getMethod();
        this.status = status.value();
        this.statusText = status.getReasonPhrase();
        this.message = message;
    }

    public ErrorMessage(HttpServletRequest request, HttpStatus status, String message, BindingResult result) {
        this.path = request.getRequestURI();
        this.method = request.getMethod();
        this.status = status.value();
        this.statusText = status.getReasonPhrase();
        this.message = message;
        addErrors(result);
    }

    private void addErrors(BindingResult result) {
        this.errors = new HashMap<>();
        for (FieldError fieldError : result.getFieldErrors()) {
            this.errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
    }
}

```

- **path:** Caminho da requisição (/usuarios/1, por exemplo).

- **method:** Método HTTP (GET, POST, PUT, etc.).

- **status:** Código HTTP (exemplo: 400 para erro de requisição inválida).

- **statusText:** Texto do status HTTP (exemplo: "Bad Request").

- **message:** Mensagem descritiva do erro.

- **errors:** Mapeia campos inválidos e mensagens correspondentes (usado para erros de validação).

O segundo construtor adiciona um parâmetro extra, **BindingResult**, que contém detalhes dos erros de validação. Ele inicializa os atributos e chama **addErrors(result)** para extrair os erros de validação de formulário, permitindo integração com **Jakarta Validation** por exemplo.

# Fluxo Completo de Tratamento de Exceções

1. Lançamento da exceção: Em qualquer ponto da aplicação, se uma condição de erro ocorrer, lança-se uma exceção personalizada (ou padrão) utilizando throw new ....

2. Intercepção Global: A classe anotada com @RestControllerAdvice intercepta a exceção com base no seu tipo. O método anotado com **@ExceptionHandler** correspondente é acionado.

3. Construção da Resposta: No método de tratamento, é criado um objeto (como ErrorResponse) contendo detalhes do erro e retornado um ResponseEntity com o status HTTP apropriado.

4. Retorno ao Cliente: O Spring converte o objeto retornado para JSON (ou outro formato configurado) e envia a resposta com o código de status definido.