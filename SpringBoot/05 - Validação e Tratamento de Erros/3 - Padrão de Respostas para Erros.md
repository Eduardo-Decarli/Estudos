# Padrão de Resposta para Erros

O padrão de resposta para erros definido pela RFC 7807, conhecido como "Problem Details for HTTP APIs", é uma especificação que fornece uma maneira estruturada de representar detalhes de erros em respostas HTTP. Este padrão ajuda a criar respostas de erro consistentes e informativas, facilitando o tratamento de erros por clientes de API.

Esse padrão melhora a **consistência** e **interoperabilidade** entre APIs, facilitando a depuração e integração entre sistemas.

## Estrutura do RFC 7807 - Problem Details

O padrão de resposta consiste no tipo (URI que identifica o tipo do erro), title (breve descrição do erro), status (Código HTTP do erro, por exemplo o 404, 400, etc...), detail (Explicação detalhada do problema) e instance (URI do recurso que gerou o erro)

``` JSON

{
    "type": "/erros/usuario-nao-encontrado",
    "title": "Usuário não encontrado",
    "status": 404,
    "detail": "O usuário com ID 10 não foi encontrado no sistema.",
    "instance": "/usuarios/10"
}

```

- **type:** Uma URI que identifica o tipo de problema. É recomendável que esta URI aponte para uma documentação que descreva o problema em detalhes.

- **title:** Um resumo legível do problema. Deve ser curto e descritivo.

- **status:** O código de status HTTP gerado pelo servidor para esta ocorrência de problema.

- **detail:** Uma explicação específica do problema que ocorreu. Deve ser mais detalhada que o título.

- **instance:** Uma URI que identifica a ocorrência específica do problema. Pode ser usada para rastrear o problema em logs ou sistemas de monitoramento.

## Implementando RFC 7807 no Spring Boot

O Spring Boot tem suporte nativo para esse padrão através do ProblemDetail, que foi introduzido no Spring Boot 3+.

Criamos um GlobalExceptionHandler para retornar erros formatados:

``` Java

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ProblemDetail handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(404);
        problemDetail.setTitle("Usuário não encontrado");
        problemDetail.setDetail(ex.getMessage());
        problemDetail.setType(URI.create("/erros/usuario-nao-encontrado"));
        return problemDetail;
    }
}

```

Agora, quando um usuário não for encontrado, a API retorna a resposta no formato correto do RFC 7807.

## Tratando Diversos Tipos de Erros com ProblemDetail

Podemos tratar múltiplos erros no mesmo GlobalExceptionHandler:

``` Java

import org.springframework.http.ProblemDetail;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNaoEncontradoException.class)
    public ProblemDetail handleUsuarioNaoEncontrado(UsuarioNaoEncontradoException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problemDetail.setTitle("Usuário não encontrado");
        problemDetail.setDetail(ex.getMessage());
        problemDetail.setType(URI.create("/erros/usuario-nao-encontrado"));
        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleArgumentoInvalido(IllegalArgumentException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle("Argumento inválido");
        problemDetail.setDetail(ex.getMessage());
        problemDetail.setType(URI.create("/erros/argumento-invalido"));
        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleErroGeral(Exception ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problemDetail.setTitle("Erro interno no servidor");
        problemDetail.setDetail("Ocorreu um erro inesperado.");
        problemDetail.setType(URI.create("/erros/erro-interno"));
        return problemDetail;
    }
}

```

- Erros são padronizados em JSON conforme RFC 7807.

- Cada erro tem um tipo, título, detalhe e status HTTP.

- O cliente pode entender e lidar melhor com os erros.