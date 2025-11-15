package roommates;

public class Roommate extends User {
    private boolean isAvailable;
    private String activity;

    //constructor
    public Roommate(String username, String password, boolean isAvailable, String activity) {
        super(username, password);
        this.isAvailable = isAvailable;
        this.activity = activity;
    }

    public Roommate() {}

    //getter
    public boolean getIsAvailable() {
        return isAvailable;
    }

    public String getActivity() {
        return activity;
    }

    //setter
    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }
}
