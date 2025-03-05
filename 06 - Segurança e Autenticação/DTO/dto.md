# O que é DTO

DTO (Data Transfer Object) é um objeto usado para transportar dados entre diferentes camadas de uma aplicação sem expor diretamente as entidades do banco de dados. Ele serve para:

- Separar a camada de persistência da camada de apresentação (evitando exposição direta do modelo de banco de dados).

- Melhorar a segurança (ocultando campos sensíveis).

- Reduzir a quantidade de dados transferidos (enviando apenas os campos necessários).

- Facilitar a conversão e manipulação de dados (formatando dados conforme a necessidade).

No Spring Boot, os DTOs são muito úteis para padronizar a saída de APIs REST e facilitar a comunicação entre o backend e o frontend.

## Conceitos Fundamentais

Entidade vs DTO: A entidade representa uma tabela do banco de dados e está diretamente ligada à persistência.
Já o DTO apenas transporta dados, sem lógica de negócio ou relação direta com o banco.

Conversão entre entidades e DTOs: Podemos fazer uso de 3 formas diferentes de conversão, sendo manual ou automática.

- Conversão manual (usando getters e setters)

- Lombok + ModelMapper (para simplificar a conversão)

- MapStruct (para geração automática de código de mapeamento)

## Exemplo Prático

``` Java

// Criando uma entidade JPA

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String email;
    private String senha;

    // Construtores, Getters e Setters
}

// Criando um DTO

public record UsuarioDTO(Long id, String nome, String email) {}

//O record do Java 17+ reduz código desnecessário e mantém a classe imutável.

// Convertendo a entidade para DTO manualmente

public class UsuarioMapper {
    public static UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}

// Usando DTO no controller

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(UsuarioMapper.toDTO(usuario));
    }
}

```

O Controller retorna um DTO, sem expor diretamente a entidade Usuario.