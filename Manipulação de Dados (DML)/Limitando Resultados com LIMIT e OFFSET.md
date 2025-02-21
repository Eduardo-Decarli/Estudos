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