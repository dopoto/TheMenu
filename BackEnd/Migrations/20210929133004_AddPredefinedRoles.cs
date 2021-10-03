using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheMenu.BackEnd.Migrations
{
    public partial class AddPredefinedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5558b1ca-43e5-4c75-b824-d8200c02701b", "af53c0bd-d42c-47d3-accc-3e80f4e52b44", "Owner", "OWNER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "670b06e4-dfe4-422a-89f3-e74944913808", "2f435e55-414a-4652-98b8-e2c5022d3824", "StaffMember", "STAFFMEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5558b1ca-43e5-4c75-b824-d8200c02701b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "670b06e4-dfe4-422a-89f3-e74944913808");
        }
    }
}
