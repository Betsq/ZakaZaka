using Microsoft.EntityFrameworkCore.Migrations;

namespace ZakaZaka.Migrations
{
    public partial class renamePropertyImageToPathToImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Restaurants",
                newName: "PathToImage");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PathToImage",
                table: "Restaurants",
                newName: "Image");
        }
    }
}
