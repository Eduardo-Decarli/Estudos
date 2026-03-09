# O que é um banco de dados relacional?

Um banco de dados relacional é um banco que possui uma estrutura definida com tuplas(linhas) e colunas, onde cada linha representa um registro formado pelo alinhamento das células.

# O que é SQL

O SQL é uma linguagem de consulta, significa especificamente **Structured Query Language**, ela é subdividida em DDL (Data Structure Language), DML (Data Manipulation Language), DQL (Data Query Language) e DCL (Data Controll Language).

## DDL

Os comandos da linguagem de definição de dados (DDL) permitem que eu defina e gerencie um esquema em SQL. Um esquema em SQL é um projeto que define como os dados são organizados em um banco de dados e como são gerenciadas as relações entre as diferentes tabelas do banco de dados.

Os comandos DDL são de diferentes tipos e funcionalidades, com a finalidade de gerenciar o schema, eles são:

``` SQL

-- Crie uma tabela e suas colunas junto com seu tipo de dados.
CREATE 

-- Modifica a estrutura de tabelas no banco, permitindo adicionar, modificar ou excluir colunas
ALTER

-- Altera o nome da tabela
RENAME

-- Adiciona uma explicação ao código SQL
COMMENT

-- Remove dados de uma tabela sem excluir a tabela
TRUNCATE

-- Exclui a tabela com todos os dados
DROP

```