# Comandos Básicos do SQL

- SELECT - Extrai dados de um DB
- UPDATE - Atualiza dados em um banco de dados
- DELETE - Exclui dados de um Banco de dados
- INSERT INTO - Insere novos dados em um banco de dados.
- CREATE DATABASE - Cria um novo Banco de Dados.
- ALTER DATABASE - Modifica um banco de dados.
- CREATE TABLE - Cria uma nova tabela.
-ALTER TABLE - Modifica uma tabela.
- DROP TABLE - Apaga uma tabela.
- CREATE INDEX - Cria um índice (Chave de pesquisa).
- DROP INDEX - Exclui um índice.

## SELECT

A instrução é usada para selecionar dados de um banco de dados.

``` SQL

SELECT CustomerName, City FROM Customers;

```

### SELECT para todas as colunas

Esse comando retorna a coluna CustomerName e City na tabela Customers.

Para recuperar os dados de todas as tabelas, pode-se usar o '*' para simbolizar todas as colunas.

``` SQL

SELECT * FROM Customers

```

Retorna todas as colunas da tabela Customers.

### SELECT DISTINCT

Dentro de uma tabela, uma coluna geralmente contém muitos valores duplicados; e às vezes você só quer listar os valores diferentes (distintos).

``` SQL

SELECT DISTINCT Country FROM Customers;

```

Esse comando retorna todos os valores sem duplicatas.

### SELECT COUNT

Ao usar a palavra-chave **DISTINCT** em uma função chamada **COUNT**, podemos retornar o número de países diferentes.

``` SQL 

SELECT COUNT(DISTINCT Country) FROM Customres;

```

Retorna a quantidade de valores diferentes em uma coluna.

## WHERE

A cláusula **WHERE** é usada para filtrar registros.

Ele é usado para extrair apenas os registros que atendem a uma condição especificada.
