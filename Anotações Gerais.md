# Hibernate

- @Transient -> Propriedade anotada será ignorada pelo mapeamento do hibernate.

- @Convert -> Irá especificar uma classe para uma conversão personalizada, a classe de personalização precisa implementar a classe **AttributeConverter\<entrada-no-banco, saida-do-banco\>**

- Cascade -> Define como as relações serão tratadas

    - PERSIST → quando salva o pai, também salva o filho.
    - MERGE → quando atualiza/merge o pai, também merge o filho.
    - REMOVE → quando remove o pai, também remove os filhos (cuidado com deleção em cascata 🚨).
    - REFRESH → quando recarrega o pai do banco, também recarrega os filhos.
    - DETACH → quando o pai sai do contexto de persistência, os filhos também saem.
    - ALL → inclui todos os acima.