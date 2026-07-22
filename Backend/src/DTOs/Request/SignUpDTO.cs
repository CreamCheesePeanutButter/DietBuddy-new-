namespace DietBuddy.DTOs.Request;
public record class SignUpDTO( 
    string Username, 
    string Password, 
    string FirstName, 
    string LastName
    );