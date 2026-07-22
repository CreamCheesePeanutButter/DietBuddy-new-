using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DietBuddy.Migrations
{
    /// <inheritdoc />
    public partial class AddDishRankTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DishRanks");
        }
    }
}
