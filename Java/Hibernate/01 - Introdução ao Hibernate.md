# Conceitos Fundamentais

Antes de mergulharmos no Hibernate, precisamos dominar alguns conceitos importantes:

## O que é ORM? (Object-Relational Mapping)

ORM é uma tecnica de mapeamento de objetos em uma linguagem para objetos de um banco de dados, o hibernate é considerado uma ORM por automaitzar e facilitar esse processo, para que não seja necessária a criação manual de queries SQL desnecessárias ou repetitivas.

``` Java

// Classe Java
public class Pessoa {
    private Long id;
    private String nome;
}

```

Equivalente à: 

``` SQL

CREATE TABLE Pessoa (
    ID BIGINT PRIMARY KEY,
    NOME VARCHAR(255)
)

```

## JPA vs Hibernate

O JPA é uma especificação (Interface) de uso do Hibernate, já o Hibernate é uma implementação do próprio JPA

| Conceito        | JPA       | Hibernate                                 |
| --------------- | --------- | ----------------------------------------- |
| Natureza        | Interface | Implementação                             |
| Padrão          | Sim       | Não (mas compatível com JPA)              |
| Recursos extras | Não       | Sim (ex: Lazy Load tuning, filters, etc.) |

## Arquitetura do Hibernate (Session, SessionFactory, Transaction)

