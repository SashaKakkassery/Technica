package roommates;

import java.time.LocalTime;
import java.util.ArrayList;

/// add enums for all the days of the week

public class WeeklySchedule {
    private ArrayList<DailySchedule> week = new ArrayList<>();

    // Constructor
    public WeeklySchedule(boolean fillWeek) {
        week = new ArrayList<>();
        if (fillWeek) { // fill days if needed
            week.add(new DailySchedule("Monday"));
            week.add(new DailySchedule("Tuesday"));
            week.add(new DailySchedule("Wednesday"));
            week.add(new DailySchedule("Thursday"));
            week.add(new DailySchedule("Friday"));
            week.add(new DailySchedule("Saturday"));
            week.add(new DailySchedule("Sunday"));
        }
    }

    public WeeklySchedule() {
        week = new ArrayList<>(); // initialize empty list
    }

    // Get a day by name
    public DailySchedule getDay(String dayName) {
        for (DailySchedule day : week) {
            if (day.getDayName().equalsIgnoreCase(dayName)) {
                return day;
            }
        }
        return null; // not found
    }

    // Check if available at a given day/time
    public boolean isAvailable(String dayName, LocalTime time) {
        DailySchedule day = getDay(dayName);
        if (day != null) {
            return day.isAvailable(time);
        }
        return false; // assume busy if day not found
    }
}
