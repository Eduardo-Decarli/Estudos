## O que é ORM? (Object-Relational Mapping)

ORM é uma tecnica de mapeamento de objetos em uma linguagem para objetos de um banco de dados, o hibernate é considerado uma ORM por automaitzar e facilitar esse processo, para que não seja necessária a criação manual de queries SQL desnecessárias ou repetitivas.

## JPA vs Hibernate

| Conceito        | JPA       | Hibernate                                 |
| --------------- | --------- | ----------------------------------------- |
| Natureza        | Interface | Implementação                             |
| Padrão          | Sim       | Não (mas compatível com JPA)              |
| Recursos extras | Não       | Sim (ex: Lazy Load tuning, filters, etc.) |

## Arquitetura do Hibernate (Session, SessionFactory, Transaction)

O hibernate segue uma arquitetura em camadas, e os principais componentes core para o funcionamento da ORM são: 

``` bash

Aplicação Java
     |
Session (interface principal de interação)
     |
SessionFactory (fábrica de sessões)
     |
ServiceRegistry + Configuration (configuração)
     |
Banco de Dados (via JDBC)

```

- **Session** -> Representa uma conexão com o banco de dados. É através dela que você faz **CRUD**, **HQL**, **transações**, etc...

``` Java

Session session = sessionFactory.openSession();

```

- **SessionFactory** -> É um singleton (objeto único) criado uma vez só durante o ciclo de vida da aplicação. Responsável por ler a configuração do hibernate, carregar os mapeamentos e produzir sessões (session) para interação com o banco de dados.

- **Transaction** -> Representa uma transação do banco de dados, usada para garantir atomicidade. Deve envolver operações críticas como **insert/update/delete**.