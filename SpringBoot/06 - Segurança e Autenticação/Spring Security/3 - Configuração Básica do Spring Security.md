# Configuração Básica do Spring Security

O Spring Security pode ser configurado rapidamente com autenticação padrão e usuários em memória. Vamos ver como isso funciona na prática!

## 1. Adicionando a dependência do Spring Security

Para ativar o Spring Security no Spring Boot, basta adicionar a seguinte dependência ao pom.xml:

``` xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

Essa dependência inclui todas as configurações básicas de segurança no projeto.

## 2. Configuração Padrão do Spring Security

Assim que adicionamos a dependência spring-boot-starter-security, algumas configurações são ativadas automaticamente:

- Usuário e senha gerados automaticamente: O Spring Boot cria um usuário chamado user e gera uma senha aleatória, exibida no console na inicialização:

``` JSON

Using generated security password: 7d5f3b0c-1234-5678-9abc-def012345678

```

Para fazer login, basta acessar qualquer endpoint protegido no navegador e inserir:

``` makefile

Usuário: user  
Senha: <senha exibida no console>

```

**Filtro de autenticação ativado por padrão:** O Spring Security intercepta todas as requisições HTTP automaticamente. Qualquer requisição sem autenticação recebe um erro 401 (Unauthorized). O login é feito via formulário padrão do Spring Security (/login).

Conclusão: Sem escrever uma única linha de código, já temos uma aplicação segura!

## 3. Customizando o Login com Usuários em Memória

Agora, vamos personalizar a autenticação para usar um usuário definido manualmente no código. Criamos uma classe de configuração **SecurityConfig** e sobrescrevemos a autenticação para definir usuários em memória:

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("admin")
                .password("{noop}admin123") // Sem criptografia (apenas para testes)
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
}

```

- Agora, o usuário admin pode fazer login com a senha admin123.

- Importante: O {noop} na senha indica que não há criptografia (não recomendado para produção!).

## 4. Configurando um PasswordEncoder Seguro

Senhas **NUNCA** devem ser armazenadas em texto puro. O Spring Security recomenda o uso de PasswordEncoder para aplicar criptografia. Modificamos a configuração para usar BCryptPasswordEncoder:

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.withUsername("admin")
                .password(passwordEncoder.encode("admin123")) // Senha criptografada
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

Agora, a senha admin123 será criptografada antes de ser armazenada.

- Melhor prática: Sempre usar PasswordEncoder para armazenar senhas de forma segura!

## 5. Configurando uma autenticação basica

Além da autenticação padrão via formulário, podemos configurar a autenticação básica (Basic Authentication), que é um método simples e direto para autenticação via cabeçalho HTTP. Para isso, você pode ajustar a configuração da seguinte maneira:

``` Java

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF para APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll() // Permite registro sem autenticação
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll() // Permite login sem autenticação
                        .anyRequest().authenticated() // Exige autenticação para qualquer outra requisição
                )
                .httpBasic(Customizer.withDefaults()); // Habilita autenticação básica HTTP

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.withUsername("eduardo")
                .password(passwordEncoder.encode("2004")) // Senha criptografada
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

**httpBasic(Customizer.withDefaults()):** Configura a autenticação básica HTTP, onde o cliente envia o nome de usuário e a senha no cabeçalho da requisição (com a chave Authorization).

Conclusão: Com essa configuração, a aplicação estará segura com autenticação básica e usuários em memória com senhas criptografadas. Além disso, endpoints como o de registro e login estarão acessíveis sem autenticação, enquanto os outros endpoints exigem autenticação.