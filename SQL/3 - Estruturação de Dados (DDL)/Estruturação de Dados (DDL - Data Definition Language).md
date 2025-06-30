# Estruturação de Dados (DDL - Data Definition Language)

A **DDL** é uma sublinguagem do SQL usada para definir e modificar a estrutura do banco de dados. Ao contrário de comandos como **SELECT**, **INSERT**, **UPDATE** e **DELETE**, que manipulam dados, a **DDL** se concentra na criação, alteração e remoção de objetos no banco, como tabelas e índices. Ela inclui comandos como **CREATE**, **ALTER**, **DROP**, **TRUNCATE** e outros.

## Conceitos imporantes

- Banco de Dados: É um conjunto organizado de dados, armazenados e acessados eletronicamente. Pode conter várias tabelas, esquemas, views, procedimentos armazenados, índices etc.

- Schema: É uma estrutura lógica dentro de um banco de dados que agrupa objetos relacionados, como tabelas, views, funções etc. Serve para organizar e separar os dados dentro de um mesmo banco.

- Index: É uma estrutura de dados usada para acelerar as buscas em tabelas. Funciona como um índice de livro: em vez de procurar linha por linha, o banco consulta o índice e vai direto ao ponto.

## Entendendo os comandos

- **CREATE**  
    Criação de Objetos

``` SQL

-- CREATE: Cria um novo banco de dados chamado empresa

CREATE DATABASE empresa;

-- CREATE SCHEMA: Cria um esquema chamado administrativo.

CREATE SCHEMA administrativo;

-- CREATE TABLE: Cria uma tabela chamada Funcionários

CREATE TABLE funcionarios (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    data_admissao DATE
);

-- CREATE TABLE (com Restrições): Cria uma tabela com campos obrigatórios, regras para validar valores, valor padrão e chave estrangeira

CREATE TABLE produtos (
    id INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) CHECK (preco > 0),
    estoque INT DEFAULT 0,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- CREATE INDEX: Cria um índice para acelerar buscas pelo nome

CREATE INDEX idx_nome ON funcionarios(nome);

```