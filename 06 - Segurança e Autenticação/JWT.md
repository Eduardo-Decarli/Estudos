# O que é JWT

JWT (JSON Web Token) é um token de autenticação baseado em JSON usado para autorizar usuários sem a necessidade de sessões no servidor. Ele é amplamente utilizado em APIs RESTful e contém três partes:

- Header – Contém o algoritmo de criptografia e o tipo de token.

- Payload – Contém as informações do usuário (claims), como ID e roles.

- Signature – Garante a integridade do token e impede alterações maliciosas.

``` lua

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  <-- Header (Base64)
.
eyJzdWIiOiJ1c3VyMSIsInJvbGUiOiJVU0VSIn0  <-- Payload (Base64)
.
SG93X2RvZXNfdGhpcyB3b3JrPyAtIEVuY3J5cHRlZA  <-- Assinatura (HMAC, RSA, etc.)

```

## Por que usar JWT?

- Autenticação stateless → Não há necessidade de armazenar sessões no servidor.

- Seguro → Usa assinaturas digitais (HMAC ou RSA) para evitar falsificação.

- Escalável → Ideal para aplicações distribuídas e microsserviços.

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

**SecurityConfig.java:** Responsável por configurar as regras de segurança da aplicação, definir quais endpoints precisam de autenticação e quais são públicos, alem de adicionar o filtro JWT para processar tokens e definir o provedor de autenticação e condificação.

**JwtAuthFilter.java:** Intercepta todas as requisições HTTP, verifica se o cabeçalho contém um token JWT válido e se o token for válido, autentica o usuário dentro do contexto do Spring Security

**JwtToken.java:** A classe JwtToken é um modelo de dados (DTO - Data Transfer Object) usado para encapsular o token JWT quando ele é retornado como resposta para o cliente.

**JwtUserDetails.java:** A classe JwtUserDetails estende a classe User do Spring Security e é usada para representar os detalhes do usuário autenticado no contexto da segurança. Ela converte um objeto de uma entidade Person em um UserDetails, que é o formato esperado pelo Spring Security para gerenciar autenticação e autorização.

**JwtUserDetailsService.java:** A classe JwtUserDetailsService implementa a interface UserDetailsService do Spring Security, sendo responsável por carregar os detalhes do usuário com base no email informado durante a autenticação.

**JwtUtil.java:** Gera tokens JWT para usuários autenticados, extrai informações do token, como o nome do usuário e valida se o token recebido ainda é valido e corresponde ao usuário correto.

**AuthController.java:** Expor endpoints de autenticação, como login e registro, além de processar requisições de login e retornar um token JWT para o usuário autenticado.

**JwtService.java:** Gerencia a criação, extração e validação de tokens JWT, garante que um token pertence a um usuário válido e não expirou.

## Iniciando a manipulação de tokens JWT no Spring Security

Vamos detalhar um passo a passo com exemplos de classes e como devem ser implementadas para entendermos melhor como configurar o JWT no Spring Security.

## Configuração do Spring Security para JWT

Agora, vamos configurar o Spring Security para usar JWT em vez de autenticação por sessão.

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

Agora, vamos criar um serviço para gerar e validar tokens JWT.

``` Java

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "SEU_SEGREDO_MUITO_SEGURO_AQUI_DEVE_SER_MAIOR_QUE_256_BITS";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities()) 
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}

```

- Gera um token JWT com **generateToken()**.

- Valida um token JWT com **isTokenValid()**.

- Extrai informações do token, como username e roles.

Após isso, vamos criar um filtro para interceptar requisições e autenticar usuários via JWT.

``` Java

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);
        username = jwtService.extractUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}

```

- Captura o token do header Authorization.

- Valida e extrai o username do token.

- Se válido, autentica o usuário no contexto do Spring Security.

Agora, vamos configurar o SecurityFilterChain para usar o filtro JWT

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login").permitAll()
                .requestMatchers("/admin").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

```

E por fim, Criamos um endpoint para gerar o token JWT após o login.

``` Java

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UserDetails user = userDetailsService.loadUserByUsername(username);
        return jwtService.generateToken(user);
    }
}

```

