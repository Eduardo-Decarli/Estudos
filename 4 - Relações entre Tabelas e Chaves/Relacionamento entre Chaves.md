# Chaves e Relacionamento

As chaves em bancos de dados relacionais são fundamentais para garantir a integridade e a consistência dos dados. Elas servem para:

- Identificar de forma única um registro em uma tabela (Chave Primária)

- Estabelecer relações entre diferentes tabelas (Chave Estrangeira)

Além disso, é importante garantir que os relacionamentos entre tabelas sejam definidos corretamente, para manter a integridade referencial.

## Conceitos Fundamentais

Chave Primária (PRIMARY KEY): A chave primária é uma coluna ou conjunto de colunas que identificam unicamente cada linha em uma tabela. Ela não pode ter valores nulos e deve ser única em todas as linhas

- Cada valor na chave primária deve ser único

- Não pode ser NULL

- Uma tabela pode ter apenas uma chave primária

``` SQL

CREATE TABLE produtos (
    id INT PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

```

Aqui, a coluna id é a chave primária e identifica de forma única cada produto.