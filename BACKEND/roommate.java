package roommates;

import java.util.ArrayList;

public class Roommate extends User {
    private boolean isAvailable;
    private String activity;
    private ArrayList<Chore> assignedChores = new ArrayList<>();
    private ArrayList<Bill> assignedBills = new ArrayList<>(); // store bills here

    public Roommate(String username, String password, boolean isAvailable, String activity) {
        super(username, password); // inherit username/password from User
        this.isAvailable = isAvailable;
        this.activity = activity;
    }

    public Roommate() {}

    // Availability and activity
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { this.isAvailable = available; }

    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }

    // Chores
    public void assignChore(Chore chore) { assignedChores.add(chore); }
    public ArrayList<Chore> getAssignedChores() { return assignedChores; }

    // Bills
    public void assignBill(Bill bill) { assignedBills.add(bill); }
    public ArrayList<Bill> getAssignedBills() { return assignedBills; }

    // Optional helper: show unpaid/overdue bills
    public void printBillsStatus() {
        for (Bill b : assignedBills) {
            String status = b.isPaid() ? "Paid" : (b.isOverdue() ? "Overdue" : "Due");
            System.out.println(b.getDescription() + ": $" + b.getAmount() + " - " + status);
        }
    }
}
