import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String in1 = sc.nextLine();
        String in2 = sc.nextLine();
        String in3 = sc.nextLine();

        String[] spliter = in1.split(" ");
        String text1 = spliter[0];
        String numStr1 = spliter[1].length() < 3 ? "0" + spliter[1] : spliter[1];
        int num1 = Integer.parseInt(numStr1);


        spliter = in2.split(" ");
        String text2 = spliter[0];
        String numStr2 = spliter[1].length() < 3 ? "0" + spliter[1] : spliter[1];
        int num2 = Integer.parseInt(numStr2);

        spliter = in3.split(" ");
        String text3 = spliter[0];
        String numStr3 = spliter[1].length() < 3 ? "0" + spliter[1] : spliter[1];
        int num3 = Integer.parseInt(numStr3);

        System.out.println("================================");
        System.out.printf("%-14s %03d\n", text1, num1);
        System.out.printf("%-14s %03d\n", text2, num2);
        System.out.printf("%-14s %03d\n", text3, num3);
        System.out.println("================================");

    }
}