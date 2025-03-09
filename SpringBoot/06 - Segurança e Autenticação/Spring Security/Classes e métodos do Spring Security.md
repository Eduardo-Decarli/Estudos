# SecurityFilterChain

**O que é o SecurityFilterChain?:** o SecurityFilterChain é uma configuração central que define quais filtros de segurança serão aplicados às requisições HTTP da aplicação. Ele substitui a abordagem baseada em WebSecurityConfigurerAdapter (deprecated desde o Spring Security 5.7) e permite configurar a segurança da aplicação de forma mais modular e declarativa.

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

# UserDetails

A classe UserDetails é uma interface essencial para representar informações do usuário no contexto de autenticação e autorização. Ela define os dados que o Spring Security precisa para autenticar e autorizar usuários.

**UserDetails** é uma interface do Spring Security que descreve o usuário autenticado no sistema. Ela é usada internamente pelo **UserDetailsService** para buscar informações do usuário no banco de dados e convertê-las em um formato compreendido pelo Spring Security.

Geralmente, criamos uma classe que representa um usuário da aplicação e implementa UserDetails:

``` Java

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
        return true; // Pode ser ajustado conforme a regra de negócio
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Pode ser ajustado conforme a regra de negócio
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Pode ser ajustado conforme a regra de negócio
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}

```

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

# AuthService

A classe AuthService é um serviço essencial para gerenciar autenticação e registro de usuários em uma aplicação Spring Security. Ela encapsula a lógica de criação de usuários e autenticação, garantindo que as regras de negócio sejam seguidas corretamente.

``` Java

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

        // Verifica se já existe um usuário com o mesmo e-mail
        if(userRepository.existsByEmail(createDto.email())) throw new DuplicateException("This user already exists by email!");
        
        // Verifica se já existe um usuário com o mesmo telefone
        if(userRepository.existsByTelephone(createDto.telephone())) throw new DuplicateException("This user already exists by telephone!");

        User user = mapper.toUser(createDto);

        // Codifica a senha antes de salvar no banco de dados
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User " + user.getEmail() + " was successfully created!";
    }

    public String login(String email, String password) {

        // Cria um token de autenticação com as credenciais fornecidas
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // Tenta autenticar o usuário
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // Se a autenticação for bem-sucedida, armazena no contexto de segurança do Spring
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Retorna uma mensagem de sucesso
        return "User " + email + " successfully logged in!";
    }
}

```

Ela possui dois métodos principais:

register(UserCreateDto createDto) 

- Verifica se o e-mail e telefone do usuário já existem no banco de dados. 
- Se os dados forem únicos, converte o DTO (createDto) em um objeto User. 
- Codifica a senha do usuário antes de salvar no banco.
- Persiste o usuário no banco e retorna uma mensagem de sucesso.

login(String email, String password)

- Cria um token de autenticação (UsernamePasswordAuthenticationToken).
- Usa o AuthenticationManager para autenticar o usuário.
- Se bem-sucedido, armazena a autenticação no SecurityContextHolder.
- Retorna uma mensagem de sucesso.