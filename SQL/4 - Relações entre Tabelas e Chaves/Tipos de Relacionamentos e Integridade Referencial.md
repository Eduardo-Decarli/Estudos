# Tipos de Relacionamento e Integridade Referencial

Aqui iremos ver sobre formas como as tabelas podem ser relacionadas

## Conceitos Fundamentais

**Relacionamentos:** 1:1, 1:N, N:N

**Relacionamento 1:1** -> Esse tipo de relacionamento ocorre quando uma linha de uma tabela está associada a no máximo uma linha de outra tabela.

``` SQL

CREATE TABLE enderecos (
    id INT PRIMARY KEY,
    cliente_id INT,
    rua VARCHAR(100),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

```

Aqui, cada **cliente_id** em **enderecos** está associado a um único cliente, e um cliente pode ter no máximo um endereço.

**Relacionamento 1:N** -> Esse relacionamento ocorre quando uma linha de uma tabela pode estar associada a várias linhas de outra tabela, mas cada linha da segunda tabela está associada a no máximo uma linha da primeira tabela.

``` SQL

CREATE TABLE produtos (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2)
);

CREATE TABLE cateforias (
    id INT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE produtos_categorias (
    produto_id INT,
    categoria_id INT,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

```

No relacionamento 1:N, um produto pode pertencer a várias categorias (na tabela **produtos_categorias**), mas uma categoria pode ter vários produtos.

**Relacionamento N:N** -> Esse tipo de relacionamento ocorre quando muitas linhas de uma tabela podem ser associadas a muitas linhas de outra tabela. para implementar esse relacionamento, geralmetne usamos uma tabela intermediária.

``` SQL

CREATE TABLE estudantes(
    id INT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE cursos(
    id INT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE estudantes_cursos (
    estudantes_id INT,
    cursos_id INT,
    FOREIGN KEY (estudantes_id) REFERENCES estudantes(id),
    FOREIGN KEY (cursos_id) REFEREnCES cursos(id)
);

```

Aqui, um estudante pode estar matriculado em vários cursos, e um curso pode ter vários estudantes matriculados.

# Integridade Referencial

A integridade referencial garante que os dados em um banco de dados relacional estão consistentes. Ela é mantida pelas chaves estrangeiras, que asseguram que as relações entre tabelas sejam válidas. Um exemplo de violação de integridade é tentar adicionar um pedido com um **cliente_id** que não existe na tabela **clientes**.

``` SQL

-- Inserir um pedido com um cliente que não existe
INSERT INTO pedidos (id, cliente_id, valor) VALUES (2, 999, 150.00);

```

Se o **cliente_id = 999** não existir na tabela clientes, o banco de dados retornará um erro, impedindo a violação de integridade referencial.

## Boas Práticas

- Defina corretamente as chaves primárias e estrangeiras para garantir a integridade dos dados.

- Use restrições de integridade como **NOT NULL** e **CHECK** para melhorar a qualidade dos dados.

- Em relacionamentos **N:N**, sempre crie uma tabela intermediária.