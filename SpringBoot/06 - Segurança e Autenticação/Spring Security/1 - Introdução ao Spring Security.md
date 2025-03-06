# O que é o SpringSecurity

O Spring Security é um framework de segurança do ecossistema Spring que fornece suporte para autenticação (quem pode acessar) e autorização (o que pode ser acessado). Ele protege aplicações Spring Boot com configurações mínimas, permitindo que você implemente mecanismos de segurança de forma robusta e escalável.

- Proteção contra ataques comuns (CSRF, XSS, Clickjacking, etc.).

- Autenticação de usuários utilizando diversas fontes (banco de dados, LDAP, OAuth2, JWT, etc.).

- Autorização baseada em papéis e permissões.

- Integração com o Spring Boot, tornando sua configuração simples e rápida.

## Por que usar Spring Security

A segurança é uma parte essencial de qualquer aplicação. Sem um sistema de autenticação e autorização confiável, sua aplicação pode estar vulnerável a ataques e acessos indevidos. Suas vantagens são:

- **Implementação robusta e flexível:** Suporta múltiplas estratégias de autenticação e autorização.

- **Facilita a integração com diversos métodos de autenticação, como:** Banco de dados (usuários armazenados em tabelas). **LDAP** (usado em grandes empresas para gerenciar usuários). **OAuth2/OpenID Connect** (para autenticação via Google, Facebook, etc.).

- **Autorização baseada em regras e funções:** Controle de acesso por roles (funções como ADMIN, USER, etc.). Permissões mais detalhadas usando expressões **SpEL** (**@PreAuthorize e @PostAuthorize**).

- Proteção contra ataques de segurança, como: CSRF (Cross-Site Request Forgery), XSS (Cross-Site Scripting) e Ataques de força bruta

- Suporte nativo ao Spring Boot, permitindo configuração automática e mínima.

## Como o Spring Security Funciona no Spring Boot?

O Spring Security é ativado automaticamente no Spring Boot quando a dependência correspondente está presente no projeto. Ele adiciona uma camada de segurança padrão, protegendo todos os endpoints da aplicação e exigindo autenticação para acessá-los.

Quando adicionamos o Spring Security ao nosso projeto, ele faz algumas configurações automáticas:

- Criação de um usuário e senha padrão: Se não houver uma configuração explícita, o Spring Security gera um usuário chamado user com uma senha aleatória exibida no console.

- Interceptação de todas as requisições HTTP: Todos os endpoints da aplicação passam por filtros de segurança. Requisições não autenticadas são bloqueadas por padrão.

- Sistema de filtros de segurança: O Spring Security utiliza uma cadeia de filtros para processar requisições. O principal filtro é o **SecurityFilterChain**, que gerencia autenticação e autorização.

## Fluxo de Funcionamento do SpringSecurity

1. O usuário faz uma requisição HTTP → Exemplo: GET /api/dados
2. A requisição passa pela cadeia de filtros do Spring Security
3. O sistema verifica se a autenticação é necessária
   - Se o endpoint estiver protegido, ele verifica se há credenciais na requisição.
   4. O Spring Security autentica o usuário
   
   - Pode ser via banco de dados, OAuth2, LDAP ou outros métodos.
   5. Se autenticado, verifica se o usuário tem permissão para acessar o recurso

    - Usa roles e permissões para decidir.
    6. Se autorizado, a requisição é encaminhada ao controlador
    7. Se não autenticado/autorizado, retorna erro **401** (**Unauthorized**) ou **403** (**Forbidden**)

## Principais Filtros do Spring Security

O Spring Security trabalha com uma cadeia de filtros que processam a requisição antes que ela chegue ao controlador. Alguns dos principais são:

- **UsernamePasswordAuthenticationFilter** → Lida com autenticação baseada em formulário e envio de usuário/senha.

- **BasicAuthenticationFilter** → Processa autenticação via cabeçalho Basic Auth.

- **BearerTokenAuthenticationFilter** → Lida com autenticação via JWT (Token Bearer).

- **SecurityContextPersistenceFilter** → Mantém o contexto de segurança entre requisições.