import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);
        int b = sc.nextInt();
        int h = sc.nextInt();

        if(!(b >= 0 && b <= 100)) {
            System.out.println("java.lang.Exception: Breadth and height must be positive");

        }
        else if(!(h >= 0 && h <= 100)) {
            System.out.println("java.lang.Exception: Breadth and height must be positive");

        } else {
            System.out.println(b * h);
        }
    }
}