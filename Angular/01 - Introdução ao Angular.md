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

# Principais conceitos e arquitetura: MVVM (Model-View-ViewModel)

# Como funciona o two-way data binding (dupla ligação de dados)

# Preparando o ambiente: instalação, CDN e estrutura básica do projeto