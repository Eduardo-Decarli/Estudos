# Bean Validation

Bean Validation é um padrão para validar objetos de forma automática usando anotações. Ele faz parte da especificação Jakarta Validation (antiga Javax Validation) e é amplamente utilizado em aplicações Java, especialmente com Spring Boot.

- Evita código repetitivo de validação manual.

- Facilita a manutenção do código.

- Funciona automaticamente com frameworks como Spring Boot e JPA.

- Permite personalizar mensagens de erro.

## Principais anotações

O Bean Validation é uma parte essencial do desenvolvimento de aplicações Spring Boot, pois permite garantir que os dados de entrada atendam a determinados critérios antes de serem processados. Ele é baseado na especificação Bean Validation (JSR 380) e é frequentemente usado em conjunto com o Hibernate Validator, que é a implementação de referência.

Primeiro, certifique-se de que você tem a dependência do Hibernate Validator no seu pom.xml (para projetos Maven):

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

```

## Anotações de Validação

O Bean Validation oferece várias anotações que você pode usar para validar os campos de suas classes. Aqui estão algumas das mais comuns:

- **@NotNull** → Garante que o campo não seja null.

- **@NotEmpty** -> O campo não pode ser nulo nem vazio (aplicável a Strings, coleções, etc.).

- **@NotBlank** -> O campo não pode ser nulo nem vazio, e deve conter pelo menos um caractere não-espaço (aplicável a Strings).

- **@Size(min, max)** → Define o tamanho mínimo e máximo de Strings ou coleções.

- **@Min** e **@Max** → Define valores mínimo e máximo para números.

- **@Pattern(regex = ".*")** → Valida Strings com expressões regulares.

- **@Email** → Verifica se um email tem um formato válido.

## Exemplo de Uso

Vamos supor que você tenha uma classe User que precisa de validação:

``` Java

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class User {

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    @Email(message = "Email deve ser válido")
    @NotBlank(message = "O email é obrigatório")
    private String email;

    @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")
    private String password;

    // Getters e Setters
}

```

Para validar automaticamente os dados de entrada em um controlador Spring, você pode usar a anotação **@Valid**:

``` Java

import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        // Se a validação falhar, uma MethodArgumentNotValidException será lançada
        return ResponseEntity.ok("Usuário criado com sucesso!");
    }
}

```

## Tratamento de Erros

Quando a validação falha, o Spring Boot lança uma exceção MethodArgumentNotValidException. Você pode criar um manipulador global para capturar essas exceções e retornar uma resposta personalizada:

``` Java

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

```

Com isso, você terá uma resposta clara e estruturada sobre quais campos falharam na validação e por quê.