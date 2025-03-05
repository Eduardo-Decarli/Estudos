# Chaves e Relacionamento

As chaves em bancos de dados relacionais são fundamentais para garantir a integridade e a consistência dos dados. Elas servem para:

- Identificar de forma única um registro em uma tabela (Chave Primária)

- Estabelecer relações entre diferentes tabelas (Chave Estrangeira)

Além disso, é importante garantir que os relacionamentos entre tabelas sejam definidos corretamente, para manter a integridade referencial.

## Conceitos Fundamentais

**Chave Primária (PRIMARY KEY):** A chave primária é uma coluna ou conjunto de colunas que identificam unicamente cada linha em uma tabela. Ela não pode ter valores nulos e deve ser única em todas as linhas

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

**Chave Estrangeira:** A Chave Estrangeira é uma coluna ou um conjunto de colunas que é referência para a chave primária de outra tabela. Ela estabelece um relacionamento entre as tabelas.

- A chave estrangeira deve ter valores que correspondem a valores de chave primária de outra tabela.

- Garante a integridade referencial(a relação entre as tabelas é mantida).

``` SQL

-- Exemplo de chave estrangeira

CREATE TABLE pedidos(
    id INT PRIMARY KEY,
    produto_id INT, 
    date DATE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

```

Aqui, a coluna produto_id na tabela pedidos é uma chave estrangeira que faz referência à chave primária id da tabela produtos. Isso estabelece um relacionamento entre um pedido e um produto.

## Usos para as chaves

Vamos criar as tabelas clientes e pedidos com relacionamento entre elas.

``` SQL

CREATE TABLE clientes (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE pedidos (
    id INT PRIMARY KEY,
    cliente_id INT,
    valor DECIMAL(10,2),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- Inserir um cliente

INSERT INTO clientes(id, nome) VALUES (1, 'joao');


-- Inserir um Pedido

INSERT INTO pedidos(id, cliente_id, valor) VALUES (1, 1, 100.50);

```

- Na tabela clientes, a **chave primária** é a coluna id.

- Na tabela pedidos, a **chave estrangeira** é a coluna **cliente_id**, que faz referência à **chave primária** id da tabela clientes.

- o **cliente_id** no pedido 1 faz referência ao cliente com id = 1.