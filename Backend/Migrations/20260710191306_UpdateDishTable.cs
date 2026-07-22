using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DietBuddy.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDishTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DishRanks");

            migrationBuilder.AddColumn<double>(
                name: "Calories",
                table: "Dishes",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Dishes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Dishes");

            migrationBuilder.CreateTable(
                name: "DishRanks",
                columns: table => new
                {
                    DishId = table.Column<int>(type: "int", nullable: false),
                    View = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DishRanks", x => x.DishId);
                    table.ForeignKey(
                        name: "FK_DishRanks_Dishes_DishId",
                        column: x => x.DishId,
                        principalTable: "Dishes",
                        principalColumn: "DishId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
