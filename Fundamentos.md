# SQL

## O que é o SQL?

SQL é uma linguagem padrão para armazenar, manipular e recuperar dados em bancos de dados. SQL significa Linguagem de Consulta Estruturada

### Modelo Relacional

- Tabela: Conjunto de registros organizados em linhas e colunas.

- Linha(Registro/Tupla): Uma entrada individual na tabela.

- Coluna(Campo/Atributo): Representa um atributo dos dados.

- Chave Primária (Primary Key): Identificador único para cada registro.

- Chave Estrangeira (Foreign Key): Campo que cria uma relação entre duas tabelas.

### O que o SQL pode fazer?

- Executar consultas em um banco de dados.

- Buscar/Inserir/Atualizar/Excluir registros de um banco de dados

- Criar novos DB

- Criar novas tabelas em um banco de dados.

- Criar procedimentos armazenados em um DB

- Criar visualizações em um banco de dados.

- Pode definir permissões em tabelas, procedimentos e visualizações.

## Tipos de banco de dados?

- Relacional: Organiza dados em tabelas, com linhas e colunas, onde cada coluna tem um tipo de dado definido. As tabelas podem se relacionar umas com as outras através de chaves primárias e chaves estrangeiras. Segue um esquema rígido, onde a estrutura (colunas e tipos de dados) deve ser definida antes de inserir os dados. Isso torna os dados mais consistentes.

- Não-Relacional(NoSQL): Não utiliza tabelas. Não é necessário um esquema rígido. Os dados podem ser armazenados de forma flexível, permitindo a inclusão de novos campos sem alterar a estrutura existente. Não usam SQL tradicional, e as linguagens de consulta variam dependendo do tipo de banco de dados. Podem ser otimizadas para grandes volumes de dados distribuídos. Os dados podem ser armazenados de várias formas, como: 

    - Documentos(MongoDB): Dados armazenados em formato JSON ou BSON.

    - Chave-Valor(Redis): Pares de chaves e valor.

    - Coluna Larga(Cassandra): Colunas flexíveis para armazenar dados.