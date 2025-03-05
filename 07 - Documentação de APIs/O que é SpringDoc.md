(O que é SpringDoc)[#o-que-é-springdoc]
(O que é OpenAPI?)[#o-que-é-openapi]
(Como o SpringDoc funciona no SpringBoot)[#como-o-springdoc-funciona-no-springboot]
(Swagger UI e os Endpoints Padrão)[#swagger-ui-e-os-endpoints-padrão]
(Customização da Documentação com Anotações OpenAPI)[#customização-da-documentação-com-anotações-openapi]
(Trabalhando com Segurança na Documentação)[#trabalhando-com-segurança-na-documentação]
(Configurações Avançadas do SpringDoc)[#configurações-avançadas-do-springdoc]
(Alternativas ao Swagger UI)[#alternativas-ao-swagger-ui]

# O que é SpringDoc

O SpringDoc é uma biblioteca que facilita a geração automática da documentação de APIs REST em projetos Spring Boot. Ele se baseia no Swagger OpenAPI, um padrão amplamente utilizado para descrever e documentar APIs.

- SpringDoc lê as anotações do seu código (como **@RestController**, **@GetMapping**, **@RequestBody**) e gera automaticamente uma documentação interativa.

- Ele cria uma interface gráfica para testar a API diretamente no navegador (via Swagger UI).

- Usa o padrão **OpenAPI 3.0**, garantindo compatibilidade com ferramentas modernas.

## Por que usar o SpringDoc

- **Automatiza a documentação:** Em vez de escrever manualmente a documentação da API, o SpringDoc gera tudo automaticamente a partir do código.

- **Facilita testes:** O Swagger UI gerado pelo SpringDoc permite testar os endpoints diretamente pelo navegador.

- **Melhora a comunicação:** Equipes de desenvolvimento, QA e clientes podem entender como a API funciona sem precisar ler o código-fonte.

- **Padrão OpenAPI 3.0:** Usa a especificação mais recente para documentação de APIs, garantindo compatibilidade com outras ferramentas.

- **Fácil integração com Spring Boot**: Basta adicionar uma dependência ao projeto, sem necessidade de grandes configurações

## Diferença entre SpringDoc e Swagger tradicional

O Swagger tradicional (Swagger 2) era usado em versões mais antigas do Spring Boot e precisava de mais configurações manuais. Já o SpringDoc traz uma implementação mais moderna e simplificada baseada no OpenAPI 3.0.

| **Aspecto**            | **SpringDoc (OpenAPI 3.0)**                                | **Swagger tradicional (Swagger 2)** |
|------------------------|------------------------------------------------------------|-------------------------------------|
| Especificação          | OpenAPI 3.0                                                | Swagger 2.0                         |
| Facilidade de uso      | Mais simples, menos configuração                           | Requer mais configurações           |
| Anotações              | Usa @Schema, @Operation                                    | Usa @Api, @ApiOperation             |
| Suporte no Spring Boot | Melhor suporte para versões recentes                       | Suporte limitado                    |
| Recursos               | Mais completo, suporta novos tipos de resposta e segurança | Funcional, mas mais antigo          |

# O que é OpenAPI?

O OpenAPI é uma especificação que define um formato padronizado para descrever APIs REST.

- Foi criado a partir do **Swagger** e hoje é mantido pela **OpenAPI Initiative**.
- Permite descrever endpoints, parâmetros, respostas, autenticação e outros detalhes de uma API.
- É independente de linguagem, podendo ser usado em qualquer tecnologia (Java, Python, Node.js etc.).
- É utilizado por ferramentas como SpringDoc, Postman, Swagger UI e Redoc para gerar documentação automática.

O OpenAPI facilita a documentação, teste e integração de APIs, tornando-as mais compreensíveis e acessíveis.

## Estrutura de um Documento OpenAPI

Um documento OpenAPI é escrito em YAML ou JSON e contém diversas seções. Vamos entender as principais:

**Info (Informações da API):** Define detalhes básicos da API, como nome, versão e descrição.

``` yaml

openapi: 3.0.0
info:
  title: Minha API
  description: API para gerenciamento de clientes
  version: 1.0.0

```

**Servers (Servidores da API):** Lista os servidores onde a API está disponível.

``` yaml

servers:
  - url: https://api.meusite.com/v1
    description: Servidor de produção
  - url: https://staging.meusite.com/v1
    description: Servidor de testes

```

**paths (Endpoints da API):** Define os endpoints (URLs) e os métodos suportados (GET, POST, etc.).

``` yaml

paths:
  /clientes:
    get:
      summary: Lista todos os clientes
      responses:
        "200":
          description: Sucesso

```

**components (Reutilização de Estruturas):** Permite definir schemas, headers, parâmetros e respostas reutilizáveis.

``` yaml

components:
  schemas:
    Cliente:
      type: object
      properties:
        id:
          type: string
        nome:
          type: string

```

**security (Autenticação e Segurança):** Define esquemas de autenticação, como OAuth2, JWT e API Keys.

``` yaml

security:
  - bearerAuth: []
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer

```

| **Recurso**                            | **OpenAPI 3**                               | **Swagger 2**      |
|----------------------------------------|---------------------------------------------|--------------------|
| Estrutura mais flexível                | Sim, suporta servers, components e security | Não, menos modular |
| Suporte nativo a JSON e YAML           | Sim                                         | Sim                |
| Melhor descrição de respostas          | Sim, com content e múltiplos tipos          | Limitado           |
| Suporte para múltiplos servidores      | Sim (servers)                               | Não                |
| Facilidade para reutilizar componentes | Sim (components)                            | Não                |
| Melhor suporte para segurança          | Sim (securitySchemes)                       | Limitado           |

O OpenAPI 3 melhora a estrutura, organização e segurança da documentação de APIs, tornando-se a melhor escolha para novos projetos.

# Como o SpringDoc funciona no SpringBoot

O SpringDoc é uma biblioteca que gera automaticamente a documentação da API a partir das anotações do Spring Boot. Ele analisa os controllers, endpoints, parâmetros e respostas e cria um documento OpenAPI 3.0.

- Baseia-se nas anotações do Spring Boot (@RestController, @GetMapping, @PostMapping, etc.).
- Gera uma interface interativa via Swagger UI para testar a API.
- Suporta JWT, OAuth2, OpenAPI annotations e personalizações.
- Permite exportar a documentação em JSON ou YAML.

Em resumo basta adicionar o SpringDoc ao projeto e ele gera automaticamente a documentação da API, sem necessidade de configurações complexas.

## Visão Geral das Dependências Essenciais

Para usar o SpringDoc OpenAPI no Spring Boot, basta adicionar a seguinte dependência no pom.xml (se estiver usando Maven):

``` xml

<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>

```

Essa dependência inclui:
- **Swagger UI** → Interface gráfica para visualizar e testar os endpoints da API.
- **Documentação OpenAPI 3.0** → Geração automática do arquivo OpenAPI em JSON/YAML.

# Swagger UI e os Endpoints Padrão

Após adicionar o **SpringDoc** ao projeto, o **Swagger UI** fica acessível automaticamente.

- URL padrão do Swagger UI:
http://localhost:8080/swagger-ui.html

O que você encontra no Swagger UI?
- Lista de endpoints da API
- Métodos HTTP disponíveis (GET, POST, PUT, DELETE)
- Parâmetros e respostas de cada endpoint
- Opção para testar a API diretamente no navegador

## Documentação JSON/YAML

O SpringDoc também gera automaticamente a documentação no formato JSON ou YAML. Podem ser acessados através das URLs

- **http://localhost:8080/v3/api-docs** → Retorna a documentação OpenAPI em JSON
- **http://localhost:8080/v3/api-docs.yaml** → Retorna a documentação OpenAPI em YAML

Exemplo da documentação no formato JSON

``` JSON

{
  "openapi": "3.0.0",
  "info": {
    "title": "Minha API",
    "version": "1.0.0"
  },
  "paths": {
    "/clientes": {
      "get": {
        "summary": "Lista todos os clientes",
        "responses": {
          "200": {
            "description": "Sucesso"
          }
        }
      }
    }
  }
}

```

Exemplo da documentação no formato yaml

``` yaml

openapi: 3.0.0
info:
  title: Minha API
  version: 1.0.0
paths:
  /clientes:
    get:
      summary: Lista todos os clientes
      responses:
        "200":
          description: Sucesso

```

Esse **JSON/YAML** pode ser importado em ferramentas como Postman, Insomnia, Redoc e Swagger Editor.

## Configurações Básicas do Swagger UI

Podemos personalizar algumas configurações do **Swagger UI** no **application.properties**.

- **Alterando a URL do Swagger UI:** Por padrão, a interface fica em swagger-ui.html, mas podemos mudar:

``` properties

springdoc.swagger-ui.path=/api-docs

```

- **Desativando o Swagger UI** (exemplo: para produção)

``` properties

springdoc.swagger-ui.enabled=false

```

- Habilitando a exibição do JSON/YAML na UI

``` properties

springdoc.swagger-ui.show-extensions=true

```

- Definindo um servidor padrão na documentação

``` properties

springdoc.api-docs.server=https://api.meusite.com

```

# Customização da Documentação com Anotações OpenAPI

Podemos definir nome, descrição, versão, contato e licença da API usando a anotação **@OpenAPIDefinition**.

Vamos Definir informações gerais da API:

``` Java

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
    info = @Info(
        title = "API de Gestão de Clientes",
        version = "1.0.0",
        description = "Esta API permite gerenciar clientes, incluindo criação, atualização e remoção.",
        contact = @Contact(
            name = "Suporte API",
            email = "suporte@empresa.com",
            url = "https://empresa.com/suporte"
        ),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0"
        )
    )
)
public class OpenApiConfig {
}

```

Essas informações aparecem na interface do Swagger UI, na seção de informações da API.

## Documentando Endpoints

Podemos usar a anotação @Operation para descrever endpoints e @ApiResponses para documentar os possíveis retornos. Vamos Documentar um endpoint **GET/clientes/{id}**

``` Java

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar cliente por ID",
        description = "Retorna os detalhes de um cliente a partir do ID fornecido."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "Cliente não encontrado")
    })
    public String getCliente(
        @Parameter(description = "ID do cliente a ser buscado", example = "123") 
        @PathVariable String id
    ) {
        return "Detalhes do cliente " + id;
    }
}

```

- **@Operation(summary, description)** → Define um resumo e uma descrição detalhada do endpoint.
- **@ApiResponses** → Lista os possíveis retornos (códigos HTTP e descrições).
- **@Parameter(description, example)** → Explica os parâmetros recebidos pelo endpoint.

No Swagger UI, cada endpoint terá uma descrição clara do que faz e quais respostas ele pode retornar.

## Documentando Modelos de Dados

Podemos usar **@Schema** para documentar entidades, explicando cada campo do modelo. Vamos documentar um modelo **cliente**.

``` Java

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Representação de um Cliente")
public class Cliente {

    @Schema(description = "Identificador único do cliente", example = "123")
    private String id;

    @Schema(description = "Nome completo do cliente", example = "João Silva")
    private String nome;

    @Schema(description = "Email do cliente", example = "joao@email.com")
    private String email;

    // Getters e Setters
}

```

- **@Schema(description, example)** → Define a descrição e um exemplo para cada campo da classe.

No Swagger UI, os modelos de dados são exibidos na seção Schemas, permitindo visualizar a estrutura dos objetos esperados.

# Trabalhando com Segurança na Documentação

O Bearer Token é um tipo de autenticação baseada em tokens **JWT (JSON Web Tokens)**. O cliente envia um token no cabeçalho **Authorization** para acessar endpoints protegidos. Para permitir a autenticação via **JWT Bearer Token** no **Swagger UI**, usamos **@SecurityScheme**.

``` Java

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;

@OpenAPIDefinition(
    info = @Info(title = "API Segura", version = "1.0.0")
)
@SecuritySchemes({
    @SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
    )
})
public class OpenApiSecurityConfig {
}

```

Agora, indicamos que certos endpoints requerem autenticação adicionando @SecurityRequirement("bearerAuth"). Como por exemplo

``` Java

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@SecurityRequirement(name = "bearerAuth") // Exige autenticação
public class ClienteController {

    @GetMapping
    public String listarClientes() {
        return "Lista de clientes protegida";
    }
}

```

Agora o **Swagger UI** terá um botão "Authorize", permitindo que o usuário insira o token JWT antes de testar os endpoints protegidos.

# Configurações Avançadas do SpringDoc

O SpringDoc gera a documentação automaticamente, mas podemos personalizá-la. Podemos configurar detalhes da API diretamente no application.properties:

``` properties

# Definir caminho customizado para a UI
springdoc.swagger-ui.path=/documentacao

# Esconder operações marcadas como @Hidden
springdoc.swagger-ui.filter=true

# Exibir todos os detalhes da API
springdoc.api-docs.enabled=true

# Desativar a documentação na produção
springdoc.swagger-ui.enabled=false

```

Também Podemos customizar o **SpringDoc** criando um **@Bean** de OpenAPI.

``` Java

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiCustomConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("API Personalizada")
                .version("2.0")
                .description("Exemplo de API personalizada com SpringDoc")
                .contact(new Contact()
                    .name("Suporte")
                    .email("suporte@empresa.com")
                )
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0")
                )
            );
    }
}

```

- Altera título, versão, descrição, contato e licença da API.

- Essas informações aparecerão no Swagger UI.

## Filtros e Personalizações

Podemos criar filtros para modificar dinamicamente a documentação, ocultar endpoints ou alterar respostas. Podemos usar **@Hidden** para remover endpoints da documentação.

- Criando um filtro para ocultar certos endpoints

``` Java

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oculto")
@Hidden // Remove todo o controller da documentação
public class OcultoController {

    @GetMapping
    public String naoAparece() {
        return "Este endpoint não aparece no Swagger UI";
    }
}

```

- Criando um OperationCustomizer para modificar dinamicamente a API

Podemos usar um OperationCustomizer para modificar endpoints dinamicamente.

``` Java

import io.swagger.v3.oas.models.Operation;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

@Configuration
public class CustomOperationConfig {

    @Bean
    public OperationCustomizer addCustomDescription() {
        return (Operation operation, HandlerMethod handlerMethod) -> {
            operation.setDescription("Descrição customizada para: " + handlerMethod.getMethod().getName());
            return operation;
        };
    }
}

```

Modifica automaticamente a descrição de cada endpoint, adicionando o nome do método.

## Suporte a Múltiplos grupos de APIs

Se temos várias versões de API ou módulos diferentes, podemos separar os grupos no **SpringDoc**.

- Criando múltiplos grupos de APIs

``` properties

# Define um grupo para v1 e outro para v2
springdoc.group-configs[0].group=v1
springdoc.group-configs[0].paths-to-match=/v1/**
springdoc.group-configs[1].group=v2
springdoc.group-configs[1].paths-to-match=/v2/**

```

- **v1** → Mostra endpoints que começam com /v1/
- **v2** → Mostra endpoints que começam com /v2/

- Criando múltiplos grupos via configuração Java

``` java

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiGroupsConfig {

    @Bean
    public GroupedOpenApi publicApiV1() {
        return GroupedOpenApi.builder()
            .group("v1")
            .pathsToMatch("/v1/**")
            .build();
    }

    @Bean
    public GroupedOpenApi publicApiV2() {
        return GroupedOpenApi.builder()
            .group("v2")
            .pathsToMatch("/v2/**")
            .build();
    }
}

```

- Cria dois grupos de APIs (v1 e v2).
- Cada grupo aparece como uma opção separada no Swagger UI.

# Alternativas ao Swagger UI

- **Redoc – Uma Alternativa Moderna ao Swagger UI:** O Redoc é uma alternativa ao **Swagger UI** que apresenta a documentação de APIs de forma mais limpa, organizada e responsiva. Ele é amplamente utilizado em APIs públicas devido à sua experiência de usuário melhorada.

- **Postman e Insomnia – Testando APIs e Documentação:** Além do **Swagger UI** e **Redoc**, podemos testar e documentar APIs usando Postman e **Insomnia**. O Postman é uma ferramenta popular para testar **APIs REST** e também pode gerar documentação a partir de requisições. E o **Insomnia** é uma alternativa ao Postman, mais leve e focada em **APIs REST**.