# O que é AngularJS? História e diferenças do Angular moderno

O **AngularJS** é um framework de código aberto (OpenSource) criado em 2010 pela própria **Google**, com objetivo de facilitar a construção de sistemas dinâmicos no lado do cliente (Client-Side). O Angular permite a criação de sistemas web com comportamento dinâmico sem precisar regarregar a página e reconstruir a árvore do DOM a cada solicitação (Conceito de Modulação Web atraves de **Ajax**), assim permitindo a criação de Single Page Application (SPA). O Framework Angular trabalha atravez da arquitetura MVVM (Model-View-ViewModel), dessa forma separando a lógica frontend da visualização ao cliente.

O **Angular** foi lançado oficialmente em 2010 pelo time da **Google** e teve sua primeira versão (V0.1) em 2012. Foi um dos primeiros frameworks que popularizaram o desenvolvimento no estilo **SPA**, durante o tempo, recebeu features inovadoras, como Two-Way Data Binding (Dupla ligação de dados), injeção de dependências, diretivas e componentes. O Angular dominou o desenvolvimento Frontend, principalmente por facilitar o desenvolvimento de apps complexos feitos em JavaScript.

Após a data de 2016, a equipe da google decidiu refatorar a arquitetura do **AngularJS**, refatorando internamente seu estilo, assim criando uma arquitetura baseada em componente, tornando ele mais leve, fluido e fazendo uso de **TypeScript** e vez de JavaScript como era antigamente, por ser uma refatoração total e não-retrocompativel, decidiram mudar o nome do framework, transformando ele em apenas Angular (V2.0). 

## Principais Diferenças entre o AngularJS e o Angular

| Aspecto        | AngularJS (1.x)                            | Angular (2+ moderno)                           |
| -------------- | ------------------------------------------ | ---------------------------------------------- |
| Linguagem base | JavaScript puro (ES5)                      | TypeScript (superset de JavaScript)            |
| Arquitetura    | MVVM (Model-View-ViewModel)                | Componentes baseados em módulos                |
| Performance    | Digest cycle e watchers, menos eficiente   | Change Detection moderno, mais rápido          |
| Diretivas      | Diretivas muito usadas, mas mais complexas | Componentes como diretivas, mais simples       |
| Mobile Support | Limitado                                   | Otimizado para mobile e PWA                    |
| Ferramentas    | Debugging e testes menos integrados        | CLI oficial (Angular CLI), testes robustos     |
| Atualizações   | Estável, mas sem mais grandes evoluções    | Atualizações frequentes e melhorias constantes |
| Popularidade   | Em declínio, legado em projetos antigos    | Mais usado em projetos novos atualmente        |

- AngularJS é ótimo para entender conceitos básicos e históricos de frameworks SPA, e muitos sistemas legados ainda usam ele.
- Angular moderno é recomendado para projetos novos, porque tem melhor performance, suporte e estrutura moderna.
- Aprender AngularJS é útil para compreender fundamentos e manter sistemas antigos, mas vale considerar migrar para Angular moderno no futuro.

# Para que serve o Angular e quais suas vantagens

O Angular serve principalmente para criar interfaces de usuário complexas, interativas e reativas, funcionando direto no navegador (Client-Side), utilizando principalmente **TypeScript** - O typeScript é uma linguagem derivada do JavaScript com tipagem e recursos de validação adicionais que aumenta a robustez do código.

Com angular você pode: 

- Construir aplicações Web modernas e escaláveis
- Trabalhar com compontes reutilizaveis
- Gerenciar estado e dados da aplicação de forma organizada
- Realizar consumo de APIs e fazer integração entre Backend e Frontend mais facilmente
- Criar rotas para navegar no sistema sem fazer a recarga da página
- Testar seu código com ferramentas integradas

Agora que entendemos o que é o Angular, vamos estudar suas vantagens e o que diferencia ele dos demais frameworks frontend.

1. **Baseado em Componentes** -> O Angular é estruturado para renderizar as páginas com base em componentes, permitindo o usuário criar botões, formulários e demais estruturas e fazer uma integração onde separa o componente de forma organizada do resto do código. Isso ajuda na organização, reutilização e manutenção dos sistemas.

2. **TypeScript por padrão** -> O Angular é escrito atualmente em TypeScript, que é uma versão do JavaScript com tipagem estática, classes, interfaces e outras funcionalidades, isso serve para deixar o JavaScript mais robusto, seguro, previsível e facil de entender, alem disso o editor consegue ajudar melhor com autocompletes e detecção de erros antecipadamente.

3. **CLI Oficial Poderoso** -> O Angular CLI é uma ferramenta oficial e poderosa criada para facilitar a construção de projetos, ela permite desenvolver, testar e construir projetos Angular. Com poucos comandos, você pode gerar build, fazer testes, criar componentes, serviços, módulos e mais. Isso agiliza muito o desenvolvimento e padroniza o projeto. 

4. **Data Binding Bidirecional** -> Angular suporta Two-Way Data binding, ou seja, ele possui uma sincronidade entre o código do modelo (lógica) e a interface do usuário. Se o usuário muda algo na interface, o modelo é atualizado e vice-versa, sem necessidade de código extra para sincronizar.

5. **Injeção de Dependências** -> Angular possui um sistema robusto de injeção de dependências que facilita a gestão de serviços e objetos usados. Isso garante baixo acoplamento e alta testabilidade, tornando o código mais modular e escalável.

6. **Ferramentas de Testes Integradas** -> Angular possui uma ferramenta de testes integrada de forma nativa, permitindo fazer testes unitários e testes end-to-end.

7. **Rotas e Navegação** -> Angular possui um forte sistema de roteamento, que permite criar multiplas páginas virtuais dentro da SPA, com parâmetros, rotas filhas, proteções (guards) e lazy loading (Carregamento sobe Demanda).

8. **Cross-Plataform** -> Embora o Angular seja principalmente para sistemas web, ele pode ser utilizado para criar aplicativos mobile com ionic e para desktop com eletron, isso torna o desenvolvimento mais flexível, permitindo desenvolvimer para multiplas plataformas com a mesma base.

# Diferenças principais para frameworks concorrentes (React, Vue)

O React, Vue e Angular são os três frameworks mais utilizados para o desenvolvimento web. Vamos abordar suas caracteristicas e funcionalidades e entender melhor sobre como cada ferramenta se sobressai.

| Característica             | Angular                               | React                        | Vue                         |
| -------------------------- | ------------------------------------- | ---------------------------- | --------------------------- |
| Criado por                 | Google                                | Meta (Facebook)              | Evan You (ex-Google)        |
| Tipo                       | **Framework completo**                | **Biblioteca UI**            | **Framework progressivo**   |
| Linguagem base             | TypeScript                            | JavaScript (JSX)             | JavaScript (com opção TS)   |
| Arquitetura                | MVC / Componentes / DI                | Apenas componentes           | Componentes reativos        |
| Complexidade               | Alta curva de aprendizado             | Média                        | Mais simples de começar     |
| Gerenciamento de estado    | RxJS, NgRx, serviços                  | Context API, Redux, MobX     | Vuex, Pinia                 |
| CLI oficial                | Sim (Angular CLI)                     | Sim (Create React App, Vite) | Sim (Vue CLI, Vite)         |
| Renderização               | Client-side & SSR (Angular Universal) | Client-side & SSR (Next.js)  | Client-side & SSR (Nuxt.js) |
| Adoção em grandes empresas | Muito alto                            | Muito alto                   | Crescendo bastante          |

Para entender melhor as suas diferenças, vamos abordar os tópicos que mais se destacam.

### Framework vs Biblioteca 

- Angular é um framework completo, isso significa que ele está pronto para a maior parte dos cenários possíveis durante a contrução de uma aplicação: roteament,o formulários, injeção de dependência, HTTP, testes e muito mais.

- React é uma Biblioteca, que apenas oferece recursos de renderização de componentes em tela, caso queira fazer uso de serviços como rotas ou fomulários, seria necessário outras bibliotecas.

- Vue é chamado de Framework progressivo, porque começa simples como uma biblioteca como o React, mas pode ser extendido através de outras bibliotecas oficiais do Vue a ponto de se tornar um framework completo.

### Sintáxe e Linguagem

- Angular usa TypeScript, que é mais verboso, mas oferece tipagem, POO e segurança.

- React faz uso de JavaScript JSX (JavaScript XML), misturando HTML e JS em um único arquivo.

- Vue usa HTML + JS + CSS separados num único arquivo .vue, mas de forma mais limpa e intuitiva para iniciantes.

### Curva de aprendizado

- Angular necessita de uma grande curva de aprendizado para dominar, isso exige que entenda conceitos avançados como: módulos, decorators, DI, observables (RxJS), serviços, etc...

- React tem uma curva de aprendizado mais suave no inicio, mas conforme um projeto cresce, necessita de mais entendimento e noções.

- Vue tem a curva mais suave, ideal para quem está começando no mundo de framewroks modernos.

