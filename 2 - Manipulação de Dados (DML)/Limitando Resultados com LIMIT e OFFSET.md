# Limitação de Resultados com LIMIT e OFFSET

A cláusula LIMIT é usada para restringir o número de linhas retornadas em uma consulta SQL.
A cláusula OFFSET permite pular um número específico de linhas antes de começar a retornar os resultados.

- Paginar resultados (exibir 10 itens por página).

- Mostrar apenas os 5 produtos mais caros.

- Listar os 3 clientes mais novos.

Sua sintáxe é definida em duas formas

``` SQL

SELECT * FROM tabela LIMIT quantidade;

```

**Quantidade:** Número máximo de registros retornados.

``` SQL

SELECT * FROM tabela LIMIT quantidade OFFSET inicio;

```

**Inicio:** Número de registros a serem ignorados antes de começar a exibir os resultados.

## Usos do LIMIT e OFFSET

``` SQL

-- Selecionar apenas os 3 primeiros produtos

SELECT * FROM produtos LIMIT 3;


-- Pular os 2 primeiros e pegar os 3 seguintes

SELECT * FROM produtos LIMIT 3 OFFSET 2;


-- Paginação de Resultados (10 itens por página)

-- Pagina 1
SELECT * FROM produtos LIMIT 10 OFFSET 0;

--Pagina 2
SELECT * FROM produtos LIMIT 10 OFFSET 10;

```

## Boas Práticas

- Sempre usar **ORDER BY** com **LIMIT** para garantir que os registros sejam retornados na ordem esperada.

- Usar índices corretamente para evitar lentidão ao usar **OFFSET** em tabelas grandes.

- Fazer paginação eficiente para melhorar a performance em grandes volumes de dados.