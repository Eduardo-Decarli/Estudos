- [O que é o Spring Security](#o-que-é-o-spring-security)
  - [Como o Spring Security Funciona?](#como-o-spring-security-funciona)
  - [Configurando básica do Spring Security](#configurando-básica-do-spring-security)
  - [Entendendo Autenticação e Autorização padrão](#entendendo-autenticação-e-autorização-padrão)
- [Configuração Padrão do Spring Security](#configuração-padrão-do-spring-security)
  - [Configuração Automática do Spring Security](#configuração-automática-do-spring-security)
  - [Trabalhando com o Usuário Padrão Gerado pelo Spring Security](#trabalhando-com-o-usuário-padrão-gerado-pelo-spring-security)
  - [Customizando Credenciais no application.properties](#customizando-credenciais-no-applicationproperties)
- [Configuração Personalizada com java Config](#configuração-personalizada-com-java-config)
  - [Criando uma classe de configuração com @Configuration e @EnableWebSecurity](#criando-uma-classe-de-configuração-com-configuration-e-enablewebsecurity)
  - [Personalizando a autenticação e autorização com SecurityFilterChain](#personalizando-a-autenticação-e-autorização-com-securityfilterchain)
  - [Definição de Regra de Segurança com HttpSecurity](#definição-de-regra-de-segurança-com-httpsecurity)
- [Trabalhando com usuários e Roles](#trabalhando-com-usuários-e-roles)
  - [Definição de Usuários em Memória com InMemoryUserDetailsManager](#definição-de-usuários-em-memória-com-inmemoryuserdetailsmanager)
  - [Definição de Usuários em Banco de Dados com UserDetailsService e PasswordEncoder](#definição-de-usuários-em-banco-de-dados-com-userdetailsservice-e-passwordencoder)
  - [Trabalhando com Roles e Authorities (@PreAuthorize, @Secured)](#trabalhando-com-roles-e-authorities-preauthorize-secured)
- [Autenticação Customizada](#autenticação-customizada)


# O que é o Spring Security

O Spring Security é um framework do ecossistema Spring que fornece autenticação, autorização e outras funcionalidades de segurança para aplicações Java. Ele é amplamente utilizado para proteger aplicações web e serviços RESTful, garantindo que apenas usuários ou sistemas autorizados possam acessar recursos específicos.

**Autenticação baseada em banco de dados:** A autenticação baseada em banco de dados é um processo de segurança que verifica a identidade de um usuário para que ele possa acessar um banco de dados. 

**LDAP:** é um protocolo amplamente usado para autenticação e gerenciamento de diretórios de usuários. ele é utilizado no Spring Security para autenticar usuários e controlar o acesso com base em diretórios organizacionais, como o Active Directory da Microsoft ou OpenLDAP.

**JWT (JSON Web Tokens):** JWT (JSON Web Token) é um formato de token usado para autenticação e autorização entre partes diferentes de um sistema. Ele é amplamente utilizado em aplicações web para permitir que usuários façam login e mantenham a autenticação sem precisar reenviar credenciais a cada requisição.

**OAuth2:** é um protocolo de autorização amplamente utilizado para conceder acesso seguro a recursos protegidos sem expor credenciais do usuário. OAuth2 permite que aplicações acessem recursos em nome de um usuário sem precisar armazenar sua senha. Ele é usado por grandes plataformas como Google, Facebook e GitHub para login e permissões de acesso a APIs.

O Spring Security permite a autenticação, garantindo que o usuário legítimo possa acessar a aplicação, a autorização, restringindo ações ou aceesso a recursos com **base em permissões (role)** atribuidas ao usuário e Proteção contra vulnerabilidades como **CSRF (Cross-Site Request Forgery)**, **XSS (Cross-Site Scripting)**, **SQL Injection** e ataques de força bruta.

## Como o Spring Security Funciona?

Internamente, o Spring Security opera através de uma cadeia de filtros (filter chain) que interceptam as requisições HTTP antes que elas alcancem os endpoints da aplicação. Cada filtro na cadeia tem uma responsabilidade específica, como autenticação, proteção contra CSRF, entre outros. Quando uma requisição é recebida, ela passa por essa cadeia de filtros, onde cada um processa e, se necessário, modifica a requisição ou resposta, garantindo que apenas usuários autenticados e autorizados acessem os recursos protegidos.

## Configurando básica do Spring Security

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

Após adicionar a dependência do Spring Security, crie uma classe que implemente a configuração de segurança personalizada. A partir das versões mais recentes do Spring Security, recomenda-se usar a abordagem baseada em SecurityFilterChain:

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(withDefaults());
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        var user = User.withUsername("user")
                       .password("{noop}password")
                       .roles("USER")
                       .build();
        return new InMemoryUserDetailsManager(user);
    }
}

```

Nesse exemplo, todas as requisições exigem autenticação, e o login é feito via formulário padrão do Spring Security. Um usuário em memória é definido com o nome de usuário "user" e senha "password".

## Entendendo Autenticação e Autorização padrão

**Autenticação:** É o processo de verificar a identidade do usuário. No exemplo acima, a autenticação é realizada contra um usuário em memória. Em aplicações reais, é comum integrar com sistemas de autenticação externos, como bancos de dados, LDAP ou serviços OAuth2.

**Autorização:** Após a autenticação, a autorização determina quais recursos o usuário pode acessar. No Spring Security, isso é configurado através de regras que especificam quais roles ou authorities têm acesso a determinados endpoints.

# Configuração Padrão do Spring Security

vamos abordar a Configuração Padrão do Spring Security, incluindo a configuração automática, o usuário padrão gerado e como customizar as credenciais no application.properties.

## Configuração Automática do Spring Security

Ao adicionar a dependência spring-boot-starter-security ao seu projeto Spring Boot, o framework aplica automaticamente configurações de segurança padrão à sua aplicação. Isso inclui a proteção de todas as URLs, exigindo autenticação para acessá-las. Além disso, o Spring Security gera uma página de login padrão e cria um usuário padrão com uma senha gerada aleatoriamente a cada execução da aplicação.

## Trabalhando com o Usuário Padrão Gerado pelo Spring Security

Após iniciar a aplicação com a configuração padrão, o Spring Security cria um usuário com o nome de usuário user e uma senha gerada aleatoriamente. Essa senha é exibida no console de logs durante a inicialização da aplicação, em uma linha semelhante a:

``` bash

Using generated security password: 78fa095d-3f4c-48b1-ad50-e24c31d5cf35

```

Para fazer login na aplicação, utilize o nome de usuário user e a senha gerada exibida no console. No entanto, como essa senha muda a cada reinicialização, não é prático utilizá-la em ambientes de desenvolvimento ou produção.

## Customizando Credenciais no application.properties

Para definir um nome de usuário e senha fixos, você pode configurar as propriedades no arquivo application.properties da seguinte forma:

``` properties

spring.security.user.name=meuUsuario
spring.security.user.password=minhaSenha

```

Com essas configurações, o Spring Security utilizará as credenciais especificadas para autenticação, em vez de gerar uma senha aleatória. Isso é especialmente útil durante o desenvolvimento ou em ambientes onde um usuário padrão é necessário.

**Observação Importante:** As propriedades **spring.security.user.name** e **spring.security.user.password** são adequadas para ambientes de desenvolvimento ou para aplicações simples. Para aplicações em produção ou mais complexas, é recomendável implementar um sistema de gerenciamento de usuários mais robusto, como a integração com um banco de dados ou um serviço de diretório, garantindo uma gestão de credenciais mais segura e escalável.

# Configuração Personalizada com java Config

Agora vamos aprofundar a Configuração Personalizada com Java Config no Spring Security.

## Criando uma classe de configuração com @Configuration e @EnableWebSecurity

Quando utilizamos o Spring Security, podemos personalizar a configuração criando uma classe Java anotada com @Configuration e @EnableWebSecurity.

Desde o Spring Security 5.7, a anotação @EnableWebSecurity não é mais obrigatória, pois o Spring Boot já aplica essa configuração automaticamente. No entanto, ela ainda pode ser usada explicitamente para indicar que estamos configurando a segurança manualmente.

``` Java

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin()
            .and()
            .httpBasic();

        return http.build();
    }
}

```

- Todas as requisições precisam estar autenticadas **(.anyRequest().authenticated())**.
- Habilita login por formulário padrão **(.formLogin())**.
- Ativa autenticação básica **(.httpBasic())**, útil para APIs.

## Personalizando a autenticação e autorização com SecurityFilterChain

Com SecurityFilterChain, podemos definir como a autenticação e autorização serão tratadas. Vamos personalizar a autenticação criando um usuário em memória:

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/publico").permitAll()  // Permite acesso sem autenticação
                .requestMatchers("/admin").hasRole("ADMIN") // Apenas usuários com ROLE_ADMIN podem acessar
                .anyRequest().authenticated()
            )
            .formLogin()
            .and()
            .httpBasic();

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("usuario")
                .password("1234")
                .roles("USER")
                .build();

        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("admin123")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}

```

- Criamos usuários na memória: um usuário comum e um administrador.
- O usuário "usuario" tem a role "USER".
- O usuário "admin" tem a role "ADMIN".
- Definimos permissões para rotas:
  - **/publico** pode ser acessado por qualquer um.
  - **/admin** só pode ser acessado por "ADMIN".
  - Todas as outras rotas precisam de autenticação.

## Definição de Regra de Segurança com HttpSecurity

Com HttpSecurity, podemos configurar regras mais avançadas. como por exemplo: Desativando CSRF e permitindo chamadas a uma API REST

Se você estiver criando uma API RESTful e não precisar do formulário de login, pode desativar o CSRF e o login padrão:

``` Java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())  // Desativa proteção CSRF
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/publico").permitAll()
            .requestMatchers("/api/privado").authenticated()
        )
        .httpBasic();

    return http.build();
}

```

- O endpoint **/api/publico** pode ser acessado sem autenticação.
- O endpoint **/api/privado** precisa de autenticação.
- O CSRF foi desativado, útil para APIs REST (não recomendado para aplicações web com formulários).

# Trabalhando com usuários e Roles

Agora vamos ver como trabalhar com Usuários e Roles no Spring Security.

## Definição de Usuários em Memória com InMemoryUserDetailsManager

O **InMemoryUserDetailsManager** permite armazenar usuários e senhas diretamente na memória, útil para testes e aplicações simples.

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("1234")
                .roles("USER") // ROLE_USER
                .build();

        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("admin123")
                .roles("ADMIN") // ROLE_ADMIN
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}

```

- Define dois usuários em memória: user (ROLE_USER) e admin (ROLE_ADMIN).

- Usa **User.withDefaultPasswordEncoder()** (apenas para testes, não recomendado para produção).

## Definição de Usuários em Banco de Dados com UserDetailsService e PasswordEncoder

Para armazenar usuários no banco de dados, precisamos implementar UserDetailsService e usar um PasswordEncoder para armazenar senhas de forma segura.

Então primeiro vamos criar uma entidade e um repositório para um usuário

``` Java

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;

    // Getters e Setters
}

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}

```

Após a criação, vamos elaborar uma classe responsável pelo service do usuário ao implementar UserDetailsService

``` Java

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getRoles().toArray(new String[0]))
                .build();
    }
}

```

E por fim, vamos definir um @Bean para o SpringBoot entender qual PasswordEncoder queremos utilizar no contexto do SpringSecurity

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

- Define um **repositório JPA** para buscar usuários no banco de dados.
 
- Implementa **UserDetailsService** para carregar usuários no Spring Security.

- Usa **BCryptPasswordEncoder** para armazenar senhas criptografadas.

## Trabalhando com Roles e Authorities (@PreAuthorize, @Secured)

Podemos definir permissões para métodos com @PreAuthorize e @Secured.

1. Usando **@PreAuthorize**

``` Java

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Somente ADMIN pode acessar
    public String acessoAdmin() {
        return "Bem-vindo, Administrador!";
    }
}

```

2. Usando **@Secured**

``` Java

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @GetMapping
    @Secured("ROLE_USER") // Apenas usuários com ROLE_USER podem acessar
    public String acessoUsuario() {
        return "Bem-vindo, Usuário!";
    }
}

```

# Autenticação Customizada

gora vamos personalizar a autenticação no Spring Security. 🚀

## Criando um Serviço de Autenticação Personalizada (UserDetailsService)

O UserDetailsService é uma interface do Spring Security que permite carregar usuários do banco de dados para autenticação. Vamos implementá-la para buscar usuários armazenados no banco.

Primeiro, definimos a entidade Usuario para armazenar credenciais no banco:

``` Java

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles; // Ex: ["USER", "ADMIN"]

    // Getters e Setters
}

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}

```

Agora implementamos o serviço de autenticação para buscar usuários no banco de dados.

``` Java

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getRoles().toArray(new String[0]))
                .build();
    }
}

```

- Carrega um usuário do banco pelo username.

- Converte a entidade Usuario em um objeto UserDetails que o Spring Security entende.

## Implementando um PasswordEncoder Seguro

Nunca devemos armazenar senhas em texto puro no banco! O BCryptPasswordEncoder é uma das melhores opções para hash de senhas.

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

Antes de salvar um usuário, devemos codificar a senha:

``` Java

@Service
public class CadastroUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public CadastroUsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario salvarUsuario(String username, String senha, Set<String> roles) {
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(senha)); // Hash da senha
        usuario.setRoles(roles);
        return usuarioRepository.save(usuario);
    }
}

```

- Antes de salvar a senha no banco, aplicamos passwordEncoder.encode(senha).

- Isso protege os dados do usuário contra ataques de vazamento de credenciais.

# Métodos Avançados de Segurança

Vamos explorar métodos avançados de segurança no Spring Security. 🚀

## Segurança Baseada em Métodos

O Spring Security permite restringir o acesso a métodos usando anotações, garantindo que apenas usuários autorizados possam executá-los.

Para ativar essa funcionalidade, basta adicionar **@EnableMethodSecurity** na classe de configuração.

``` Java

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin();

        return http.build();
    }
}

```

Também podemos estabelecer permissões baseadas em **roles (cargos)** pela anotação **@Secured**.

``` Java

@Service
public class ProdutoService {

    @Secured("ROLE_ADMIN") // Apenas usuários com a role ADMIN podem executar esse método
    public String excluirProduto(Long id) {
        return "Produto excluído com sucesso!";
    }
}

```

Ou também podemos fazer uso da anotação @PreAuthorize que permite expressões mais flexíveis, como verificar permissões antes de executar um método.

``` Java

@Service
public class PedidoService {

    @PreAuthorize("hasRole('ADMIN') or hasRole('GERENTE')")
    public String aprovarPedido(Long id) {
        return "Pedido aprovado!";
    }
}

```

- Admins e Gerentes podem aprovar pedidos, outros usuários serão bloqueados.

## Configuração de CORS e CSRF no Spring Security


O CORS (Cross-Origin Resource Sharing) controla quais domínios podem fazer requisições para sua API e O CSRF (Cross-Site Request Forgery) impede que ataques forjem requisições autenticadas sem o conhecimento do usuário.

Podemos configurar o CORS e desativar o CSRF (se estiver usando JWT, por exemplo).

``` Java

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF (cuidado ao usar!)
            .cors(cors -> cors.configure(http)) // Habilita CORS
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin();

        return http.build();
    }
}

```

- Agora sua API aceita requisições de outros domínios, desde que estejam configurados no CORS.

CSRF ocorre quando um usuário autenticado é induzido a executar ações indesejadas. Se NÃO estiver usando JWT, **mantenha CSRF ativado!**

## Proteção Contra Ataques Comuns

Proteção contra XSS (Cross-Site Scripting), XSS ocorre quando um atacante injeta código malicioso (JavaScript) em uma página web.

- Solução: Spring Security já vem com proteção contra XSS ativada.

Para reforçar, sempre escape dados antes de exibir no frontend.

``` Java

import org.springframework.web.util.HtmlUtils;

public String protegerXSS(String input) {
    return HtmlUtils.htmlEscape(input); // Evita a execução de scripts injetados
}

```

