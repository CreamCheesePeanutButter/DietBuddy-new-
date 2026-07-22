namespace DietBuddy.DTOs.Response;

public record BriefIngredientDTO(
    int ID,
    string Name,
    string Description,
    double Amount,
    string MeasurementUnit,
    double Calories
);
