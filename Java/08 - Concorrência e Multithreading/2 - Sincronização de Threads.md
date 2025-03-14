# Sincronização de Threads (Synchronized, Lock, ReentrantLock)

A sincronização de threads é um conceito importante em programação concorrente, especialmente quando múltiplas threads acessam recursos compartilhados. Vamos explorar os principais mecanismos de sincronização em Java: **synchronized**, **Lock** e **ReentrantLock**.

## Synchronized

O modificador synchronized é a maneira mais simples de garantir que apenas uma thread acesse um bloco de código ou método ao mesmo tempo. Ele pode ser usado para sincronizar métodos ou blocos de código.

- Sincronização de Métodos: Quando um método é declarado como synchronized, a thread que o executa adquire o bloqueio (lock) do objeto antes de entrar no método e libera o bloqueio ao sair.

``` Java

public class Contador {
    private int count = 0;

    public synchronized void incrementar() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

```

## Sincronização de Blocos

Você também pode sincronizar blocos de código dentro de um método, especificando o objeto cujo bloqueio deve ser adquirido.

``` Java

public class Contador {
    private int count = 0;

    public void incrementar() {
        synchronized (this) {
            count++;
        }
    }
}

```

## Lock

A interface Lock fornece um controle de bloqueio mais flexível do que o synchronized. Ela permite tentar adquirir o bloqueio, adquirir o bloqueio de forma interruptível, e tentar adquirir o bloqueio com um tempo limite.

``` Java

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Contador {
    private int count = 0;
    private final Lock lock = new ReentrantLock();

    public void incrementar() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}

```

- **ReentrantLock:**  **ReentrantLock** é uma implementação da interface Lock que oferece as mesmas funcionalidades básicas de **synchronized**, mas com características adicionais, como:

    - **Reentrância:** Uma thread pode adquirir o mesmo bloqueio várias vezes sem se bloquear.
    - **Tentativa de bloqueio com tempo limite:** Permite tentar adquirir o bloqueio por um tempo específico.
    - **Bloqueio interruptível:** Permite que a thread seja interrompida enquanto espera pelo bloqueio.

``` Java

import java.util.concurrent.locks.ReentrantLock;

public class Contador {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void incrementar() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}

```

## Conclusão

**synchronized:** Simples de usar, mas menos flexível. Adequado para a maioria dos casos de uso simples.

**Lock e ReentrantLock:** Oferecem mais controle e flexibilidade, especialmente em situações complexas onde você precisa de funcionalidades adicionais, como bloqueio com tempo limite ou bloqueio interruptível.

Escolher entre synchronized e Lock depende das necessidades específicas do seu aplicativo. Para casos simples, synchronized geralmente é suficiente. Para casos mais complexos, Lock e ReentrantLock oferecem mais opções.