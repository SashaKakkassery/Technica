package roommates;
import java.util.*;

public class ChoreDay {
   private String dayOfWeek;
   private ArrayList<Chore> chores;
   private User user;

   //constructor
   public ChoreDay(String dayOfWeek){
       this.dayOfWeek = dayOfWeek;
       this.chores = new ArrayList<>();
   }

   public ChoreDay() {}

   //methods
   public void addChore(Chore name){
       chores.add(name);
   }

   public ArrayList<Chore> getChores(){
       return chores;
   }

}

