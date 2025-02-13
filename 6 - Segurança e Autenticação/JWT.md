# O que é JWT

JWT (JSON Web Token) é um token de autenticação baseado em JSON usado para autorizar usuários sem a necessidade de sessões no servidor. Ele é amplamente utilizado em APIs RESTful e contém três partes:

Header – Contém o algoritmo de criptografia e o tipo de token.
Payload – Contém as informações do usuário (claims), como ID e roles.
Signature – Garante a integridade do token e impede alterações maliciosas.

``` lua

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  <-- Header (Base64)
.
eyJzdWIiOiJ1c3VyMSIsInJvbGUiOiJVU0VSIn0  <-- Payload (Base64)
.
SG93X2RvZXNfdGhpcyB3b3JrPyAtIEVuY3J5cHRlZA  <-- Assinatura (HMAC, RSA, etc.)

```

# Arquitetura Recomendada do Spring Security com JWT

Cada classe tem um papel específico dentro do fluxo de autenticação e autorização da aplicação. Vamos detalhar as responsabilidades de cada uma, mas antes vamos ver como deveria ser uma estrutura bem arquitetada para o Spring Security.

``` bash

src/
├── main/
│   ├── java/com/seuprojeto/
│   │   ├── config/               # Configuração do Spring Security
│   │   │   ├── SecurityConfig.java
│   │   ├── jwt/                  # Configuração do sistema do JWT
│   │   │   ├── JwtAuthFilter.java
│   │   │   ├── JwtToken.java
│   │   │   ├── JwtUserDetails.java
│   │   │   ├── JwtUserDetailsService.java
│   │   │   ├── JwtUtil.java
│   │   ├── controller/           # Endpoints protegidos
│   │   │   ├── AuthController.java
│   │   │   ├── UserController.java
│   │   ├── model/                # Representação do usuário
│   │   │   ├── Usuario.java
│   │   ├── repository/           # Acesso ao banco de dados
│   │   │   ├── UsuarioRepository.java
│   │   ├── service/              # Regras de negócio e autenticação
│   │   │   ├── UsuarioService.java
│   │   ├── Application.java       # Classe principal

```

SecurityConfig.java: Responsável por configurar as regras de segurança da aplicação, definir quais endpoints precisam de autenticação e quais são públicos, alem de adicionar o filtro JWT para processar tokens e definir o provedor de autenticação e condificação.

JwtAuthFilter.java: Intercepta todas as requisições HTTP, verifica se o cabeçalho contém um token JWT válido e se o token for válido, autentica o usuário dentro do contexto do Spring Security

JwtToken.java: A classe JwtToken é um modelo de dados (DTO - Data Transfer Object) usado para encapsular o token JWT quando ele é retornado como resposta para o cliente.

JwtUserDetails.java: A classe JwtUserDetails estende a classe User do Spring Security e é usada para representar os detalhes do usuário autenticado no contexto da segurança. Ela converte um objeto de uma entidade Person em um UserDetails, que é o formato esperado pelo Spring Security para gerenciar autenticação e autorização.

JwtUserDetailsService.java: A classe JwtUserDetailsService implementa a interface UserDetailsService do Spring Security, sendo responsável por carregar os detalhes do usuário com base no email informado durante a autenticação.

JwtUtil.java: Gera tokens JWT para usuários autenticados, extrai informações do token, como o nome do usuário e valida se o token recebido ainda é valido e corresponde ao usuário correto.

AuthController.java: Expor endpoints de autenticação, como login e registro, além de processar requisições de login e retornar um token JWT para o usuário autenticado.

JwtService.java: Gerencia a criação, extração e validação de tokens JWT, garante que um token pertence a um usuário válido e não expirou.

## Iniciando a manipulação de tokens JWT no Spring Security

Vamos detalhar um passo a passo com exemplos de classes e como devem ser implementadas para entendermos melhor como configurar o JWT no Spring Security.

### Adicionar as Dependências do Spring Security

No arquivo pom.xml, adicione a dependência do Spring Security

``` XML

<!-- Dependência para usar Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Dependência para usar JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Dependência para usar OAuth2 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>

<!-- Dependência para autenticação via banco de dados -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

```

### Criar um modelo de usuário e um repository JPA

Crie uma entidade User para armazenar os usuários no banco de dados.

``` java

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Exemplo: ROLE_USER, ROLE_ADMIN
}

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}


```

### Criar uma Configuração Personalizada do Spring Security

Essa classe é importante para podermos definir limites de endpoints a serem bloqueados para autenticação, já que por padrão o Spring Security bloqueia tudo, além também de nos permitir um método de codificação de passwords

``` Java

import com.compass.Desafio_02.jwt.JwtAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@EnableMethodSecurity // Habilita a segurança baseada em anotações, permitindo usar @PreAuthorize, @Secured, etc.
@EnableWebMvc // Ativa configurações do Spring MVC para lidar com requisições web
@Configuration // Indica que esta classe é uma configuração do Spring
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Desabilita a proteção contra CSRF (não recomendado para aplicações web com sessão)
                .formLogin(form -> form.disable()) // Desabilita autenticação via formulário padrão do Spring Security
                .httpBasic(basic -> basic.disable()) // Desabilita autenticação HTTP Basic
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                antMatcher(HttpMethod.POST, "/api/v1/product") // Permite requisições POST para "/api/v1/product" sem autenticação
                        ).permitAll()
                        .anyRequest().authenticated() // Todas as outras requisições precisam estar autenticadas
                )
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
                        // Define que a aplicação será stateless, ou seja, não armazenará sessão de usuário
                )
                .addFilterBefore(
                        jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class 
                        // Adiciona o filtro de autenticação JWT antes do UsernamePasswordAuthenticationFilter
                )
                .build();
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter() {
        return new JwtAuthorizationFilter(); 
        // Bean responsável por interceptar requisições e validar o token JWT
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); 
        // Define o encoder de senhas usando BCrypt, tornando as senhas armazenadas mais seguras
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager(); 
        // Gerenciador de autenticação do Spring, usado para processar autenticação de usuários
    }
}

```

### Criar um Endpoint de Login

Agora vamos criar um endpoint para o usuário poder fazer o login e receber o Token no corpo de retorno do endpoint

``` java

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}

```

Agora, quando um usuário faz login em POST /auth/login com um JSON:

``` JSON

{
    "username": "admin",
    "password": "1234"
}

```

### Criação de um Filtro para o JWT

Esse filtro permite autenticar as requisições em endpoints protegidos por JWT, validando o token e configurando o contexto de segurança com as informações do usuário.

``` Java

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j // Adiciona suporte a logs para a classe
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUserDetailsService detailsService; // Serviço para carregar detalhes do usuário (usuário autenticado)

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Obtém o token JWT do cabeçalho da requisição
        final String token = request.getHeader(JwtUtils.JWT_AUTHORIZATION);

        // Verifica se o token está presente e começa com "Bearer "
        if (token == null || !token.startsWith(JwtUtils.JWT_BEARER)) {
            log.info("JWT Token is null, empty or not starting with 'Bearer '."); // Loga caso o token não seja encontrado ou não tenha o prefixo correto
            filterChain.doFilter(request, response); // Continua o fluxo sem autenticar
            return;
        }

        // Verifica se o token é válido
        if (!JwtUtils.isTokenValid(token)) {
            log.warn("JWT Token is invalid or expired."); // Loga caso o token seja inválido ou expirado
            filterChain.doFilter(request, response); // Continua o fluxo sem autenticar
            return;
        }

        // Extrai o nome de usuário (email ou identificação) do token
        String username = JwtUtils.getEmailFromToken(token);

        // Chama o método para autenticar o usuário
        toAuthentication(request, username);

        // Continua o fluxo da requisição
        filterChain.doFilter(request, response);
    }

    private void toAuthentication(HttpServletRequest request, String username) {
        // Carrega os detalhes do usuário a partir do username (email) extraído do token
        UserDetails userDetails = detailsService.loadUserByUsername(username);

        // Cria um token de autenticação com base nos detalhes do usuário
        UsernamePasswordAuthenticationToken authenticationToken =
                UsernamePasswordAuthenticationToken.authenticated(userDetails, null, userDetails.getAuthorities());

        // Configura os detalhes de autenticação, como a origem da requisição
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // Armazena o token de autenticação no contexto de segurança do Spring Security
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}

```

6.  Agora, podemos testar a autenticação com JWT, primeiro fazemos o login com POST /auth/login e obter o token, depois usar esse token nas próximas requisições com um header

``` makefile

Authorization: Bearer <TOKEN_AQUI>

```

E por fim se o token for válido, a requisição será autorizada. Caso contrário, será negada.


