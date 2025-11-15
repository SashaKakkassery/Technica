package roommates;


public class Chore {
   private String description;
   private String assignedTo;
   private boolean completed;

   //constructor
   public Chore(String description, String assignedTo){
       this.description = description;
       this.assignedTo = assignedTo;
       this.completed = false;
   }

   public Chore() {}

   //getters
   public String getDescription(){
       return description;
   }

   public String getAssignedTo(){
       return assignedTo;
   }

   public boolean getIsCompleted(){
       return completed;
   }

   //mark complete
   public void markCompleted(){
       completed = true;
   }
}
