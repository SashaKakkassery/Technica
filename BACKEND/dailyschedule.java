package roommates;

import java.time.LocalTime;
import java.util.ArrayList;

public class DailySchedule {
    private String day;  // e.g., "Monday"
    private ArrayList<ScheduleBlock> blocks = new ArrayList<>();

    //Constructor
    public DailySchedule(String day) {
        this.day = day;
    }

    public DailySchedule() {}

    // add schedule block to daily schedule
    public void addBlock(ScheduleBlock block) {
        blocks.add(block);
    }

    //getter
    public ArrayList<ScheduleBlock> getBlocks() { return blocks; }

    // Check if roommate is available at a given time
    public boolean isAvailable(LocalTime time) {
        for(ScheduleBlock b : blocks) {
            if(b.isDuring(time) && b.isQuiet()) {
                return false;  // busy during quiet/study hours
            }
        }
        return true; // free otherwise
    }
}
