# Conceitos Fundamentais do Spring Security

O Spring Security fornece um modelo de segurança robusto baseado em autenticação, autorização e controle de permissões. Vamos entender cada um desses conceitos essenciais.

**Autenticação:** Processo de verificar a identidade do usuário. Normalmente feito com usuário e senha ou outros métodos (OAuth, JWT, etc.). Se autenticado com sucesso, o usuário recebe um token de sessão ou um contexto de segurança.

**Autorização:** Define o que o usuário pode acessar dentro da aplicação. Baseia-se em roles (funções) ou permissões específicas. Exemplo: Admin pode acessar /admin/dashboard, mas User não.

## UserDetails e UserDetailsService

**UserDetails:** O UserDetails é uma interface do Spring Security que representa um usuário autenticado na aplicação.

``` Java

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

public class MeuUsuario implements UserDetails {
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
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

```

**UserDetailsService:** O UserDetailsService é uma interface usada para carregar usuários do banco de dados ou de outra fonte. Implementamos essa interface para buscar usuários por username e definir suas permissões.

``` Java

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MeuUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Simulação de busca no banco
        if ("admin".equals(username)) {
            return new MeuUsuario("admin", "senhaCriptografada", List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }
        throw new UsernameNotFoundException("Usuário não encontrado!");
    }
}

```

## PasswordEncoder (Criptografia de Senhas)

No Spring Security, senhas nunca devem ser armazenadas em texto puro. O **PasswordEncoder** é usado para aplicar **hash** e **criptografia** às senhas. Suas Principais implementações são:

- BCryptPasswordEncoder (mais utilizado)
- Pbkdf2PasswordEncoder
- Argon2PasswordEncoder

``` Java

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SenhaUtil {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String senhaCriptografada = encoder.encode("minhaSenha123");
        System.out.println(senhaCriptografada);
    }
}

```

**Importante:** Nunca compare senhas diretamente! Use **matches()** para verificar:

``` Java

boolean senhaValida = encoder.matches("minhaSenha123", senhaCriptografada);

```

## SecurityContext e SecurityContextHolder

**SecurityContext:** Armazena informações sobre o usuário autenticado na aplicação. Ele é acessado através do **SecurityContextHolder**.

**SecurityContextHolder:** Classe que gerencia o **SecurityContext** da aplicação. Permite obter o usuário autenticado de qualquer lugar do código.

``` Java

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UsuarioAtual {
    public static void main(String[] args) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Usuário autenticado: " + authentication.getName());
    }
}

```

## GrantedAuthority e Role

**GrantedAuthority:** Representa uma permissão específica atribuída a um usuário. Pode ser algo como **"ROLE_ADMIN"** ou **"PERMISSION_DELETE"**.

**Role (Função/Papel):** Um Role define um conjunto de permissões que um usuário pode ter. Geralmente, é prefixado por **"ROLE_"** no Spring Security.

``` Java

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;

public class ExemploPermissoes {
    public static void main(String[] args) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        System.out.println("Permissões: " + authorities);
    }
}

```