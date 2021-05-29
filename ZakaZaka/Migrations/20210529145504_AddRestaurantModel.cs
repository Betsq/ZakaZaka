using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZakaZaka.Migrations
{
    public partial class AddRestaurantModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinimumOrder = table.Column<int>(type: "int", nullable: false),
                    CostDelivery = table.Column<int>(type: "int", nullable: false),
                    TimeToDelivery = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PayToCard = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Restaurants");
        }
    }
}
