# Personalizando a Autenticação no Spring Security

Até agora, usamos usuários em memória, mas em aplicações reais, os usuários são armazenados em bancos de dados ou provedores externos como LDAP.

Agora, vamos explorar diferentes formas de autenticação no Spring Security.

## Autenticação com Banco de Dados

O Spring Security permite carregar usuários de um banco de dados relacional usando um **UserDetailsService** personalizado.

``` Java

// Criando a entidade **User**
// Criamos uma entidade para armazenar usuários no banco de dados:

@Entity
@Table(name = "users_tb")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, unique = true, nullable = false)
    private UUID id;

    @Column(name = "fist_name", unique = false, nullable = false)
    private String firstName;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

// Criando um repositório UserRepository

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// Implementando o UserDetails
// Agora, criamos um UserDetails para carregar usuários do banco.

public class SecurityUserDetails implements UserDetails {

    private User user;

    public SecurityUserDetails(User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

// Após a criação do UserDetail, temos que criar um UserDetailService.

@Service
public class SecurityUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public SecurityUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new SecurityUserDetails(user);
    }

}

// Após isso, devemos fazer um service para login, para ser usado nas rotas do controller

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper mapper;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper mapper, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
        this.authenticationManager = authenticationManager;
    }

    public String register(UserCreateDto createDto) {
        if(userRepository.existsByEmail(createDto.email())) throw new DuplicateException("This user already exists by email!");
        if(userRepository.existsByTelephone(createDto.telephone())) throw new DuplicateException("This user already exists by telephone!");

        User user = mapper.toUser(createDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User " + user.getEmail() + " was successfully created!";
    }

    public String login(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "User " + email + " successfully logged in!";
    }
}

// Configurando a Segurança

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
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