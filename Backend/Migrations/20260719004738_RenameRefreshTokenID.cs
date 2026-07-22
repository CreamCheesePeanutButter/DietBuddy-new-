using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DietBuddy.Migrations
{
    /// <inheritdoc />
    public partial class RenameRefreshTokenID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccessTokenId",
                table: "RefreshTokens",
                newName: "RefreshTokenId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefreshTokenId",
                table: "RefreshTokens",
                newName: "AccessTokenId");
        }
    }
}
