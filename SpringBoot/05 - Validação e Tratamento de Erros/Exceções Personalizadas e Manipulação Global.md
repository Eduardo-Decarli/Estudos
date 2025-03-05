# Exceções Personalizadas e Manipulação Global em Java

Quando algo não sai como esperado, uma exceção é lançada. Se essa exceção não for tratada de forma adequada, o usuário pode receber mensagens técnicas e pouco amigáveis – ou, pior, informações sensíveis sobre o sistema. Para resolver isso, adotamos duas boas práticas:

**Criação de Exceções Personalizadas:** Permite identificar e tratar erros específicos de forma mais clara.

**Manipulação Global de Exceções:** Com o uso de anotações como @ControllerAdvice ou @RestControllerAdvice, centralizamos o tratamento de erros, retornando respostas padronizadas e amigáveis ao cliente.


# Criando Exceções Personalizadas

Podemos criar nossas próprias exceções para tratar erros específicos. Geralmente, estendemos a classe RuntimeException para não sermos obrigados a declarar o lançamento da exceção em todos os métodos.

``` Java

public class UsuarioNaoEncontradoException extends RuntimeException {
    public UsuarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}

```

Agora, podemos lançar essa exceção quando o usuário não for encontrado:

``` Java

public Usuario buscarUsuarioPorId(Long id) {
    return usuarioRepository.findById(id)
        .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado"));
}

```

## Manipulando Exceções Globalmente

Sem um tratamento global, o Spring Boot retorna mensagens de erro genéricas. Para customizá-las, usamos uma classe anotada com @ControllerAdvice (ou @RestControllerAdvice, se estivermos trabalhando com APIs REST) e métodos anotados com @ExceptionHandler.

Criamos uma classe global para capturar erros e devolver respostas padronizadas:

``` Java

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
        return ex.getMessage();
    }
}

```

Neste exemplo, quando um UsuarioNaoEncontradoException for lançado, a API retorna um status 404 Not Found e a mensagem contida na exceção.

## Capturando Diversos Tipos de Erros

Para tornar as respostas de erro mais informativas e padronizadas, é interessante definir uma classe que represente os detalhes do erro. Assim, podemos incluir informações como código de status, mensagem e timestamp.

Primeiro criados uma classe-entidade para servir como modelo de respostas de erro.

``` Java

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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

    @Override
    public String toString() {
        return "ErrorMessage{" +
                "path='" + path + '\'' +
                ", method='" + method + '\'' +
                ", status=" + status +
                ", statusText='" + statusText + '\'' +
                ", message='" + message + '\'' +
                ", errors=" + errors +
                '}';
    }
}

```

- path: Caminho da requisição (/usuarios/1, por exemplo).

- method: Método HTTP (GET, POST, PUT, etc.).

- status: Código HTTP (exemplo: 400 para erro de requisição inválida).

- statusText: Texto do status HTTP (exemplo: "Bad Request").

- message: Mensagem descritiva do erro.

- errors: Mapeia campos inválidos e mensagens correspondentes (usado para erros de validação).

O segundo construtor adiciona um parâmetro extra, **BindingResult**, que contém detalhes dos erros de validação.

Ele inicializa os atributos e chama addErrors(result) para extrair os erros de validação de formulário, permitindo integração com Jakarta Validation por exemplo.

Após isso, podemos criar uma classe que irá capturar as exceptions no projeto e irá incorporar o modelo de mensagem de erro em todas as exceptions automaticamente, desse jeito podemos deixar organizado e adequado para receber diversos tipos de erros.

``` java

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ResponseEntity<ErrorResponse> handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request, BindingResult result){
        ErrorMessage error = new ErrorMessage(request, HttpStatus.BAD_REQUEST, "The fields entered are invalid", result);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.APPLICATION_JSON).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleErroGeral(Exception ex) {
        // É possível registrar (log) os detalhes da exceção aqui
        ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Erro interno no servidor.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

```

Este código define um GlobalExceptionHandler em um aplicativo Spring, com o objetivo de centralizar o tratamento de exceções. Quando uma exceção ocorre durante a execução de um controller, o GlobalExceptionHandler captura e processa essas exceções, retornando respostas adequadas ao cliente. 

**MethodArgumentNotValidException** é uma exceção gerada quando a validação dos dados de entrada falha. Ela é comum em APIs REST, onde os parâmetros enviados para o servidor (como um corpo JSON) não atendem às regras de validação (como as anotações @NotNull, @Pattern, etc.).
**BindingResult** contém os detalhes dos erros de validação, como quais campos falharam e a mensagem de erro associada a cada falha.

Um ErrorMessage é criado com os seguintes parâmetros:

- HttpServletRequest: Usado para obter informações sobre a requisição (por exemplo, caminho e método).

- HttpStatus.BAD_REQUEST: O código de status HTTP 400 (Bad Request) indica que a requisição do cliente contém erros (no caso, erros de validação).

- A mensagem padrão "The fields entered are invalid" é usada para indicar que houve um erro de validação.

- result: O objeto BindingResult contém os erros de validação que são passados para o ErrorMessage.

A resposta é retornada com o status 400 e o tipo de conteúdo como JSON (contentType(MediaType.APPLICATION_JSON)).
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

# Fluxo Completo de Tratamento de Exceções

1. Lançamento da exceção: Em qualquer ponto da aplicação, se uma condição de erro ocorrer, lança-se uma exceção personalizada (ou padrão) utilizando throw new ....

2. Intercepção Global: A classe anotada com @RestControllerAdvice intercepta a exceção com base no seu tipo. O método anotado com **@ExceptionHandler** correspondente é acionado.

3. Construção da Resposta: No método de tratamento, é criado um objeto (como ErrorResponse) contendo detalhes do erro e retornado um ResponseEntity com o status HTTP apropriado.

4. Retorno ao Cliente: O Spring converte o objeto retornado para JSON (ou outro formato configurado) e envia a resposta com o código de status definido.