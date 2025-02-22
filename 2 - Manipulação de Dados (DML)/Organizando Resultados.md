# Ordenação de resultados com ORDER BY

A cláusula ORDER BY é usada para ordenar os resultados de uma consulta SQL de forma crescente (ASC) ou decrescente (DESC).

- Ordenar clientes por nome em ordem alfabética.

- Listar produtos do mais caro para o mais barato.

- Exibir os funcionários mais antigos primeiro.

Sua sintáxe é

``` SQL

SELECT * FROM tabela ORDER BY coluna [ASC | DESC];

```

Coluna: Define a coluna que será usada para ordenação.

ASC (Opcional): Ordena de forma crescente (padrão)

DESC: Ordena de forma decrescente

## Usos do ORDER BY

``` SQL

-- Ordenando por nome em ordem alfabética (ASC - Crescente)

SELECT * FROM clientes ORDER BY nome ASC;


-- Ordenando por idade do mais velho para o mais novo

SELECT * FROM clientes ORDER BY idade DESC;


-- Ordenando por múltiplas colunas

SELECT * FROM clientes ORDER BY cidade ASC, idade DESC;

```

## Boas práticas

- Definir a ordem explicitamente (**ASC** ou **DESC**) para evitar ambiguidades.

- Ordenar por colunas indexadas para melhorar a performance.

- Usar múltiplos critérios de ordenação para obter listas mais organizadas.