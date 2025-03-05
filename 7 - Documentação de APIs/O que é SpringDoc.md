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