package roommates;

import java.time.LocalTime;
import java.util.ArrayList;

public class Roommate extends User {

    private ArrayList<Chore> assignedChores = new ArrayList<>();
    private ArrayList<Bill> assignedBills = new ArrayList<>();
    private WeeklySchedule weeklySchedule = new WeeklySchedule();
    private boolean isAvailable;  // dynamic based on schedule
    private String activity;      // dynamic based on schedule

    // Constructor
    public Roommate(String username, String password) {
        super(username, password);
        this.isAvailable = true;
        this.activity = "Free";
    }

    public Roommate() {
        
    } // empty constructor for JSON

    // Chores
    public void assignChore(Chore chore) { assignedChores.add(chore); }
    public ArrayList<Chore> getAssignedChores() { return assignedChores; }

    // Bills
    public void assignBill(Bill bill) { assignedBills.add(bill); }
    public ArrayList<Bill> getAssignedBills() { return assignedBills; }

    public void printBillsStatus() {
        for (Bill b : assignedBills) {
            String status = b.isPaid() ? "Paid" : (b.isOverdue() ? "Overdue" : "Due");
            System.out.println(b.getDescription() + ": $" + b.getAmount() + " - " + status);
        }
    }

    // Schedule
    public WeeklySchedule getWeeklySchedule() { return weeklySchedule; }
    public void setWeeklySchedule(WeeklySchedule schedule) { this.weeklySchedule = schedule; }

    // Updates availability & current activity based on schedule
    public void updateStatus(String day, LocalTime currentTime) {
        DailySchedule daily = weeklySchedule.getDay(day);
        if (daily != null) {
            boolean free = true;
            String currentActivity = "Free";

            for (ScheduleBlock block : daily.getBlocks()) {
                if (block.isDuring(currentTime)) {
                    free = !block.isQuiet(); // quiet/study = busy
                    currentActivity = block.getDescription();
                    break; // only one block at a time
                }
            }

            this.isAvailable = free;
            this.activity = currentActivity;
        } else {
            this.isAvailable = true;
            this.activity = "Free";
        }
    }

    //getters
    public boolean isAvailable() { return isAvailable; }
    public String getActivity() { return activity; }

}
