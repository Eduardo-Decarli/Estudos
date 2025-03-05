# MapStruct no Spring Boot

O MapStruct é uma biblioteca Java que gera automaticamente o código de conversão entre objetos. Ele é amplamente usado no Spring Boot para converter entidades em DTOs e vice-versa, eliminando a necessidade de escrever código manualmente.

- Reduz o código boilerplate -> Sem necessidade de getters/setters para conversão

- Alto desempenho -> Usa mapeamento baseado em código gerado em tempo de compilação, evitando reflexão

- Facilidade de manutenção -> Alterações nas classes são automaticamente refletidas no mapeador

- Suporte a mapeamentos complexos -> Pode mapear listas, converter tipos de dados e até mesmo calcular valores.

## Conceitos fundamentais

@Mapper -> Define uma interface para o mapeador

@Mapping -> Configura conversões específicas (ex: renomear atributos)

@MapperConfig -> Permite reutilizar configurações de mapeamento

@MappingTarget -> Atualiza um objeto existente ao invés de criar um novo.

@InheritConfiguration → Permite herdar mapeamentos de outro método.

- MapStruct vs ModelMapper

| **Característica**       | **MapStruct**                             | **ModelMapper**             |
|--------------------------|-------------------------------------------|-----------------------------|
| Desempenho               | Alto (gera código em tempo de compilação) | Menor (usa reflexão)        |
| Facilidade de manutenção | Alta                                      | Média                       |
| Configuração             | Simples e declarativa                     | Mais dinâmica, mas complexa |
| Recomendado para         | Projetos performáticos e estruturados     | Projetos pequenos e simples |

## Exemplos Práticos

Para começarmos a utilizar, primeiro devemos importar as dependências ao pom.xml.

### Adicionando as Dependências

``` XML

    <!-- MapStruct -->
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>

```

Se estiver usando Lombok, adicione também:

``` XML

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok-mapstruct-binding</artifactId>
    <version>0.2.0</version>
    <scope>compile</scope>
</dependency>

```

### Criando uma entidade JPA

``` Java

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
}

```

### Criando um DTO

``` Java

public record UsuarioDTO(Long id, String nome, String email) {}

```

O record facilita a criação de DTOs imutáveis.

### Criando o Mapper com MapStruct

``` Java

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring") // Para integração com Spring Boot
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    // Mapeamento da entidade para DTO
    @Mapping(target = "email", source = "email") // Exemplo: mapeamento explícito (opcional neste caso)
    UsuarioDTO toDTO(Usuario usuario);

    // Mapeamento do DTO para entidade
    Usuario toEntity(UsuarioDTO usuarioDTO);

    // Mapeamento de listas
    List<UsuarioDTO> toDTOList(List<Usuario> usuarios);
    List<Usuario> toEntityList(List<UsuarioDTO> usuarioDTOs);
}

```

- @Mapper(componentModel = "spring") → Permite que o Spring gerencie essa interface como um Bean.

- INSTANCE → Cria uma instância do mapper automaticamente (caso não use Spring).

- @Mapping(target = "email", source = "email") → Define mapeamento explícito (aqui é redundante, mas útil quando os nomes são diferentes).

## Boas Práticas

- Use componentModel = "spring" → Permite injeção de dependências e facilita testes.

- Evite lógica complexa nos mapeadores → Use métodos auxiliares se precisar de lógica adicional.

- Prefira record para DTOs → Garante imutabilidade e reduz código.

- Use @Mapping para mapear nomes diferentes → Se os atributos tiverem nomes distintos, especifique o mapeamento.