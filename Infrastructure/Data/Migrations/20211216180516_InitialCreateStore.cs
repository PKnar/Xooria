using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class InitialCreateStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CustomerEmail = table.Column<string>(type: "TEXT", nullable: true),
                    OrderDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    ShipingAddress_FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    ShipingAddress_LastName = table.Column<string>(type: "TEXT", nullable: true),
                    ShipingAddress_Street = table.Column<string>(type: "TEXT", nullable: true),
                    ShipingAddress_City = table.Column<string>(type: "TEXT", nullable: true),
                    ShipingAddress_PostalCode = table.Column<string>(type: "TEXT", nullable: true),
                    Subtotal = table.Column<double>(type: "REAL", nullable: false),
                    OrderStatus = table.Column<string>(type: "TEXT", nullable: false),
                    PaymentIntenId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderedProduct_ProductItemId = table.Column<int>(type: "INTEGER", nullable: true),
                    OrderedProduct_ProductName = table.Column<string>(type: "TEXT", nullable: true),
                    OrderedProduct_PictureUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<double>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    OrderId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItem_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                table: "OrderItem",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
