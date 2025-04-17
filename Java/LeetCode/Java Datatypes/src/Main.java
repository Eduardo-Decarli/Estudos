import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();

        for(int i = 0; i <= t; i++) {
            try {
                long n = sc.nextLong();
                System.out.println(n + " can be fitted in:");
                if (n >= Math.pow(-2, 7) && n <= Math.pow(2, 7) - 1) System.out.println("* byte");
                if (n >= Math.pow(-2, 15) && n <= Math.pow(2, 15) - 1) System.out.println("* short");
                if (n >= Math.pow(-2, 31) && n <= Math.pow(2, 31) - 1) System.out.println("* int");
                if (n >= Math.pow(-2, 63) && n <= Math.pow(2, 63) - 1) System.out.println("* long");
            } catch (Exception e) {
                System.out.println(sc.next() + " can't be fitted anywhere.");
            }
        }
    }
}