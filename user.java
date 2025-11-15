package roommates;

public class User {
    private String username;
    private String password;

    //constructor
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {}

    // getters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
}
