using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SmartExpense.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoriesAndTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                    table.ForeignKey(
                        name: "FK_Categories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transactions_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transactions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Color", "CreatedAt", "Icon", "Name", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "#FF6B6B", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9645), "🍔", "Food & Dining", "Expense", null },
                    { 2, "#4ECDC4", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9650), "🚗", "Transportation", "Expense", null },
                    { 3, "#45B7D1", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9652), "🛍️", "Shopping", "Expense", null },
                    { 4, "#FFA07A", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9653), "🎬", "Entertainment", "Expense", null },
                    { 5, "#98D8C8", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9655), "🏥", "Healthcare", "Expense", null },
                    { 6, "#F7DC6F", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9656), "📱", "Bills & Utilities", "Expense", null },
                    { 7, "#BB8FCE", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9657), "📚", "Education", "Expense", null },
                    { 8, "#95A5A6", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9659), "📦", "Others", "Expense", null },
                    { 9, "#52C41A", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9660), "💰", "Salary", "Income", null },
                    { 10, "#13C2C2", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9661), "💼", "Freelance", "Income", null },
                    { 11, "#1890FF", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9662), "📈", "Investment", "Income", null },
                    { 12, "#EB2F96", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9664), "🎁", "Gift", "Income", null },
                    { 13, "#52C41A", new DateTime(2025, 12, 18, 16, 25, 35, 393, DateTimeKind.Utc).AddTicks(9665), "💵", "Other Income", "Income", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UserId",
                table: "Categories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
