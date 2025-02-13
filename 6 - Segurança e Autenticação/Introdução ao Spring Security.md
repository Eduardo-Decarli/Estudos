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

# Arquitetura Recomendada do Spring Security

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

# Configurando o Spring Security

1. Adicionando as dependências

Para adicionar o Spring Security ao seu projeto Spring Boot, adicione as seguintes dependências no seu pom.xml (para Maven):

``` XML

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT (Java JWT - com a biblioteca jjwt) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Spring Boot Web (para APIs REST) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Boot Starter para manipular JSON (Jackson) -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>

```

Se você rodar a aplicação agora sem uma configuração personalizada, verá que qualquer requisição a endpoints será bloqueada por padrão e exigirá autenticação. O Spring cria um usuário padrão com login "user" e gera uma senha aleatória no terminal. O login pode ser feito com essas credenciais.

## Criar uma configuração personalizada

Por padrão, o Spring Security protege todas as rotas. Vamos criar uma configuração personalizada para liberar algumas rotas e definir um usuário fixo.

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF para facilitar testes (não recomendado para produção)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()  // Rotas públicas
                .requestMatchers("/admin/**").hasRole("ADMIN") // Apenas para ADMIN
                .anyRequest().authenticated()  // Qualquer outra requisição precisa de autenticação
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Sem estado (para APIs)

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

- Liberação de Rotas: A rota /publico está acessível sem autenticação.

- Proteção das Outras Rotas: Qualquer outra rota requer que o usuário esteja autenticado.

- Login via Formulário: Ativa a página de login padrão do Spring Security.

- Usuário In-Memory: Cria um usuário fixo ("admin" com senha "1234") para facilitar o desenvolvimento inicial.

# Autenticação com Banco de Dados

Após ter criado um escopo básico do Spring security e ter feito o registro de um banco de dados na aplicação, vamos criar uma entidade para armazenar usuários no banco.

``` Java

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    
    private String password;
    private String role; // Exemplo: "ROLE_USER", "ROLE_ADMIN"

    // Getters e setters
}

``` 

e um repositório para acessar o banco de dados

``` Java

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

```

Agora vamos configurar a autenticação com o banco, vamos dizer ao spring Security para buscar usuários no banco.

``` java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

            return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword()) // A senha deve estar criptografada!
                .roles(user.getRole())          // Define a role do usuário
                .build();
        };
    }
}

```

Como ainda não temos um cadastro de usuários, podemos adicionar um usuário manualmente ao iniciar a aplicação.

Crie uma classe DataLoader para salvar um usuário inicial no banco:

``` Java

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("1234")); // Senha criptografada
            user.setRole("ADMIN");
            userRepository.save(user);
        }
    }
}

```

Por segurança, nunca devemos armazenar senhas em texto puro no banco! então vamos configurar a criptografia de senhas

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

Isso garante que as senhas sejam armazenadas de forma segura.

- Configuramos o banco de dados para armazenar usuários.

- Criamos um modelo User para representar usuários no banco.

- Criamos um UserRepository para buscar usuários.

- Definimos um UserDetailsService para carregar usuários no Spring Security.

- Salvamos um usuário de teste ao iniciar a aplicação.

- Garantimos que as senhas sejam criptografadas com BCrypt.