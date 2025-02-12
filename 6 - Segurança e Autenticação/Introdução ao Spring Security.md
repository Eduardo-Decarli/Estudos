# O que é o Spring Security

O Spring Security é um framework da família Spring focado em prover autenticação e autorização para aplicações Java. Ele é altamente configurável e permite integrar diversos mecanismos de segurança, como:

- Autenticação baseada em banco de dados
- LDAP
- JWT (JSON Web Tokens)
- OAuth2
- Outros provedores (ex.: Keycloak, Auth0)

O Spring Security permite a autenticação, garantindo que o usuário legítimo possa acessar a aplicação, a autorização, restringindo ações ou aceesso a recursos com base em permissões (role) atribuidas ao usuário e Proteção contra vulnerabilidades como CSRF (Cross-Site Request Forgery), XSS (Cross-Site Scripting), SQL Injection e ataques de força bruta.

# Introdução ao Spring Security

Spring Security é um framework do Spring que adiciona recursos de autenticação e autorização às aplicações Java. Ele é altamente configurável e pode ser integrado com diferentes mecanismos de segurança, como autenticação baseada em banco de dados, LDAP, JWT, OAuth2 e muito mais.

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

Se estiver usando Maven, adicione a dependência do Spring Security:

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

Se você rodar a aplicação agora sem uma configuração personalizada, verá que qualquer requisição a endpoints será bloqueada por padrão e exigirá autenticação.

O Spring cria um usuário padrão com login "user" e gera uma senha aleatória no terminal. O login pode ser feito com essas credenciais.

## Criar uma configuração personalizada

Por padrão, o Spring Security protege todas as rotas. Vamos criar uma configuração personalizada para liberar algumas rotas e definir um usuário fixo.

``` Java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/publico").permitAll()  // Libera a rota "/publico"
                .anyRequest().authenticated()            // Exige autenticação para demais rotas
            )
            .formLogin(); // Ativa o login via formulário (página padrão do Spring Security)

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Cria um usuário fixo (in-memory) para autenticação
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("1234")
            .roles("USER")
            .build();
        return new InMemoryUserDetailsManager(user);
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