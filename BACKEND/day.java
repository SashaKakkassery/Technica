package roommates;
import java.util.*;

public class Day {
   private String dayOfWeek;
   private ArrayList<Chore> chores;

   //constructor
   public Day(String dayOfWeek){
       this.dayOfWeek = dayOfWeek;
       this.chores = new ArrayList<>();
   }

   public Day() {}

   //methods
   public void addChore(Chore name){
       chores.add(name);
   }

   public ArrayList<Chore> getChores(){
       return chores;
   }

}

