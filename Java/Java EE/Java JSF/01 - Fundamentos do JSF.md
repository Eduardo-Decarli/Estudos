# O que é o JSF? Conceito, vantagens e ciclo de vida

📖 JSF (JavaServer Faces) é um framework oficial da especificação Java EE (agora Jakarta EE) para construir interfaces web baseadas em componentes reutilizáveis. Ele permite criar aplicações web com páginas dinâmicas, trabalhando com HTML + Java de forma integrada.

| 🟢 **Vantagem**                                | 💡 **Explicação**                                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| ✔️ Separação clara entre lógica e visual       | MVC: Java para lógica, XHTML para visual                                   |
| ✔️ Reutilização de componentes                 | Você cria ou usa componentes prontos (como `inputText`, `dataTable`, etc.) |
| ✔️ Integração com IDEs                         | Ferramentas como Eclipse ou IntelliJ facilitam o uso                       |
| ✔️ Suporte a internacionalização (i18n)        | Fácil de traduzir sistemas                                                 |
| ✔️ Validação e conversão automática            | Validadores prontos ou personalizados                                      |
| ✔️ Integração com CDI, JPA, PrimeFaces, Spring | Flexível e compatível com diversos padrões modernos                        |
| ✔️ Suporte oficial da Jakarta EE               | Atualizações e padronização da comunidade                                  |

## Ciclo de Vida do JSF

O ciclo de vida do JSF é o conjunto de etapas que ocorrem desde a requisição da página até a resposta para o navegador. Esse ciclo controla como os dados são processados e como os eventos são tratados.

| 🔢 Fase                  | 🧩 O que acontece?                                      |
| ------------------------ | ------------------------------------------------------- |
| 1️⃣ Restore View         | Cria ou restaura a árvore de componentes da página      |
| 2️⃣ Apply Request Values | Lê os dados do formulário enviado (ex: campos input)    |
| 3️⃣ Process Validations  | Valida os dados (ex: campo obrigatório, email, etc.)    |
| 4️⃣ Update Model Values  | Atribui os valores aos atributos dos beans              |
| 5️⃣ Invoke Application   | Executa ações (ex: métodos `action="#{bean.salvar}"`)   |
| 6️⃣ Render Response      | Renderiza a resposta HTML que será enviada ao navegador |

- Se ocorrer um erro de validação, o ciclo para e vai direto para **Render Response**.
- A árvore de componentes é uma estrutura em memória que representa a tela como objetos.

### Exemplo

Vamos supor que você tenha uma página **formulario.xhtml** com:

``` XHTML

<h:form>
  <h:inputText value="#{usuarioBean.nome}" required="true"/>
  <h:commandButton value="Salvar" action="#{usuarioBean.salvar}" />
</h:form>

```

O que acontece quando o usuário clica no botão?

1. O JSF restaura a view ou cria a árvore de componentes.
2. Ele pega o valor digitado no input (nome) e guarda no componente.
3. Ele valida se foi preenchido (required="true").
4. Se válido, atualiza o atributo nome no usuarioBean.
5. Chama o método salvar() do bean.
6. Renderiza novamente a página com resultado (ex: uma mensagem de sucesso).

# Configuração de ambiente:

- Maven
- Jakarta EE (TomEE, Payara ou WildFly)
- FacesServlet

# Estrutura básica de um projeto JSF

``` bash

meu-projeto-jsf/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── eduardo/
│       │           └── projeto/
│       │               ├── model/         <-- Entidades (opcional no começo)
│       │               ├── controller/    <-- ManagedBeans (backing beans)
│       │               └── dao/           <-- Persistência com JPA (opcional)
│       ├── resources/    <-- Arquivos estáticos como CSS, JS, imagens, mensagens
│       ├── webapp/
│       │   ├── pages/     <-- Páginas JSF (.xhtml)
│       │   ├── templates/ <-- Templates reutilizáveis
│       │   ├── index.xhtml
│       │   └── WEB-INF/
│       │       └── web.xml  <-- Configuração padrão do JSF
├── pom.xml                <-- Dependências Maven
└── README.md

```

# Navegação e mapeamento de páginas (faces-config.xml)

O arquivo **faces-config.xml** é o arquivo de configuração central do JSF.

Ele permite:

- Mapear fluxos de navegação entre páginas.
- Registrar beans, conversores, validadores.
- Definir configurações específicas do JSF.
- Criar regras declarativas que substituem o uso de **action="#{bean.metodo}"** quando necessário.

# Facelets (.xhtml) vs JSP

# Managed Beans (@ManagedBean, @RequestScoped, @SessionScoped)

# Binding com EL (Expression Language): #{bean.valor}

# Input/output de dados:

- h:inputText, h:outputText
- h:form, h:commandButton