# Executors e Thread Pools (ExecutorService, ScheduledExecutorService)

Os Executors fornecem uma maneira de gerenciar pools de threads, permitindo que você execute tarefas de forma assíncrona. Um Thread Pool é um conjunto de threads reutilizáveis que podem ser usados para executar várias tarefas.

## ExecutorService

ExecutorService é uma interface que representa um serviço executor que pode gerenciar e controlar a execução de tarefas assíncronas. Ele fornece métodos para enviar tarefas para execução e para gerenciar o ciclo de vida do executor.

- Criando um ExecutorService: Você pode criar um ExecutorService usando a classe Executors, que fornece métodos de fábrica para criar diferentes tipos de pools de threads.

``` Java

// Fixed Thread Pool: Um pool com um número fixo de threads.

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExemploFixedThreadPool {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 5; i++) {
            int taskNumber = i;
            executor.submit(() -> {
                System.out.println("Executando tarefa " + taskNumber);
            });
        }

        executor.shutdown();
    }
}

// Cached Thread Pool: Um pool que cria novas threads conforme necessário e reutiliza threads ociosas.

ExecutorService executor = Executors.newCachedThreadPool();

```

## ScheduledExecutorService

ScheduledExecutorService é uma subinterface de ExecutorService que pode agendar a execução de tarefas após um atraso ou em intervalos regulares.

- Criando um ScheduledExecutorService: Você pode criar um **ScheduledExecutorService** usando o método **newScheduledThreadPool** da classe **Executors**.

``` Java

// Agendamento de Tarefas

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ExemploScheduledExecutor {
    public static void main(String[] args) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        // Agendar uma tarefa para ser executada após 3 segundos
        scheduler.schedule(() -> {
            System.out.println("Tarefa agendada executada");
        }, 3, TimeUnit.SECONDS);

        // Agendar uma tarefa para ser executada a cada 2 segundos
        scheduler.scheduleAtFixedRate(() -> {
            System.out.println("Tarefa periódica executada");
        }, 0, 2, TimeUnit.SECONDS);

        // Para parar o executor após algum tempo
        scheduler.schedule(() -> {
            scheduler.shutdown();
        }, 10, TimeUnit.SECONDS);
    }
}

```

## Conclusão

- **ExecutorService:** Facilita a execução de tarefas assíncronas, gerenciando automaticamente a criação e reutilização de threads.

- **ScheduledExecutorService:** Permite agendar tarefas para execução futura ou repetida, útil para tarefas que precisam ser executadas periodicamente.

Esses serviços ajudam a melhorar o desempenho e a escalabilidade de aplicativos multithread, evitando a sobrecarga de criar e destruir threads manualmente.