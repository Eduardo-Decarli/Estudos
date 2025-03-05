# Arquivo application.properties e application.yml

Os arquivos application.properties e application.yml são usados para configurar propriedades da aplicação Spring Boot. Eles permitem que você defina configurações como porta do servidor, conexão com banco de dados, configurações de logging, entre outras.

## Diferença entre application.properties e application.yml

application.properties: Usa uma sintaxe simples de chave-valor.

``` properties

# Configurações do servidor
server.port=8080
server.servlet.context-path=/api

# Configurações do banco de dados
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret

# Configurações de logging
logging.level.org.springframework=INFO
logging.level.com.exemplo=DEBUG

```

application.yml: Usa uma sintaxe baseada em YAML, que é mais legível e permite hierarquia.

``` yml

# Configurações do servidor
server:
  port: 8080
  servlet:
    context-path: /api

# Configurações do banco de dados
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret

# Configurações de logging
logging:
  level:
    org.springframework: INFO
    com.exemplo: DEBUG

```

O Spring Boot carrega automaticamente os arquivos application.properties ou application.yml que estão no diretório src/main/resources. Ele também permite a sobreposição de configurações usando perfis de ambiente (que veremos no próximo tópico).

# O que é a anotação @Value?

A anotação @Value é usada para injetar valores de propriedades definidas em arquivos de configuração (como application.properties ou application.yml) diretamente em campos, métodos ou parâmetros de construtores em seus beans Spring.

## Como usar

Você pode usar @Value para injetar valores diretamente em campos ou métodos.

``` Java

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MeuComponente {

    @Value("${minha.propriedade}")
    private String minhaPropriedade;

    public void exibirPropriedade() {
        System.out.println("Valor da propriedade: " + minhaPropriedade);
    }

    @Value("${minha.propriedade}")
public void setMinhaPropriedade(String valor) {
    System.out.println("Valor injetado: " + valor);
}
}

```

No arquivo application.properties ou application.yml, você definiria:

``` yaml

minha:
  propriedade: Olá, mundo!

```

# O que é @ConfigurationProperties?

A anotação @ConfigurationProperties é usada para mapear propriedades de configuração (definidas em application.properties ou application.yml) para um objeto Java. Isso é especialmente útil quando você tem várias propriedades relacionadas que podem ser agrupadas em uma única classe.

- Organização: Útil para agrupar propriedades relacionadas em uma única classe.

- Validação: Permite a validação de propriedades usando Bean Validation (como @NotNull, @Size, etc.).

- Type Safety: As propriedades são mapeadas para tipos Java, o que reduz erros de digitação e facilita o uso.

## Como usar o @ConfigurationProperties?

Vamos supor que você tenha as seguintes propriedades no application.yml:

``` yml

app:
  nome: Minha Aplicação
  descricao: Uma aplicação Spring Boot
  versao: 1.0.0
  contato:
    email: suporte@exemplo.com
    telefone: 1234-5678

```

Crie uma classe Java que represente essas propriedades. Use a anotação @ConfigurationProperties para mapear as propriedades.

``` Java

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {

    private String nome;
    private String descricao;
    private String versao;
    private Contato contato;

    // Getters e Setters

    public static class Contato {
        private String email;
        private String telefone;

        // Getters e Setters
    }
}

```

# Perfis de Ambiente (@Profile)

Perfis de ambiente no Spring Boot permite que você defina configurações específicas para diferentes cenários. Por exemplo, você pode ter configurações diferentes para desenvolvimento, teste e produção, e ativar o perfil apropriado dependendo do ambinete em que a aplicação está sendo executada.

## Como funciona?

- Você pode definir perfis no arquivo application.properties ou application.yml usando a seguinte sintaxe:

**application-{perfil}.properties:** Crie arquivos separados para cada perfil, como application-dev.properties, application-test.properties, etc.

**application.yml:** Use a seção spring.profiles para definir configurações específicas de perfil.

- Você pode ativar um perfil de várias maneiras:

**Via linha de comando:** java -jar minha-aplicacao.jar --spring.profiles.active=dev

**Via variável de ambiente:** export SPRING_PROFILES_ACTIVE=dev

**No application.properties ou application.yml:** spring.profiles.active=dev

## Definindo perfis no application.yml

``` yml

# Configurações comuns a todos os perfis
app:
  nome: Minha Aplicação

---
# Perfil de Desenvolvimento
spring:
  profiles: dev
app:
  descricao: Ambiente de Desenvolvimento
  url: http://dev.exemplo.com

---
# Perfil de Produção
spring:
  profiles: prod
app:
  descricao: Ambiente de Produção
  url: http://prod.exemplo.com

```