# Controle de Acesso e Autorização no Spring Security

A autenticação identifica quem é o usuário, mas a autorização define o que ele pode fazer.

O Spring Security permite configurar permissões para acessar endpoints, métodos e URLs específicas.

## Configuração de Permissões para Endpoints

Podemos definir quem pode acessar cada endpoint com métodos como:

- **hasRole("ADMIN")** → Permite acesso apenas para usuários com o papel ADMIN.
- **hasAuthority("READ_PRIVILEGE")** → Permite acesso para usuários com a permissão READ_PRIVILEGE.
- **permitAll()** → Qualquer usuário pode acessar.
- **denyAll()** → Ninguém pode acessar.

``` Java

// Exemplo: Protegendo endpoints com permissões

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("USER")
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin().permitAll()
            .logout().permitAll();

        return http.build();
    }
}

```

- O endpoint "/admin/" só pode ser acessado por usuários com a role ADMIN.
- O endpoint "/user/" só pode ser acessado por usuários com a role USER.
- O endpoint "/public/" pode ser acessado por qualquer um.
- Todos os outros endpoints precisam de autenticação (**anyRequest().authenticated()**).

## Autorização Baseada em Regras (**@PreAuthorize** e **@PostAuthorize**)

Podemos usar anotações para definir regras de acesso antes ou depois da execução de um método.

- **@PreAuthorize("hasRole('ADMIN')")** → Verifica antes de executar o método.
- **@PostAuthorize("returnObject.owner == authentication.name")** → Verifica depois que o método retorna um valor.

``` Java

// @PreAuthorize para verificar permissões antes de executar o método

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deletarUsuario(Long id) {
        System.out.println("Usuário deletado: " + id);
    }
}

```

- Somente usuários com a role ADMIN podem deletar usuários.

``` Java

// Exemplo: @PostAuthorize para validar o resultado após execução

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

    @PostAuthorize("returnObject.owner == authentication.name")
    public Document buscarDocumento(Long id) {
        return new Document(id, "admin"); // Simula um documento pertencente ao "admin"
    }
}

```

- Somente o dono do documento pode acessá-lo.

``` Java

// Ativando suporte a @PreAuthorize e @PostAuthorize

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {
}

```

- Sem essa configuração, @PreAuthorize e @PostAuthorize não funcionarão!

## Autorização Baseada em Métodos (@Secured)

Outra forma de proteger métodos é com a anotação **@Secured**.

- **@Secured("ROLE_ADMIN")** → Apenas usuários com a role ADMIN podem acessar.

``` Java

// Exemplo: Protegendo métodos com @Secured

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Secured("ROLE_ADMIN")
    public void adicionarProduto(String nome) {
        System.out.println("Produto adicionado: " + nome);
    }
}

```

- Apenas ADMINs podem adicionar produtos.

``` Java

// Habilitando suporte a @Secured

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class MethodSecurityConfig {
}

```

- Sem essa configuração, @Secured não funcionará!

## Proteção de URLs Específicas

Podemos proteger URLs específicas definindo quais usuários podem acessá-las.

- ``requestMatchers("/admin/**").hasRole("ADMIN")`` → Apenas ADMIN pode acessar /admin/*.
- `requestMatchers(HttpMethod.POST, "/produtos/**").hasAuthority("WRITE_PRIVILEGE")` → Apenas usuários com a permissão **WRITE_PRIVILEGE** podem criar produtos.

``` Java

// Protegendo URLs Específicas

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/produtos/**").hasAuthority("READ_PRIVILEGE")
                .requestMatchers(HttpMethod.POST, "/produtos/**").hasAuthority("WRITE_PRIVILEGE")
                .anyRequest().authenticated()
            )
            .formLogin().permitAll()
            .logout().permitAll();

        return http.build();
    }
}

```

- Somente usuários com **READ_PRIVILEGE** podem ler produtos.
- Somente usuários com **WRITE_PRIVILEGE** podem criar produtos.