# Criando e Gerenciando Threads(Thread, Runnable)

Uma Thread é uma unidade de execução dentro de um programa. Em Java, podemos usar múltiplas threads para executar tarefas simultaneamente, aproveitando melhor o processamento do computador.

**processo:** Um programa em execução

**Thread:** Uma linha de execução dentro de um processo. Um processo pode ter várias threads rodando ao mesmo tempo.

Imagine um aplicativo de música. Ele pode tocar música (Thread 1) enquanto baixa uma nova playlist (Thread 2) e responde a cliques do usuário (Thread 3), tudo ao mesmo tempo.

Para criar uma thread em Java, temos duas formas principais de se fazer:

1. Estendendo a classe **Thread**
2. Implementando a interface **Runnable**

## Usando a Classe Thread

Podemos criar uma thread estendendo a classe Thread e sobrescrevendo o método run().

``` Java

class MinhaThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Executando Thread: " + i);
            try {
                Thread.sleep(1000); // Faz a thread "dormir" por 1 segundo
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class TesteThread {
    public static void main(String[] args) {
        MinhaThread thread1 = new MinhaThread(); // Criando a thread
        thread1.start(); // Iniciando a thread

        System.out.println("Thread principal continua executando...");
    }
}

```

- **MinhaThread extends Thread** → Criamos uma thread personalizada.
- **run()** → Define o código que será executado na thread.
- **start()** → Inicia a execução da thread.
- **Thread.sleep(1000)** → Pausa a execução por 1 segundo (simulando uma operação demorada).

## Usando a Interface Runnable

A abordagem preferida para criar threads em Java é implementar a interface Runnable, pois permite que a classe estenda outra classe, se necessário.

``` Java

class MinhaRunnable implements Runnable {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Executando Runnable: " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class TesteRunnable {
    public static void main(String[] args) {
        Thread thread2 = new Thread(new MinhaRunnable()); // Criando a thread via Runnable
        thread2.start(); // Iniciando a thread

        System.out.println("Thread principal continua executando...");
    }
}

```

- **MinhaRunnable implements Runnable** → Criamos uma classe que implementa Runnable.
- **Thread thread2 = new Thread(new MinhaRunnable())** → Criamos um objeto Thread, passando a classe MinhaRunnable.
- **start()** → Inicia a thread.

| **Método**           | **Vantagem**                                          | **Desvantagem**                  |
|----------------------|-------------------------------------------------------|----------------------------------|
| Extender Thread      | Simples de implementar                                | Não pode estender outra classe   |
| Implementar Runnable | Permite herança múltipla (pode estender outra classe) | Requer instância extra de Thread |

## Trabalhando com Múltiplas Threads

Podemos rodar várias threads ao mesmo tempo para executar diferentes tarefas.

``` Java

class Tarefa implements Runnable {
    private String nome;

    public Tarefa(String nome) {
        this.nome = nome;
    }

    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(nome + " está executando passo " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class MultiplasThreads {
    public static void main(String[] args) {
        Thread t1 = new Thread(new Tarefa("Thread 1"));
        Thread t2 = new Thread(new Tarefa("Thread 2"));
        Thread t3 = new Thread(new Tarefa("Thread 3"));

        t1.start();
        t2.start();
        t3.start();

        System.out.println("Threads iniciadas...");
    }
}

```

- Criamos 3 threads diferentes (t1, t2, t3) que executam independentemente.
- Cada thread exibe mensagens alternadamente, simulando a execução paralela.

## Métodos Importantes para Gerenciamento de Threads

- **join() - Esperar uma Thread terminar:** Podemos forçar a Thread principal a esperar outra thread terminar antes de continuar.

``` Java

class TarefaComJoin implements Runnable {
    public void run() {
        System.out.println("Tarefa iniciada...");
        try {
            Thread.sleep(3000); // Simula um processo demorado
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Tarefa finalizada.");
    }
}

public class ExemploJoin {
    public static void main(String[] args) {
        Thread tarefa = new Thread(new TarefaComJoin());
        tarefa.start();

        try {
            tarefa.join(); // Aguarda essa thread finalizar antes de continuar
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Thread principal continua após a thread terminar.");
    }
}

```

**tarefa.join();** → Faz a Thread principal esperar a execução da tarefa antes de continuar.

-  **setPriority() - Ajustar Prioridade da Thread:** Cada thread tem uma prioridade (1 a 10), sendo 10 a mais alta.

``` Java

Thread threadAlta = new Thread(new MinhaRunnable());
threadAlta.setPriority(Thread.MAX_PRIORITY); // Prioridade máxima (10)

Thread threadBaixa = new Thread(new MinhaRunnable());
threadBaixa.setPriority(Thread.MIN_PRIORITY); // Prioridade mínima (1)


```

- **isAlive() - Verificar se a Thread ainda está rodando:** Podemos verificar se uma thread ainda está em execução.

``` Java

if (minhaThread.isAlive()) {
    System.out.println("A thread ainda está rodando.");
}
