# Manipulação de Dados (DML - Data Manipulation Language)

Vamos começar a estudar a manipulação de dados em quarrys SQL para termos um profundo entendimento sobre seus usos, limitações e serviços.

## SELECT - Consulta de Dados

O comando SELECT é a principal instrução do SQL para recuperar dados de um banco de dados. Ele permite visualizar informações armazenadas em tabelas, podendo ser combinado com filtros, ordenações e agregações para obter resultados específicos. Pode ser usado para:

- Buscar todos os clientes cadastrados no banco de dados.

- Listar os produtos com preços acima de R$ 100.

- Contar quantos pedidos foram feitos em um determinado período.

Agora vamos começar estudanod a sintáxe básica de uma consulta de **SELECT**

``` SQL

SELECT colunas FROM tabela;

```

**Colunas:** Define quais colunas serão exibidas no resultado (0u * para todas).

**Tabela**: Nome da tabela de onde os dados serão buscados. como por exemplo:

![Tabela de Cliente](Tabela_SELECT.png)

---

### Usos do SELECT

``` SQL

-- Selecionar todas as colunas de uma tabela

SELECT * FROM clientes;


-- Selecionar colunas específicas

SELECT nome, idade FROM clientes;


-- Renomear colunas no Resultado (AS)

SELECT nome AS "Nome do Cliente", idade AS "Idade" FROM clientes;


-- Contar quantos registros existem (COUNT)

SELECT COUNT(*) AS total_clientes FROM clientes;

```

Resultados:

![SELECT * FROM clientes;](Tabela_SELECT.png)

![SELECT nome, idade FROM clientes;](SELECT_nome_idade.png)

![SELECT COUNT(*) AS total_clientes FROM clientes;](total_clientes.png)

### Boas Práticas

- Especifique apenas as colunas necessárias (**SELECT nome, idade** ao invés de **SELECT ***).

- Use apelidos (**AS**) para tornar os resultados mais legíveis.

- Combine com filtros (**WHERE**) para evitar retornos desnecessários.

## INSERT - Inserção de Dados

O comando INSERT é utilizado para adicionar novos registros em uma tabela do banco de dados. Ele permite inserir valores manualmente ou a partir de outra consulta.

- Cadastrar um novo cliente em um sistema

- Adicionar um pedido na tabela de vendas

- Registrar um novo produto no estoque

Agora vamos entender sua Sintaxe básica

``` SQL

INSERT INTO tabela (coluna1, coluna2, ...) VALUES (valor1, valor2, ...);

```

**Tabela:** Nome da tabela onde os dados serão inseridos.

**coluna1, coluna2, ...:** As colunas onde os valores serão armazenados.

**valor1, valor2, ...:** Os valores que serão inseridos

### Usos do INSERT

``` SQL

-- Inserindo um único registro

INSERT INTO clientes (nome, idade, cidade)  
VALUES ('Carlos Mendes', 35, 'Belo Horizonte');


-- Inserindo vários registros de uma vez

INSERT INTO clientes (nome, idade, cidade)  
VALUES 
    ('Ana Pereira', 28, 'Porto Alegre'),  
    ('Ricardo Alves', 45, 'Salvador');


-- Inserindo um registro sem especificar todas as colunas

INSERT INTO clientes (nome, cidade)  
VALUES ('Fernanda Lima', 'Brasília');

```

### Boas Práticas

- Sempre listar as colunas explicitamente ao invés de **INSERT INTO clientes VALUES (...)**, para evitar erros caso a estrutura da tabela mude.

- Validar os dados antes da inserção para evitar valores inconsistentes.

- Usar transações **(BEGIN TRANSACTION)** quando precisar inserir vários registros e garantir consistência.