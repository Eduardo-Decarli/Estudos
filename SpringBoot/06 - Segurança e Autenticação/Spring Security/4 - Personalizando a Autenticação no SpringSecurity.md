# Personalizando a Autenticação no Spring Security

Até agora, usamos usuários em memória, mas em aplicações reais, os usuários são armazenados em bancos de dados ou provedores externos como LDAP.

Agora, vamos explorar diferentes formas de autenticação no Spring Security.

## Autenticação com Banco de Dados

O Spring Security permite carregar usuários de um banco de dados relacional usando um **UserDetailsService** personalizado.

``` Java

// Criando a entidade **User**
// Criamos uma entidade para armazenar usuários no banco de dados:

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Exemplo: "ROLE_USER", "ROLE_ADMIN"
}

// Criando um repositório UserRepository

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// Implementando o UserDetailsService
// Agora, criamos um UserDetailsService para carregar usuários do banco.

import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.withUsername(user.getUsername())
                .password(user.getPassword()) // Senha já deve estar criptografada no banco
                .roles(user.getRole().replace("ROLE_", "")) // Remove o prefixo "ROLE_"
                .build();
    }
}

// Configurando a Segurança

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

```

Agora o Spring Security usa um banco de dados para autenticação! 🚀

## Autenticação com LDAP

O LDAP (Lightweight Directory Access Protocol) é um protocolo usado para autenticação centralizada em redes corporativas. O Spring Security permite integrar LDAP facilmente.

1. Adicionando a dependência

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-ldap</artifactId>
</dependency>

```

2. Configurando LDAP no application.yml

``` yaml

spring:
  ldap:
    urls: ldap://localhost:8389/
    base: dc=springframework,dc=org
    username: uid=admin,ou=system
    password: secret

```

3. Configurando o Spring Security para usar LDAP

``` Java

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.authentication.bind.BindAuthenticator;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;
import org.springframework.security.ldap.userdetails.LdapUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public LdapAuthenticationProvider ldapAuthenticationProvider() {
        BindAuthenticator authenticator = new BindAuthenticator(null);
        authenticator.setUserDnPatterns(new String[]{"uid={0},ou=people"});

        DefaultLdapAuthoritiesPopulator authoritiesPopulator =
                new DefaultLdapAuthoritiesPopulator(null, "ou=groups");

        return new LdapAuthenticationProvider(authenticator, authoritiesPopulator);
    }
}

```

Agora, o Spring Security autentica usuários via LDAP!

## Autenticação baseada em Formulários

Criamos um formulário de login personalizado para substituir a tela padrão do Spring Security.

1. Criando o HTML do login

Criamos um arquivo src/main/resources/templates/login.html:

``` HTML

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form method="post" action="/login">
        <label>Usuário:</label> <input type="text" name="username"><br>
        <label>Senha:</label> <input type="password" name="password"><br>
        <button type="submit">Entrar</button>
    </form>
</body>
</html>

```

2. Configuranod o SpringSecurity para usar o formulário

``` Java

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/home", true)
                .permitAll()
            )
            .logout(logout -> logout.logoutSuccessUrl("/login").permitAll());

        return http.build();
    }
}

```

Agora, o login será feito pela página personalizada!

## Autenticação com Basic Auth

O Basic Auth é um método simples que envia credenciais na requisição HTTP usando Authorization: Basic <Base64(username:password)>.

1. Habilitar Basic Auth no Spring Security

``` Java

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .httpBasic(); // Habilita Basic Auth

        return http.build();
    }
}

```

Agora, ao acessar qualquer endpoint protegido, o navegador pedirá usuário e senha, ou podemos enviar via Postman:

``` makefile

Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

```

Basic Auth é útil para APIs, mas evite em aplicações web modernas!