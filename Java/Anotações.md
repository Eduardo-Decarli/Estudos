# Optionals

Um Optional é uma classe Java que permite facilitar o trabalho com objetos que podem ser nulos e evitar o ***NullPointerException***. Ele foi introduzido no Java 8 e possui diversas utilidades.

Um Optional é uma classe que contem um tipo genérico, que representa o dado que você quer utilizar, dentro do Optional, existem alguns métodos no quais podemos utilizar para facilitar o desenvolvimento desses objetos com possibilidade de serem nulos.

O objetivo do Optional é permitir o desenvolvimento de objetos null de forma estratégica e não como um acidente.

Criação de um Optional:

- Optional.of(valor) -> Use quando o null e lógicamente impossível de ocorrer

- Optional.ofNullable(valor) -> Use quando o valor pode ser null.

- Optional.empty() -> Declara explicitamente a ausencia de um valor, ou seja, retorna null.

Verificação

- isPresent() -> Verifica se um Optional contem ou não um valor != null;

- ifPresent() -> Executa uma ação caso exista um valor

- ifPresentOrElse(ação, alternativa) -> Realiza uma ação caso houver a presença e outra ação caso não houver a presença.

Acesso do Valor

- get() -> Retorna o valor contido dentro da variável, ele pode retornar null se for o caso

- orElse(valorPadrão) -> Retorna um valor padrão caso for null.

- orElseThrow() -> lança um exception caso o valor retorne null.

- orElseThrow(exceção) -> Retorna uma exception personalizada.

- Caso for utilizar o get(), faça uma verificação utilizando isPresent().
