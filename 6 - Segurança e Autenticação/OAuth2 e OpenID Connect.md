# OAuth2 e OpenID Connect

Vamos explorar OAuth2 e OpenID Connect no Spring Security. 🚀

## Introdução ao OAuth2 e sua Aplicação no Spring Security

OAuth2 é um protocolo de autorização que permite que usuários acessem recursos protegidos sem precisar compartilhar suas credenciais diretamente. É amplamente usado para Single Sign-On (SSO) e integrações com provedores como Google, GitHub e Facebook.

Seu fluxo de autorização com OAuth2 funciona da seguinte forma:

- Usuário solicita login → Redirecionado para o provedor OAuth2.

- Autenticação no provedor → Usuário insere credenciais.

- Autorização → O provedor retorna um Access Token.

- Acesso ao recurso → O Spring Security usa o token para autenticar e autorizar o usuário.

Para configurarmos o OAuth2 em um projeto Spring, primeiro adicionamos sua dependência

``` XML

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```

O Spring Boot já possui integração nativa com OAuth2, então a configuração é simples.

adicionamos as credenciais do provedor no **application.yml**

``` yaml

spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: SEU_CLIENT_ID
            client-secret: SEU_CLIENT_SECRET
            scope: profile, email
          github:
            client-id: SEU_CLIENT_ID
            client-secret: SEU_CLIENT_SECRET
            scope: read:user
          facebook:
            client-id: SEU_CLIENT_ID
            client-secret: SEU_CLIENT_SECRET
            scope: public_profile, email

```

Você precisa cadastrar sua aplicação nos provedores (Google, GitHub, Facebook) para obter as credenciais.

Após isso, criamos uma classe SecurityConfig para habilitar o OAuth2 no Spring Security

``` Java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(); // Habilita login com OAuth2
        
        return http.build();
    }
}

```

- Agora, ao acessar http://localhost:8080/login, o usuário verá opções de login com Google, GitHub ou Facebook.

- Após a autenticação, ele será redirecionado para a aplicação, já autenticado.

# OpenID Connect e Autenticação Federada

OpenID Connect é uma camada em cima do OAuth2 que adiciona um ID Token, permitindo que um usuário seja autenticado em múltiplos sistemas sem precisar criar contas separadas.

O Google já suporta OpenID Connect por padrão. Para ativar:

``` yaml

spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: SEU_CLIENT_ID
            client-secret: SEU_CLIENT_SECRET
            scope: openid, profile, email

```

Isso permite que o Spring receba um ID Token, que contém informações do usuário autenticado.