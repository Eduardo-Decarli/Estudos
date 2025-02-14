# O que é o Spring Security

O Spring Security é um framework da família Spring focado em prover autenticação e autorização para aplicações Java. Ele é altamente configurável e permite integrar diversos mecanismos de segurança, como:

**Autenticação baseada em banco de dados:** A autenticação baseada em banco de dados é um processo de segurança que verifica a identidade de um usuário para que ele possa acessar um banco de dados. 

**LDAP:** é um protocolo amplamente usado para autenticação e gerenciamento de diretórios de usuários. ele é utilizado no Spring Security para autenticar usuários e controlar o acesso com base em diretórios organizacionais, como o Active Directory da Microsoft ou OpenLDAP.

**JWT (JSON Web Tokens):** JWT (JSON Web Token) é um formato de token usado para autenticação e autorização entre partes diferentes de um sistema. Ele é amplamente utilizado em aplicações web para permitir que usuários façam login e mantenham a autenticação sem precisar reenviar credenciais a cada requisição.

**OAuth2:** é um protocolo de autorização amplamente utilizado para conceder acesso seguro a recursos protegidos sem expor credenciais do usuário. OAuth2 permite que aplicações acessem recursos em nome de um usuário sem precisar armazenar sua senha. Ele é usado por grandes plataformas como Google, Facebook e GitHub para login e permissões de acesso a APIs.

Outros provedores (ex.: Keycloak, Auth0)

O Spring Security permite a autenticação, garantindo que o usuário legítimo possa acessar a aplicação, a autorização, restringindo ações ou aceesso a recursos com **base em permissões (role)** atribuidas ao usuário e Proteção contra vulnerabilidades como **CSRF (Cross-Site Request Forgery)**, **XSS (Cross-Site Scripting)**, **SQL Injection** e ataques de força bruta.

## Como o Spring Security Funciona?

Quando um usuário faz uma requisição, o Spring Security intercepta a requisição antes que ela chegue ao controlador da aplicação. Ele verifica se o usuário está autenticado e autorizado para acessar aquele recurso.

- Filtros de segurança: O Spring Security utiliza uma cadeia de filtros que intercepta todas as requisições antes que cheguem aos controladores da aplicação. Cada filtro tem a responsabilidade de verificar aspectos de segurança, como autenticação e autorização.

- Contexto de segurança: Uma vez que um usuário é autenticado, suas informações são armazenadas no Security Context, permitindo que a aplicação acesse detalhes do usuário durante o processamento da requisição.

### Fluxo Básico de Segurança

1. Intercepção: Uma requisição chega à aplicação e é interceptada pelos filtros.

2. Verificação: O Spring Security verifica se o usuário está autenticado.

3. Autorização: Caso o usuário esteja autenticado, verifica se ele possui permissão para acessar o recurso solicitado.

4. Resposta: Se tudo estiver correto, a requisição é encaminhada ao controlador; caso contrário, o acesso é bloqueado ou redirecionado para uma página de login.

# Configurando o Spring Security

## Adicionando as dependências

Para adicionar o Spring Security ao seu projeto Spring Boot, adicione as seguintes dependências no seu pom.xml (para Maven):

``` XML

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Spring Boot Web (para APIs REST) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

Se você rodar a aplicação agora sem uma configuração personalizada, verá que qualquer requisição a endpoints será bloqueada por padrão e exigirá autenticação. O Spring cria um usuário padrão com login "user" e gera uma senha aleatória no terminal. O login pode ser feito com essas credenciais.

## Criando a Configuração de Segurança

Por padrão, o Spring Security bloqueia tudo. Vamos configurar para permitir requisições públicas e proteger outras:

``` Java

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Define um usuário em memória (para testes)
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("1234")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }

    // Se quisermos liberar algumas URLs, usamos SecurityFilterChain

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/publico").permitAll()  // Rota acessível a todos
                .anyRequest().authenticated()  // Protege o restante
            )
            .formLogin(); // Habilita formulário de login padrão
        return http.build();
    }
}

```

- @EnableWebSecurity → Habilita o Spring Security.

- userDetailsService() → Define um usuário na memória (admin / 1234).

- UserDetailsService → Interface usada para buscar usuários.

Agora, ao rodar o projeto, será necessário usar admin / 1234 para acessar as páginas protegidas.

- A URL /publico pode ser acessada sem login.

- Qualquer outra URL precisa de autenticação.