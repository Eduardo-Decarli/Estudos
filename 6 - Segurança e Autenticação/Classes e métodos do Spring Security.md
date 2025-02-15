# SecurityFilterChain

O que é o SecurityFilterChain?: o SecurityFilterChain é uma configuração central que define quais filtros de segurança serão aplicados às requisições HTTP da aplicação. Ele substitui a abordagem baseada em WebSecurityConfigurerAdapter (deprecated desde o Spring Security 5.7) e permite configurar a segurança da aplicação de forma mais modular e declarativa.

``` Java

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/publico").permitAll() // Permite acesso sem autenticação
                .requestMatchers("/admin").hasRole("ADMIN") // Apenas usuários com ROLE_ADMIN
                .anyRequest().authenticated() // Qualquer outra requisição precisa de autenticação
            )
            .formLogin(withDefaults()) // Habilita autenticação via formulário
            .httpBasic(withDefaults()); // Habilita autenticação via HTTP Basic
        
        return http.build();
    }
}

```

- authorizeHttpRequests: Define regras de acesso para URLs específicas.

- permitAll(): Permite acesso público sem necessidade de autenticação.

- hasRole("ADMIN"): Apenas usuários com a role "ADMIN" podem acessar a URL.

- authenticated(): Qualquer outra requisição precisa de autenticação.

- formLogin() e httpBasic(): Define os métodos de autenticação aceitos.

- http.build(): Retorna o objeto SecurityFilterChain pronto para ser usado pelo Spring Security.

# UserDetailsService

No Spring Security, o UserDetailsService é uma interface usada para carregar os detalhes de um usuário durante a autenticação. Ele é responsável por buscar os usuários no banco de dados, serviço externo ou qualquer outro repositório de credenciais.

Essa interface define apenas um método:

``` java

UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

```

Esse método recebe um nome de usuário e retorna um objeto UserDetails, que contém as informações de autenticação e autorização do usuário.

Normalmente, você implementa essa interface quando deseja buscar usuários de um banco de dados. Exemplo:

``` Java

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole()) // Define as roles do usuário
                .build();
    }
}

```

- findByUsername(username): Busca o usuário no banco de dados.

- orElseThrow(): Lança uma exceção se o usuário não for encontrado.

- User.withUsername(): Cria um objeto UserDetails com as credenciais do usuário.

- password(user.getPassword()): Define a senha do usuário.

- roles(user.getRole()): Define os papéis (roles) do usuário.

## Configurando o UserDetailsService no Spring Security

Agora precisamos dizer ao Spring Security que queremos usar essa implementação. Para isso, registramos o **UserDetailsService** como um **bean**:

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Recomendado para armazenar senhas criptografadas
    }
}

```