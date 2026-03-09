# Exceptions no Spring

O Spring lida com 3 mundos diferentes, e precisa lidar entre o java, Http e regras de negócio, para isso, o Spring produziu um sistema próprio para lidar com exceptions no ambiente. Onde ele capta as exceptions e automatiza as respostas de erro como respostas da API Rest.

- **Exception Checked:** Representa exceptions que são verificadas em tempo de compilação, são exceptions que precisam ser tratadas para compilar o projeto e necessitam de try-catch ou throws
- **Exception Unchecked:** São as RuntimeExceptions, são exceptions que a compilação não consegue identificar de antemão se terá ou não um erro, um exemplo seria, utilizar um valor consultado do banco, mas retornou ***null***, isso daria um erro runtime.
- **Error:** São erros que fecham o sistema devido algum problema específico

O java ele possui uma hierarquia bem definida de exceptions que são possíveis de serem tratadas, sendo uma superclasse geral chamada Throwable, e suas ramificações.

![hierarquia-exceptions](/Files/herarquia-exceptions-java.webp)

A superclasse Throwable oferece alguns métodos úteis para poder entender melhor os erros gerados: 

- printStackTrace(): Esse método retorna a pilha de errosencontrada em uma exceção.
- getMessage(): Retorna uma mensagem contendo o motivo do erro gerado.

No Java, ele disponibiliza um System.err, que permite imprimir erros no console com uma cor destaque (vermelho).