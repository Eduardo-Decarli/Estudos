# Problemas comuns: Deadlock, Starvation, Race Condition

Vamos explorar alguns problemas comuns que podem ocorrer em programação concorrente: deadlock, starvation e race condition. Esses problemas podem levar a comportamentos inesperados e devem ser evitados para garantir que os programas concorrentes funcionem corretamente.

## Deadlock

Deadlock ocorre quando duas ou mais threads ficam bloqueadas para sempre, esperando umas pelas outras liberarem recursos. Isso geralmente acontece quando múltiplas threads tentam adquirir bloqueios em diferentes ordens. Vamos para um exemplo:

``` Java

// Imagine duas threads, cada uma tentando adquirir dois bloqueios em ordens opostas

public class ExemploDeadlock {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void metodo1() {
        synchronized (lock1) {
            System.out.println("Thread 1: Segurando lock1...");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (lock2) {
                System.out.println("Thread 1: Segurando lock2...");
            }
        }
    }

    public void metodo2() {
        synchronized (lock2) {
            System.out.println("Thread 2: Segurando lock2...");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (lock1) {
                System.out.println("Thread 2: Segurando lock1...");
            }
        }
    }

    public static void main(String[] args) {
        ExemploDeadlock exemplo = new ExemploDeadlock();
        new Thread(exemplo::metodo1).start();
        new Thread(exemplo::metodo2).start();
    }
}

```

Neste exemplo, metodo1 e metodo2 podem entrar em deadlock, pois cada um segura um bloqueio e espera pelo outro.

## Starvation

Starvation ocorre quando uma thread é constantemente impedida de acessar os recursos necessários para progredir, geralmente porque outras threads monopolizam esses recursos.

Starvation pode ocorrer em um sistema com prioridade de thread, onde threads de baixa prioridade nunca têm a chance de executar porque threads de alta prioridade estão sempre sendo executadas.

## Race Condition

Race Condition ocorre quando o comportamento do programa depende da ordem ou do tempo de execução de threads. Isso pode levar a resultados inconsistentes ou incorretos.

``` Java

public class ExemploRaceCondition {
    private int contador = 0;

    public void incrementar() {
        contador++;
    }

    public static void main(String[] args) {
        ExemploRaceCondition exemplo = new ExemploRaceCondition();
        Runnable tarefa = () -> {
            for (int i = 0; i < 1000; i++) {
                exemplo.incrementar();
            }
        };

        Thread thread1 = new Thread(tarefa);
        Thread thread2 = new Thread(tarefa);

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Contador: " + exemplo.contador);
    }
}

```

Neste exemplo, o valor final de contador pode ser menor que o esperado (2000) devido a race conditions, já que múltiplas threads estão modificando contador simultaneamente sem sincronização.

## Conclusão

- Deadlock: Evite adquirindo bloqueios na mesma ordem em todas as threads.

- Starvation: Pode ser mitigado garantindo que todas as threads tenham acesso justo aos recursos.

- Race Condition: Pode ser evitado usando sincronização adequada para proteger o acesso a recursos compartilhados.

Esses problemas são comuns em programação concorrente, mas podem ser gerenciados com práticas adequadas de design e sincronização.