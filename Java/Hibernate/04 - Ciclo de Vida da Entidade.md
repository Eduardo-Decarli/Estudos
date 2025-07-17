# Transient, Persistent e Detached

O hibernete gerencia as entidades de acordo com 4 ciclos de vida, onde cada etapa representa uma fase da entidade

1. NEW (Transient)
2. MANAGED (Persistent)
3. DETACHED
4. REMOVED

## Transient

Um objeto é Transient quando foi criado como entidade no java, porém ainda não foi atribuido a uma session do Hibernate e não existe no banco de dados

- Caracteristicas

    - Criado com **NEW**
    - Não possui ID
    - Se o programa terminar, não será salvo

``` Java

Usuario usuario = new Usuario("Maria", "maria@email.com"); // Transiente

```

## Persistent (Persistente ou Gerenciado)

O objeto é associado a uma sessão do hibernate (session.save, session.find, session.get ou session.persist), nesse momento as alterações feitas no objeto serão monitoradas pelo hibernate.

- Caracteristicas
    - Está vinculado a uma session
    - Tem um ID (se for gerado automaticamente)
    - Todas as alterações são monitoradas automaticamente
    - O hibernate atualiza o banco ao fazer **commit**

``` Java

Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

Usuario usuario = new Usuario("Maria", "maria@email.com"); // Transiente

session.save(usuario); // Agora é Persistent

usuario.setNome("Maria Silva"); // O Hibernate detecta isso

tx.commit(); // Hibernate executa UPDATE se necessário
session.close();

```

## Detached (Destacado)

# Como o Hibernate gerencia os estados da entidade