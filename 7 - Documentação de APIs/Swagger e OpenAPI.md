# Documentação de APIs no Spring Boot com Swagger/OpenAPI

Swagger e OpenAPI são padrões utilizados para documentar APIs de forma estruturada e interativa. O **Springdoc** é uma biblioteca que integra facilmente o **Spring Boot** com o **OpenAPI**, gerando documentação automática dos endpoints expostos na aplicação. Isso facilita o consumo da API por desenvolvedores e outras aplicações, permitindo testes diretos via **Swagger UI**.

**OpenAPI Specification (OAS):** Um formato padronizado para descrever APIs RESTful.

**Swagger UI:** Interface gráfica interativa para visualizar e testar endpoints.

**Springdoc OpenAPI:** Biblioteca para integrar o OpenAPI ao Spring Boot sem a necessidade de configurações manuais complexas.

**Annotations do OpenAPI:** Utilizadas para personalizar a documentação dos endpoints.

## Configurando o SpringDoc

Primeiro passo que devemos tomar é adicionar as dependências ao projeto.

``` XML

<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>

```

Caso você não tenha feito um controller, é necessário, pois o SpringDoc mapeia os controllers e gera automaticamente uma página para poder ser acessada no navegador e conseguir consultar todos os endpoints cadastrado nos controllers feitos e mapeados pelo SpringBoot

## Acessando a Documentação

- Inicie a aplicação e acesse: http://localhost:8080/swagger-ui.html

- Ou visualize o JSON/YAML em: http://localhost:8080/v3/api-docs

## Boas práticas

As boas práticas de programação com SpringDoc são:

**Documente apenas o necessário:** Não polua a documentação com detalhes irrelevantes.

**Use descrições claras:** Facilita o entendimento dos endpoints.

**Atenção a segurança:** Evite expor informações sensíveis na documentação pública.

**Mantenha a documentação atualizada:** APIs evoluem, e a documentação precisa refletir essas mudanças.

# Documentação Automática de Endpoints

A documentação automática de endpoints permite que, com poucas configurações, o Springdoc OpenAPI gere descrições detalhadas das APIs baseadas nas anotações do Spring Boot. Isso ajuda a:

- Facilitar a integração com consumidores da API.

- Criar uma documentação sempre atualizada sem esforço extra.

- Evitar inconsistências entre código e documentação.

## Conceitos fundamentais

**Anotações OpenAPI:** Usadas para descrever endpoints, parâmetros e respostas.

**Schemas:** Modelos que representam os objetos trocados nas requisições/respostas.

**Tags:** Agrupam endpoints similares na documentação.

## Exemplo Prático

``` Java

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuários", description = "Gerenciamento de usuários")
public class UsuarioController {

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna um usuário com base no ID fornecido")
    public String getUsuario(
            @Parameter(description = "ID do usuário", example = "1") @PathVariable Long id) {
        return "Usuário com ID: " + id;
    }

    @GetMapping
    @Operation(summary = "Listar todos os usuários", description = "Retorna uma lista de usuários")
    public List<String> listarUsuarios() {
        return Arrays.asList("Usuário 1", "Usuário 2", "Usuário 3");
    }
}

```

**@Tag** → Agrupa endpoints relacionados.

**@Operation** → Descreve um endpoint.

**@Parameter** → Adiciona detalhes sobre os parâmetros.

## Melhorando a Documentação dos Modelos

Podemos fazer uso das anotações do SpringDoc também nas classes DTO vindas como parâmetro nos controllers, para ter informações mais detalhada sobre o body das requisições

``` Java

import io.swagger.v3.oas.annotations.media.Schema;

public class UsuarioDTO {

    @Schema(description = "Identificador do usuário", example = "1")
    private Long id;

    @Schema(description = "Nome completo do usuário", example = "João Silva")
    private String nome;

    // Getters e Setters
}

```

Agora, quando a API retorna um UsuarioDTO, ele será documentado corretamente no Swagger UI.

# Customização do Swagger UI

O Swagger UI é a interface interativa gerada automaticamente pelo Springdoc OpenAPI. Ele permite visualizar, testar e entender os endpoints da API. A customização do Swagger UI permite:

- Alterar o título, descrição e aparência.
- Configurar autenticação na interface.
- Ocultar ou reorganizar endpoints.

Para realizar essas configurações, é importante entender alguns conceitos fundamentais para realizar essas configurações

- Configuração via **application.properties**: Personalizações simples como título e versão.
- Configuração via **OpenAPI Bean**: Customizações avançadas.
- Swagger UI **HTML/CSS**: Para ajustes visuais mais profundos.

## Personalizando no Application.properties

Adicione as configurações no src/main/resources/application.properties:

``` Properties

springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.path=/docs
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.operationsSorter=alpha
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.doc-expansion=none

```

**swagger-ui.path=/docs** → Altera a URL do Swagger UI para http://localhost:8080/docs.

**api-docs.path=/api-docs** → Altera a URL da especificação OpenAPI.

**operationsSorter=alpha** → Ordena endpoints em ordem alfabética.

**tagsSorter=alpha** → Ordena categorias de endpoints em ordem alfabética.

**doc-expansion=none** → Deixa a documentação recolhida por padrão.

## Customização da Interface via OpenAPI Bean

Podemos personalizar mais ainda criando um Bean OpenAPI:

``` Java

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Usuários")
                        .version("1.0")
                        .description("Documentação da API para gerenciamento de usuários")
                        .contact(new Contact()
                                .name("Suporte API")
                                .email("suporte@empresa.com")
                                .url("https://empresa.com")));
    }
}

```

- **.title("API de Usuários")** → Define o nome da API.
- **.version("1.0")** → Define a versão da API.
- **.description("Documentação da API...")** → Adiciona uma descrição.
- **.contact()** → Define um contato de suporte.

Agora, ao acessar o Swagger UI, essas informações aparecerão no topo da documentação.

## Adicionar autenticação no Swagger UI

Se sua API usa autenticação JWT, você pode configurar um botão de autenticação no Swagger UI:

``` Java

import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiSecurityConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .name("bearerAuth")
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}

```

Agora, o Swagger UI mostrará um botão **"Authorize"** para inserir um token JWT antes de testar os endpoints protegidos.