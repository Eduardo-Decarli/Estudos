# Estruturação de Dados (DDL - Data Definition Language)

A DDL é uma sublinguagem do SQL usada para definir e modificar a estrutura do banco de dados. Ao contrário de comandos como SELECT, INSERT, UPDATE e DELETE, que manipulam dados, a DDL se concentra na criação, alteração e remoção de objetos no banco, como tabelas e índices. Ela inclui comandos como CREATE, ALTER, DROP, TRUNCATE e outros.

Os comandos mais utilizados para o DDL são: 

- **CREATE TABLE:** Cria uma nova tabela no banco de dados.

- **ALTER TABLE:** Modifica a estrutura de uma tabela existente (Por exemplo, adiciona ou remove colunas)

- **DROP TABLE:** Exclui uma tabela do banco de dados

- **TRUNCATE TABLE:** Limpa todos os dados de uma tabela, mas mantém a estrutura

## Entendendo os comandos

Agora vamos ver um pouco sobre os comandos, entender o que fazem e como utilizar eles na prática

### CREATE TABLE - Criar tabelas

O comando **CREATE TABLE** é usado para criar novas tabelas, definindo suas colunas, tipos de dados e restrções (como chaves primárias).

``` SQL

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_adicao DATE DEFAULT CORRENT_DATE 
);

```

- **id:** campo inteiro, chave primária, valor auto incrementado.

- **nome:** campo de texto com no máximo 100 caracteres.

- **preco:** campo decimal com 2 casas após a vírgula.

- **data_adicao:** campo de data com valor padrão como a data atual.

### ALTER TABLE - Modificar tabelas

O comando ALTER TABLE é utilizado para adicionar, modificar ou excluir colunas em uma tabela já existente.

``` SQL

-- Adicionando uma nova coluna na tabela de produtos

ALTER TABLE produtos 
ADD COLUMN descricao TEXT;


-- Modificando uma coluna

ALTER TABLE produtos MODIFY COLUMN preco DECIMAL(12,2);


-- Excluindo uma coluna 

ALTER TABLE produtos DROP COLUMN descricao;

```

### DROP TABLE - Excluir tabelas

O comando DROP TABLE é utilizado para excluir permanentemente uma tabela do banco de dados, incluindo todos os seus dados.

``` SQL

-- Excluindo a tabela de produtos
-- Cuidado: Ao usar DROP TABLE, todos os dados da tabela são perdidos permanentemente.

DROP TABLE produtos;

```

### TRUNCATE TABLE - Limpar dados de uma tabela

O comando TRUNCATE TABLE remove todos os registros de uma tabela, mas mantém a estrutura da tabela.

``` SQL

-- Limpando todos os dados da tabela de produtos

TRUNCATE TABLE produtos;

```

Diferente de DELETE: TRUNCATE não pode ser revertido e é mais rápido que o DELETE para grandes volumes de dados, pois não grava o log de cada linha removida.

# Tipos de dados


