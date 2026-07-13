# Comandos do Spring Boot

Assim como outros programas, o spring boot pode receber comandos via CLI para poder executar funções específicas. Para executar funções específicas do spring, fazemos isso via **Spring Boot CLI**, **gerenciador de pacotes** ou via **jar** na classe main do target gerado após a compilação.

- Inicialização do Spring via Maven

``` bash

mvn spring-boot:run

```

# Exceptions no Spring

O Spring lida com 3 mundos diferentes, e precisa lidar entre o java, Http e regras de negócio, para isso, o Spring produziu um sistema próprio para lidar com exceptions no ambiente. Onde ele capta as exceptions e automatiza as respostas de erro como respostas da API Rest.

- **Exception Checked:** Representa exceptions que são verificadas em tempo de compilação, são exceptions que precisam ser tratadas para compilar o projeto e necessitam de try-catch ou throws
- **Exception Unchecked:** São as RuntimeExceptions, são exceptions que a compilação não consegue identificar de antemão se terá ou não um erro, um exemplo seria, utilizar um valor consultado do banco, mas retornou ***null***, isso daria um erro runtime.
- **Error:** São erros que fecham o sistema devido algum problema específico

O java ele possui uma hierarquia bem definida de exceptions que são possíveis de serem tratadas, sendo uma superclasse geral chamada Throwable, e suas ramificações.

![hierarquia-exceptions](/Files/herarquia-exceptions-java.webp)

A superclasse Throwable oferece alguns métodos úteis para poder entender melhor os erros gerados: 

- printStackTrace(): Esse método retorna a pilha de errosencontrada em uma exceção.
- getMessage(): Retorna uma mensagem contendo o motivo do erro gerado.

No Java, ele disponibiliza um System.err, que permite imprimir erros no console com uma cor destaque (vermelho).

# Spring Security

## Interface Autentication

A interface Authentication atua como um **contrato** que guarda as informações do usuário logado durante o ciclo de vida da requisição. Seus principais elementos são:

- Principal: Identifica o usuário (pode ser uma String, como um username, ou um objeto completo que implementa UserDetails).
- Credentials: Geralmente a senha ou token usado para provar a identidade do usuário (é limpa após a autenticação bem-sucedida).
- Authorities: As permissões, papéis (roles) ou escopos atribuídos ao usuário (ex: ROLE_ADMIN).
- Authenticated: Um booleano que indica se a identidade foi verificada com sucesso.

Quando alguém tenta fazer login, o AuthenticationManager recebe essas informações, valida com o sistema (como um banco de dados) e, se estiver correto, retorna um objeto Authentication preenchido. Esse objeto é armazenado no SecurityContextHolder para que o restante da aplicação saiba quem está fazendo a requisição