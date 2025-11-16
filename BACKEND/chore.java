package roommates;

// helper
// null 
// ??

public class Chore {
   private String description;
   private Roommate assignedTo;
   private boolean completed;
   private String date:  "00/00/00"

   //constructor
   public Chore(String description, Roommate assignedTo, String date){
       this.description = description;
       this.assignedTo = assignedTo;
       this.completed = false;
       this.date = date;
   }

   //helper
   private static boolean isValidDate(String date) {
        // Check length first
        if (date == null || date.length() != 8) return false;

        // Check slashes at positions 2 and 5
        if (date.charAt(2) != '/' || date.charAt(5) != '/') return false;

        // Check digits
        for (int i = 0; i < date.length(); i++) {
            if (i == 2 || i == 5) continue; // skip slashes
            if (!Character.isDigit(date.charAt(i))) return false;
    }

    return true; // all checks passed
}


   public Chore() {
   }

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
