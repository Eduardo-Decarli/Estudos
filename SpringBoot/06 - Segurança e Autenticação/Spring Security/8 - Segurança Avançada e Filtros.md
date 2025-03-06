# Segurança Avançada e Filtros no Spring Security

O Spring Security funciona como uma cadeia de filtros que processa autenticação e autorização antes de permitir que a requisição chegue à aplicação.

## Como Funciona a Cadeia de Filtros do Spring Security?

O Spring Security possui uma cadeia de filtros que processam a autenticação e autorização. Os principais filtros são:

| **Filtro**                           | **Descrição**                                         |
|--------------------------------------|-------------------------------------------------------|
| SecurityContextPersistenceFilter     | Recupera o contexto de segurança da sessão.           |
| UsernamePasswordAuthenticationFilter | Processa autenticação baseada em formulário (/login). |
| BasicAuthenticationFilter            | Processa autenticação via Basic Auth.                 |
| BearerTokenAuthenticationFilter      | Processa autenticação via JWT ou OAuth2.              |
| LogoutFilter                         | Gerencia o logout do usuário.                         |
| ExceptionTranslationFilter           | Traduz exceções de autenticação/autorização.          |
| FilterSecurityInterceptor            | Verifica permissões para acessar recursos protegidos. |
| FilterSecurityInterceptor            | Verifica permissões para acessar recursos protegidos. |

- **Ordem dos filtros:** Os filtros são executados em uma ordem específica. O Spring Security organiza e gerencia a cadeia de filtros automaticamente.
- Podemos adicionar filtros personalizados para lógica extra de segurança.

## UsernamePasswordAuthenticationFilter

Este filtro lida com a autenticação baseada em formulário (/login).

Fluxo de autenticação:

1. O usuário envia username e senha.
2. O **UsernamePasswordAuthenticationFilter** processa a requisição.
3. Se as credenciais forem válidas, o usuário é autenticado.
4. O **SecurityContextHolder** armazena a autenticação.

``` Java

// Como personalizar a Autenticação

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        
        return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}

```

- **UserDetailsService** → Interface para buscar usuários do banco.
- **loadUserByUsername** → Carrega usuário por nome de usuário

## BasicAuthenticationFilter (Autenticação HTTP Basic)

Este filtro processa a autenticação HTTP Basic (usuário e senha no cabeçalho).

``` http

GET /api/protected HTTP/1.1
Authorization: Basic dXN1YXJpbzpwYXNz

```

Para ativarmos essa autenticação via cabeçalho, podemos ativar a autenticação basica no securityFilterChain

``` Java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .httpBasic(withDefaults()) // Habilita Basic Auth
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        );
    return http.build();
}

```

## Criando filtros personalizados no Spring Security

Podemos criar filtros personalizados para adicionar lógica extra na autenticação.

``` Java

@Component
public class CustomAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
                                    throws ServletException, IOException {
        String header = request.getHeader("X-Custom-Auth");
        
        if (header == null || !header.equals("TOKEN-SECRETO")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Acesso negado");
            return;
        }
        
        filterChain.doFilter(request, response);
    }
}

```

- **OncePerRequestFilter** → Garante que o filtro seja executado apenas uma vez por requisição.
- Verifica o cabeçalho "X-Custom-Auth" antes de permitir o acesso.

``` Java

// Registrando o Filtro personalizado no Spring Security

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .addFilterBefore(new CustomAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class) // Adiciona o filtro antes da autenticação padrão
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        );
    return http.build();
}

```