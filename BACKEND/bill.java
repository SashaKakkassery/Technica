package roommates;

import java.time.LocalDate;

public class Bill {
    private String description;  
    private Roommate assignedTo; 
    private double amount;
    private boolean paid;
    private LocalDate dueDate;

    // Constructor
    public Bill(String description, Roommate assignedTo, double amount, LocalDate dueDate) {
        this.description = description;
        this.assignedTo = assignedTo;
        this.amount = amount;
        this.paid = false;
        this.dueDate = dueDate;
    }

    public Bill() {}

    // Mark bill as paid
    public void markPaid() {
        paid = true;
    }

    // Check if overdue
    public boolean isOverdue() {
        return !paid && LocalDate.now().isAfter(dueDate);
    }

    // Getters
    public String getDescription() { return description; }
    public Roommate getAssignedTo() { return assignedTo; }
    public double getAmount() { return amount; }
    public boolean isPaid() { return paid; }
    public LocalDate getDueDate() { return dueDate; }
}
