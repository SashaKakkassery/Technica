package roommates;

import java.time.LocalTime;
import java.util.ArrayList;

public class ScheduleBlock {
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean isQuiet;   // true = quiet hours, false = normal activity
    private String description; // e.g., "Study session"

    //Constructor
    public ScheduleBlock(LocalTime startTime, LocalTime endTime, boolean isQuiet, String description) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.isQuiet = isQuiet;
        this.description = description;
    }

    public ScheduleBlock() {}

    // Getters
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public boolean isQuiet() { return isQuiet; }
    public String getDescription() { return description; }

    // Check if a given time is inside this block (good for checking availability)
    public boolean isDuring(LocalTime time) {
        return !time.isBefore(startTime) && !time.isAfter(endTime);
    }
}
