package roommates;
import java.util.*;

public class Day {
   private String dayOfWeek;
   private ArrayList<Chore> chores;
  
   public Day(String dayOfWeek){
       this.dayOfWeek = dayOfWeek;
       this.chores = new ArrayList<>();
   }

   public void addChore(Chore name){
       chores.add(c);
   }

   public ArrayList<Chore> getChores(){
       return chores;
   }

}

