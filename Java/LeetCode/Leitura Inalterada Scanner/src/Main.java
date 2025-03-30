import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Locale.setDefault(Locale.US);

        Scanner sc = new Scanner(System.in);

        Integer inteiro = sc.nextInt();
        sc.nextLine();

        Double duplo = sc.nextDouble();
        sc.nextLine();

        String text = sc.nextLine();

        sc.close();

        System.out.printf("String: %s\n", text);
        System.out.printf("Double: %s\n", duplo);
        System.out.printf("Int: %s\n", inteiro);
    }
}