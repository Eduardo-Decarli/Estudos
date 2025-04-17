import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int i = 0;

        while(sc.hasNext()) {
            i++;
            String in = sc.nextLine();
            System.out.println(i + " " + in);
        }
    }
}