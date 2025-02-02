# O que é Spring Boot?

O Spring Boot é um framework baseado no Spring Framework, projetado para facilitar o desenvolvimento de aplicações Java. Ele simplifica a configuração, reduz a necessidade de código boilerplate e ajuda os desenvolvedores a criarem aplicações prontas para produção rapidamente.

Suas principais caracteristicas são o fornecimento de um ambiente de desenvolvimento simplificado, o uso de convenção sobre configuração, inclui nativamente um servidor embutido (Tomcat, Jetty ou Undertow), suporta configurações baseada em propriedade (application.properties ou application.yml), gerencia dependências automaticamente com Spring Boot Starters e oferece integração fácil com bancos de dados, segurança e microsserviços.

## Vantagens do Spring Boot

- **Configuração mínima:** Reduz o numero de arquivos XML e configurações manuais, facilitando a inicialização do projeto.

-**Aplicação autossuficiente:** Possui servidores embutidos (Tomcat, Jetty, Undertow), eliminando a necessidade de configurar um servidor externo.

- **Desenvolvimento Rápido:** Usa convenção sobre configuração para que os desenvolvedores foquem na lógica de negócio.

- **Gerenciamento de dependências simplificado:** Com os Spring Starters, basta adicionar uma única dependência para ter tudo configurado.

- **Monitoramento e Métricas Embutidos:** O Spring Boot Actuator fornece métricas e informações sobre a aplicação de forma integrada.

- **Facilidade na Criação de Microsserviços:** O Spring Boot é amplamente utilizado para microsserviços, sendo compatível com Spring Cloud.

## Diferença entre Spring e Spring Boot

O Spring Boot é uma extensão do Spring Framework, mas com muitas facilidades para desenvolvimento. Vamos entender as principais diferenças entre eles.

### Spring Framework (Spring)

O Spring é um framework completo para o desenvolvimento de aplicações Java, fornecendo diversas funcionalidades como Inversão de Controle (IoC), Injeção de Dependências (DI), Programação Orientada a Aspector (AOP), entre outras

- Necessidade de configurações manuais (XML ou Java)
- Não possui servidor embutido
- Precisa de um arquivo web.xml para configurar a aplicação
- Requer o gerenciamento manual das dependências.

### Spring Boot

O Spring Boot é uma abstração do Spring Framework que reduz a configuração manual e agiliza o desenvolvimento de aplicações. Ele traz um conjunto de padrões e convenções para criar aplicações rapidamente, sem precisar configurar tudo do zero.

- Configuração minima pois dispensa o XML e usa configuração automática
- Vem com o Tomcat, Jetty ou Undertow prontos para rodar a aplicação
- Usa os Spring Boot Starters