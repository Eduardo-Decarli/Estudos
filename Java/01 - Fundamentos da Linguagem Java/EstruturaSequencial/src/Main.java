import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Calculadora de Média ===");

        System.out.print("Nome do aluno: ");
        String nome = scanner.nextLine();

        System.out.print("Primeira nota: ");
        double nota1 = scanner.nextDouble();

        System.out.print("Segunda nota: ");
        double nota2 = scanner.nextDouble();

        double media = (nota1 + nota2) / 2;

        System.out.println();
        System.out.println("Aluno: " + nome);
        System.out.println("Média: " + media);

        scanner.close();
    }
}