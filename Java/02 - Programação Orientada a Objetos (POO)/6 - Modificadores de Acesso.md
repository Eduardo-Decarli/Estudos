# Modificador Static

O modificador static é usado para definir membros de classe (variáveis e métodos) que pertencem à classe em si, e não a instâncias individuais da classe. Isso significa que você pode acessar membros static sem criar um objeto da classe.

``` Java

public class Utilidade {
    // Variável estática
    public static int contador = 0;

    // Método estático
    public static void incrementarContador() {
        contador++;
    }
}

public class TesteStatic {
    public static void main(String[] args) {
        // Acessando variável e método estáticos sem instanciar a classe
        System.out.println("Contador inicial: " + Utilidade.contador);
        Utilidade.incrementarContador();
        System.out.println("Contador após incremento: " + Utilidade.contador);
    }
}

```

- Variável static: contador é compartilhado entre todas as instâncias da classe Utilidade.

- Método static: incrementarContador pode ser chamado sem criar uma instância de Utilidade.

# Modificador Final

O modificador final é usado para definir constantes, métodos que não podem ser sobrescritos e classes que não podem ser estendidas.

``` Java

public final class Constantes {
    // Constante
    public static final double PI = 3.14159;
}

public class ClasseBase {
    // Método final
    public final void metodoFinal() {
        System.out.println("Este método não pode ser sobrescrito.");
    }
}

public class Subclasse extends ClasseBase {
    // Tentativa de sobrescrever um método final resultará em erro de compilação
    // public void metodoFinal() {
    //     System.out.println("Tentativa de sobrescrever.");
    // }
}

```

- **Classe final:** Constantes não pode ser estendida por outras classes.

- **Variável final:** PI é uma constante e não pode ser alterada após a inicialização.

- **Método final:** metodoFinal não pode ser sobrescrito em subclasses.

# Modificador Abstract

O modificador abstract é usado para definir classes e métodos abstratos. Classes abstratas não podem ser instanciadas e métodos abstratos devem ser implementados por subclasses concretas.

``` Java

public abstract class Forma {
    // Método abstrato
    public abstract double calcularArea();

    // Método concreto
    public void mostrarTipo() {
        System.out.println("Esta é uma forma.");
    }
}

public class Circulo extends Forma {
    private double raio;

    public Circulo(double raio) {
        this.raio = raio;
    }

    @Override
    public double calcularArea() {
        return Math.PI * raio * raio;
    }
}

```

- **Classe abstract:** Forma não pode ser instanciada diretamente.

- **Método abstract:** calcularArea deve ser implementado por qualquer classe que estenda Forma.

# Resumo

- **static:** Usado para membros de classe que pertencem à classe em si, não a instâncias.

- **final:** Usado para definir constantes, métodos que não podem ser sobrescritos e classes que não podem ser estendidas.

- **abstract:** Usado para definir classes e métodos abstratos que devem ser implementados por subclasses.