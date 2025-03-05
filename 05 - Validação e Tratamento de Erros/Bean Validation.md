# Bean Validation

Bean Validation é um padrão para validar objetos de forma automática usando anotações. Ele faz parte da especificação Jakarta Validation (antiga Javax Validation) e é amplamente utilizado em aplicações Java, especialmente com Spring Boot.

- Evita código repetitivo de validação manual.

- Facilita a manutenção do código.

- Funciona automaticamente com frameworks como Spring Boot e JPA.

- Permite personalizar mensagens de erro.

## Principais anotações

O Bean Validation usa anotações para definir regras de validação em atributos de classes. Aqui estão as mais comuns:

- @NotNull → Garante que o campo não seja null.

- @Size(min, max) → Define o tamanho mínimo e máximo de Strings ou coleções.

- @Min e @Max → Define valores numéricos mínimo e máximo.

- @Pattern(regex = ".*") → Valida Strings com expressões regulares.

- @Email → Verifica se um email tem um formato válido.

``` Java

import jakarta.validation.constraints.*;

public class Usuario {
    
    @NotNull(message = "O nome não pode ser nulo")
    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres")
    private String nome;

    @Email(message = "Email inválido")
    @NotNull(message = "O email é obrigatório")
    private String email;

    @Min(value = 18, message = "A idade mínima é 18 anos")
    private int idade;

    // Getters e Setters
}

```

Aqui, o Spring Boot validará automaticamente os campos sempre que a classe Usuario for usada como entrada de um endpoint REST.

## Como aplicar a Validation no Controller

Para que o Spring Boot valide automaticamente um objeto recebido em uma requisição, usamos @Valid no parâmetro do método:

``` Java

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @PostMapping
    public ResponseEntity<String> criarUsuario(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.ok("Usuário válido e criado com sucesso!");
    }
}

```

Se algum campo estiver inválido, o Spring retornará automaticamente um erro 400 (Bad Request) com os detalhes do erro.

# Personalizando Mensagens de Erros

Podemos criar um arquivo ValidationMessages.properties para definir mensagens personalizadas:

``` properties

usuario.nome.notnull=O nome é obrigatório!
usuario.nome.size=O nome deve ter entre {min} e {max} caracteres!
usuario.email.email=Informe um email válido!

```

E aplicamos no código:

``` Java

@NotNull(message = "{usuario.nome.notnull}")
@Size(min = 3, max = 50, message = "{usuario.nome.size}")
private String nome;

```

