# Trabalhando com Sessões e Cookies no Spring Security

Spring Security gerencia automaticamente as sessões e cookies, mas podemos configurá-los para melhor controle de segurança e experiência do usuário.

## Gerenciamento de Sessão no Spring Security

O gerenciamento de sessão envolve tempo de expiração e concorrência de sessão. Por padrão, o Spring Boot expira a sessão após 30 minutos de inatividade. Podemos alterar esse tempo no application.properties:

``` properties

server.servlet.session.timeout=15m # Expira após 15 minutos

```

Também podemos configurar diretamente no código:

``` Java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .sessionManagement(session -> session
            .invalidSessionUrl("/login?expired") // Página para sessão expirada
            .sessionFixation().migrateSession() // Evita sequestro de sessão
        );
    return http.build();
}

```

- Concorrência de Sessão (Evitar Múltiplos Logins)

Se quisermos limitar o número de sessões por usuário, podemos configurar:

``` Java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .sessionManagement(session -> session
            .maximumSessions(1) // Apenas uma sessão por usuário
            .maxSessionsPreventsLogin(true) // Bloqueia novos logins se já houver sessão ativa
        );
    return http.build();
}

```

- **maximumSessions(1)** → Permite apenas uma sessão ativa por usuário.
- **maxSessionsPreventsLogin(true)** → Evita que um novo login desconecte sessões anteriores.

## Protegendo Contra ataques de Sessão

O Spring Security protege contra **CSRF (Cross-Site Request Forgery)** e **Session Fixation** automaticamente.

CSRF (Cross-Site Request Forgery)
- O CSRF impede que ataques forcem um usuário autenticado a realizar ações sem consentimento.
- O Spring Security habilita **CSRF** por padrão em requisições **POST**, **PUT**, **DELETE**.

Em algumas situações (exemplo: APIs REST), pode ser necessário desativar a proteção CSRF:

``` Java

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Desabilita CSRF (não recomendado para apps com formulários)
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        );
    return http.build();
}

```

Importante! → Desativar CSRF só é seguro se a aplicação não usar formulários HTML.

## Lembre-se de Mim (Remember Me)

Por padrão, a autenticação do usuário expira ao fechar o navegador. O recurso "Lembre-se de mim" permite que os usuários permaneçam autenticados entre sessões.

``` Java

// Como ativar o Remember me

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .rememberMe(remember -> remember
            .key("chave-secreta") // Chave para gerar os tokens
            .tokenValiditySeconds(7 * 24 * 60 * 60) // 7 dias
            .userDetailsService(userDetailsService()) // Serviço de usuários
        );
    return http.build();
}

```

- **tokenValiditySeconds(7 * 24 * 60 * 60)** → Mantém o usuário autenticado por 7 dias.
- **key("chave-secreta")** → Chave para assinar os cookies de autenticação.

Agora só precisamos adicionar um checkbox "Lembre-se de mim" no formulário

``` HTML

<form action="/login" method="post">
    <label for="username">Usuário:</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Senha:</label>
    <input type="password" id="password" name="password" required>

    <label>
        <input type="checkbox" name="remember-me"> Lembre-se de mim
    </label>

    <button type="submit">Entrar</button>
</form>

```

O Spring Security automaticamente reconhece o campo remember-me no login.