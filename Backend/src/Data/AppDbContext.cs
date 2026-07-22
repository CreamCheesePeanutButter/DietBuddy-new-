using Microsoft.EntityFrameworkCore;
using DietBuddy.Models;

namespace DietBuddy.Data;
public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<MealPlan> MealPlans { get; set; }
    public DbSet<UserMealPlan> UserMealPlans { get; set; }
    public DbSet<DailyMealPlan> DailyMealPlans { get; set; }
    public DbSet<Meal> Meals { get; set; }
    public DbSet<Dish> Dishes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<DishIngredient> DishIngredients { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasMany(u => u.RefreshTokens)
            .WithOne()
            .HasForeignKey(at => at.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // Configure the relationships
        modelBuilder.Entity<RefreshToken>()
            .HasKey(rt => rt.RefreshTokenId);

        modelBuilder.Entity<UserMealPlan>(
            e =>
            {
                e.HasKey(ump => new { ump.UserId, ump.MealPlanId });
                e.HasOne(ump => ump.MealPlan)
                    .WithMany()
                    .HasForeignKey(ump => ump.MealPlanId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                e.HasOne(ump => ump.User)
                    .WithMany(u => u.UserMealPlans)
                    .HasForeignKey(ump => ump.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
                
            }
        );  
        // One Daily meal plan has many meal plans, and each meal plan belongs to one daily meal plan
        modelBuilder.Entity<DailyMealPlan>()
            .HasOne(dmp => dmp.MealPlan)
            .WithMany(mp => mp.DailyMealPlans)
            .HasForeignKey(dmp => dmp.MealPlanId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Meal>(e=>
        {
            e.HasKey(m => new { m.DishId, m.DailyMealPlanId });
            e.HasOne(m => m.Dish)
                .WithMany()
                .HasForeignKey(m => m.DishId)
                .OnDelete(DeleteBehavior.Cascade);
            
            e.HasOne(m => m.DailyMealPlan)
                .WithMany(dmp => dmp.Meals)
                .HasForeignKey(m => m.DailyMealPlanId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        modelBuilder.Entity<DishIngredient>(e =>
        {
            e.HasKey(di => new { di.DishId, di.IngredientId });

            e.HasOne(di => di.Dish)
            .WithMany(d => d.DishIngredients)
            .HasForeignKey(di => di.DishId)
            .OnDelete(DeleteBehavior.Cascade);
        });
        modelBuilder.Entity<Ingredient>(e =>
        {
            e.HasMany(i => i.DishIngredients)
                .WithOne(di => di.Ingredient)
                .HasForeignKey(di => di.IngredientId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
   

        
    }
}