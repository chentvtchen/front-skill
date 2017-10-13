//判断一个整数是否是回文数
public Solution{
	public boolean isPalindrome(int x){
		if(x<0){
			return false;
		}
		int sum = 0;
		int temp = x;
		while(x>0){
			sum = sum*10 + x%10;
			x /= 10;
		}
		if(temp == sum){
			return true;
		}else{
			return false;
		}
	}
}

 /*.....
小易准备去魔法王国采购魔法神器,购买魔法神器需要使用魔法币,但是小易现在一枚魔法币都没有,但是小易有两台魔法机器可以通过投入x(x可以为0)个魔法币产生更多的魔法币。
魔法机器1:如果投入x个魔法币,魔法机器会将其变为2x+1个魔法币
魔法机器2:如果投入x个魔法币,魔法机器会将其变为2x+2个魔法币
小易采购魔法神器总共需要n个魔法币,所以小易只能通过两台魔法机器产生恰好n个魔法币,小易需要你帮他设计一个投入方案使他最后恰好拥有n个魔法币。 
...*/
import java.util.Scanner;
public class Main{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		while(in.hasNext()){
			int coinCount = in.nextInt();
			StringBuilder sb = new StringBuilder();
			while(coinCount > 0){
				if(coinCount%2 == 0){
					//偶数
					coinCount = (coinCount-2)/2;
					sb.append("2");
				}else{
					//奇数
					coinCount = (coinCount - 1)/2;
					sb.append("1");
				}
			}
			System.out.println(sb.reverse());
		}
	}
}
 /*.....
 为了得到一个数的"相反数",我们将这个数的数字顺序颠倒,然后再加上原先的数得到"相反数"。
 例如,为了得到1325的"相反数",首先我们将该数的数字顺序颠倒,我们得到5231,之后再加上原先的数,我们得到5231+1325=6556.
 如果颠倒之后的数字有前缀零,前缀零将会被忽略。例如n = 100, 颠倒之后是1. 
...*/
import java.util.Scanner;
public class Main{
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		String s = in.next();
		StringBuilder sbr = new StringBuilder(s).reverse();
		System.out.println(Integer.parseInt(sbr.toString())+Integer.parseInt(s));

	}
}