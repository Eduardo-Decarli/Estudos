# O que é o PrimeFaces?

PrimeFaces é uma biblioteca de componentes de interface gráfica (UI) para JSF (JavaServer Faces). Ele fornece um conjunto rico de componentes prontos e interativos, como botões, tabelas, painéis, calendários, gráficos, entre outros — tudo isso com suporte nativo a AJAX.

O PrimeFaces serve para facilitar a criação de interfaces web ricas e modernas em aplicações Java usando JSF. Ele abstrai muito do código complexo necessário para adicionar interações avançadas, permitindo que você foque mais na lógica da aplicação.

- Funciona por cima do JSF.
- Os componentes do PrimeFaces são tags XML que você usa nas páginas ***.xhtml***.
- A biblioteca traduz essas tags em **HTML**, **CSS** e **JavaScript** modernos no navegador.
- Tudo isso integrado com AJAX para comunicação assíncrona com o servidor.

| Vantagem                   | Descrição                                           |
| -------------------------- | --------------------------------------------------- |
| 🚀 Componentes prontos     | Mais de 100 componentes UI prontos para uso.        |
| 🎨 Temas                   | Suporte a temas com aparência profissional.         |
| ⚡ AJAX nativo             | Interações rápidas sem recarregar a página.         |
| 🔌 Integrações fáceis      | Funciona bem com **Spring**, **CDI**, **JPA**, etc. |
| 📱 Responsivo              | Muitos componentes funcionam bem em mobile.         |
| 🔄 Atualizações frequentes | Comunidade ativa e atualizações constantes.         |

### Exemplo simples de uso

``` XHTML

<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://xmlns.jcp.org/jsf/html"
      xmlns:p="http://primefaces.org/ui">
<h:head>
    <title>Exemplo PrimeFaces</title>
</h:head>
<h:body>
    <h:form>
        <p:outputLabel value="Nome:" for="nome" />
        <p:inputText id="nome" value="#{meuBean.nome}" />

        <p:commandButton value="Enviar" action="#{meuBean.enviar}" update="@form" />
        
        <p:messages />
    </h:form>
</h:body>
</html>

```

``` java

@ManagedBean
@ViewScoped
public class MeuBean {
    private String nome;

    public void enviar() {
        FacesContext.getCurrentInstance().addMessage(null,
            new FacesMessage("Olá, " + nome));
    }

    // Getters e setters
}

```

---

# PrimeFaces vs JSF puro

O JSF puro é uma tecnologia padrão da plataforma Java EE (agora Jakarta EE) para a construção de interfaces web baseadas em componentes.

- Padrão oficial Java EE.
- Suporte a navegação baseada em páginas (faces-config.xml ou anotações).
- Integração nativa com CDI, EJB, JPA.
- Suporte básico a componentes HTML (input, output, botão, formulário).
- Suporte a validação/conversão via JavaBeans.

- Poucos componentes prontos.
- Aparência básica (precisa de muito CSS e JavaScript manual).
- Pouco suporte a interatividade moderna (AJAX, responsividade, etc.).
- Requer bibliotecas adicionais para interfaces mais ricas.

O PrimeFaces é uma biblioteca que estende o JSF com componentes avançados, estilizados e com suporte AJAX nativo.

- Componentes prontos com aparência moderna.
- Suporte nativo a AJAX com pouco código.
- Mais de 100 componentes: tabelas com filtros, gráficos, modais, autocomplete, etc.
- Temas visuais e suporte a responsividade.
- Redução de tempo de desenvolvimento.
- Integração fluida com JSF, Spring, CDI, JPA

Vamos fazer uma comparação para entender melhor a diferença entre

| Característica            | JSF Puro                         | PrimeFaces                                         |
| ------------------------- | -------------------------------- | -------------------------------------------------- |
| Componentes visuais       | Básicos (input, output, botão)   | Avançados (tabelas, gráficos, modais, menus, etc.) |
| Suporte a AJAX            | Limitado e verboso               | Embutido nos componentes                           |
| Aparência visual          | Simples, precisa de customização | Profissional e moderna por padrão                  |
| Temas prontos             | Não                              | Sim (via ThemeSwitcher ou arquivos CSS)            |
| Produtividade             | Baixa a média                    | Alta                                               |
| Complexidade              | Média                            | Levemente maior no início, mas compensa            |
| Integração com frameworks | Sim (Java EE)                    | Sim (Spring, CDI, JPA, etc.)                       |


# Instalação e configuração básica no projeto (Maven ou manual)

Antes de tudo, é necessário que você já tenha um projeto Java Web com:

- JSF configurado (versão 2.2+ ou Jakarta Faces 3.x)
- Servidor compatível (Tomcat, Payara, WildFly, etc.)
- Maven configurado
- Um gerenciador de dependência como o pom.xml configurado

1.  Adicionar dependência do PrimeFaces: Acesse o arquivo pom.xml do seu projeto e adicione a dependência abaixo (versão atual em 2025 pode ser diferente; usaremos a 13.0.5 como exemplo):

``` XML

<dependency>
    <groupId>org.primefaces</groupId>
    <artifactId>primefaces</artifactId>
    <version>13.0.5</version>
</dependency>

```

2. Escolher e adicionar um tema (opcional, mas recomendado): Por padrão, o PrimeFaces tem um tema básico, mas você pode adicionar um tema visual com aparência profissional.

``` XML

<dependency>
    <groupId>org.primefaces.themes</groupId>
    <artifactId>nova-light</artifactId>
    <version>1.0.10</version>
</dependency>

```

3. Configurar seu **web.xml** (JSF 2.x): Se estiver usando JSF 2.x (Java EE), seu **web.xml** precisa conter as configurações básicas do JSF

``` XML

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="3.1">

  <context-param>
    <param-name>javax.faces.PROJECT_STAGE</param-name>
    <param-value>Development</param-value>
  </context-param>

  <servlet>
    <servlet-name>Faces Servlet</servlet-name>
    <servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
  </servlet>

  <servlet-mapping>
    <servlet-name>Faces Servlet</servlet-name>
    <url-pattern>*.xhtml</url-pattern>
  </servlet-mapping>

</web-app>

```

4. Criar uma página de teste: Crie uma página **index.xhtml** no diretório webapp com o seguinte conteúdo

``` XHTML

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://xmlns.jcp.org/jsf/html"
      xmlns:p="http://primefaces.org/ui">

<h:head>
    <title>Teste PrimeFaces</title>
</h:head>
<h:body>
    <h:form>
        <p:outputLabel for="nome" value="Digite seu nome:" />
        <p:inputText id="nome" value="#{meuBean.nome}" />
        <br/><br/>
        <p:commandButton value="Enviar" action="#{meuBean.enviar}" update="@form" />
        <p:messages />
    </h:form>
</h:body>
</html>

```

5. Criar o Bean gerenciado

``` java

import jakarta.faces.bean.ManagedBean;
import jakarta.faces.bean.ViewScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;

@ManagedBean
@ViewScoped
public class MeuBean {
    private String nome;

    public void enviar() {
        FacesContext.getCurrentInstance().addMessage(null,
            new FacesMessage("Olá, " + nome));
    }

    // Getter e Setter
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

```

# Estrutura de um projeto com PrimeFaces

Abaixo está a estrutura padrão de um projeto Java Web usando **JSF + PrimeFaces + Maven**. Essa organização segue boas práticas e é compatível com o uso de **JPA**, **CDI** ou **Spring**, caso você deseje expandir o projeto depois.

``` pgsql

meu-projeto/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── br/com/eduardo/
│       │       ├── bean/
│       │       │   └── MeuBean.java
│       │       ├── model/
│       │       │   └── Usuario.java
│       │       ├── repository/
│       │       │   └── UsuarioRepository.java
│       │       └── service/
│       │           └── UsuarioService.java
│       │
│       ├── resources/
│       │   └── META-INF/
│       │       └── persistence.xml (se usar JPA)
│       │
│       └── webapp/
│           ├── index.xhtml
│           ├── pages/
│           │   ├── usuario.xhtml
│           │   └── produto.xhtml
│           ├── templates/
│           │   ├── header.xhtml
│           │   └── footer.xhtml
│           ├── resources/
│           │   ├── css/
│           │   └── js/
│           └── WEB-INF/
│               └── web.xml
│
├── pom.xml

```

### src/main/java Contém as classes Java, divididas por camadas

| Pacote       | Função                                     |
| ------------ | ------------------------------------------ |
| `bean`       | Beans JSF (controladores ligados à view)   |
| `model`      | Entidades JPA (caso use banco de dados)    |
| `repository` | Classes de acesso a dados (DAO/JPA)        |
| `service`    | Regras de negócio (serviços reutilizáveis) |

### src/main/webapp Contém os arquivos da interface do usuário (UI):

| Pasta         | Conteúdo                                      |
| ------------- | --------------------------------------------- |
| `/pages/`     | Páginas internas organizadas (ex: CRUDs)      |
| `/templates/` | Arquivos reutilizáveis (header, footer, menu) |
| `/resources/` | Arquivos estáticos: CSS, JS, imagens          |
| `/WEB-INF/`   | Configurações JSF (web.xml, templates, etc.)  |

🚀 Dica extra: Templates com ui:composition
Você pode criar templates reutilizáveis usando <ui:insert> e <ui:define> para evitar repetição de código nas páginas.