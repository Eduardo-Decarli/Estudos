# Personalizando a Página de Login e Logout no Spring Security

Por padrão, o Spring Security fornece uma página de login genérica, mas podemos personalizá-la para atender às necessidades da aplicação.

Se não personalizarmos a página de login, o Spring Security exibe uma tela padrão, Essa tela pode ser substituída por uma página HTML personalizada.

## Customizando a Página de Login

1. Criando o HTML do Login (Crie um arquivo login.html dentro de ``src/main/resources/templates/:``)

``` HTML

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="/login" method="post">
        <label for="username">Usuário:</label>
        <input type="text" id="username" name="username" required>
        
        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Entrar</button>
    </form>
</body>
</html>

```

- O formulário envia os dados para **/login** usando **method="post"**.
- O Spring Security usará automaticamente esses campos (username e password).

2. Configurando o SpringSecurity para usar a nova página

Agora, precisamos dizer ao Spring Security para usar nosso HTML no login.

``` Java

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/custom-login") // URL da página de login
                .loginProcessingUrl("/login") // URL para processar o login
                .defaultSuccessUrl("/home", true) // Página após login bem-sucedido
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout") // Página após logout
                .permitAll()
            );

        return http.build();
    }
}

```

- **loginPage("/custom-login")** → Define a URL da página personalizada.
- **loginProcessingUrl("/login")** → Onde o Spring Security processa o login.
- **defaultSuccessUrl("/home", true)** → Para onde redirecionar após login bem-sucedido.
- **permitAll()** → Permite acesso à página de login sem autenticação.

3. Criando um Controller para exibir a página de Login

O Spring Security precisa de um controller para renderizar nossa página.

``` Java

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/custom-login")
    public String login() {
        return "login"; // Nome do arquivo login.html
    }
}

```

Agora, ao acessar /custom-login, o Spring mostrará nossa página HTML personalizada.

## Implementando Logout Seguro

Para adicionar um logout seguro, usamos **logoutSuccessUrl()** para redirecionar o usuário após o logout.

``` Java

.logout(logout -> logout
    .logoutUrl("/logout") // URL que executa o logout
    .logoutSuccessUrl("/login?logout") // Página após logout
    .invalidateHttpSession(true) // Invalida a sessão do usuário
    .deleteCookies("JSESSIONID") // Remove cookies de sessão
    .permitAll()
)

```

- **logoutUrl("/logout")** → URL que faz o logout.
- **logoutSuccessUrl("/login?logout")** → Redireciona para /login?logout após logout.
- **invalidateHttpSession(true)** → Invalida a sessão do usuário.
- **deleteCookies("JSESSIONID")** → Remove cookies para segurança.

Adicionando um Botão de Logout na Página

``` HTML

<form action="/logout" method="post">
    <button type="submit">Sair</button>
</form>

```

O Spring Security gerencia o logout automaticamente quando enviamos um **POST** para **/logout**.