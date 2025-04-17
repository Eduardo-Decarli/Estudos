import java.util.Scanner;
import java.math.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int q = sc.nextInt();
        int result = 0;

        for(int i = 0; i <= q; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            int n = sc.nextInt();

            for(int j = 0; j < n; j++) {
                result = (int) (a + Math.pow(2, j) * b);
                a = result;
                System.out.print(result + " ");
            }
        }
        sc.close();
    }
}
