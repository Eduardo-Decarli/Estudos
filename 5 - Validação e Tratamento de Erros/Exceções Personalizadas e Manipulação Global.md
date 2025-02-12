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

import java.time.LocalDateTime;

public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    // Getters e setters
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

```

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

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleArgumentoInvalido(IllegalArgumentException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Argumento inválido: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleErroGeral(Exception ex) {
        // É possível registrar (log) os detalhes da exceção aqui
        ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Erro interno no servidor.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

```

Com essa abordagem, a API retorna um objeto JSON com os detalhes do erro, por exemplo:

``` JSON

{
    "status": 404,
    "message": "Usuário com ID 10 não encontrado",
    "timestamp": "2025-02-12T15:30:00"
}

```

# Fluxo Completo de Tratamento de Exceções

1. Lançamento da exceção: Em qualquer ponto da aplicação, se uma condição de erro ocorrer, lança-se uma exceção personalizada (ou padrão) utilizando throw new ....

2. Intercepção Global: A classe anotada com @RestControllerAdvice intercepta a exceção com base no seu tipo. O método anotado com **@ExceptionHandler** correspondente é acionado.

3. Construção da Resposta: No método de tratamento, é criado um objeto (como ErrorResponse) contendo detalhes do erro e retornado um ResponseEntity com o status HTTP apropriado.

4. Retorno ao Cliente: O Spring converte o objeto retornado para JSON (ou outro formato configurado) e envia a resposta com o código de status definido.