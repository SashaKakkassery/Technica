package roommates;

public class Chore {
   private String description;
   private Roommate assignedTo;
   private boolean completed;

   //constructor
   public Chore(String description, Roommate assignedTo){
       this.description = description;
       this.assignedTo = assignedTo;
       this.completed = false;
   }

   public Chore() {}

   //getters
   public String getDescription(){
       return description;
   }

   public Roommate getAssignedTo(){
       return assignedTo;
   }

   public boolean isCompleted(){
       return completed;
   }

   //mark complete
   public void markCompleted(){
       completed = true;
   }
}
