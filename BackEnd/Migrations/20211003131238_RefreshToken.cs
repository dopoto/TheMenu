using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheMenu.BackEnd.Migrations
{
    public partial class RefreshToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5558b1ca-43e5-4c75-b824-d8200c02701b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "670b06e4-dfe4-422a-89f3-e74944913808");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "76c9c780-13c7-452c-ab04-0e1085919f57", "cab98d26-7467-43e4-82f6-e23ec790f1e5", "Owner", "OWNER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "dbade68f-bc8d-4e8e-a28a-3a99d9cb44a2", "bbb695b0-9b32-447f-82ec-c382f52428e8", "StaffMember", "STAFFMEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "76c9c780-13c7-452c-ab04-0e1085919f57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbade68f-bc8d-4e8e-a28a-3a99d9cb44a2");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5558b1ca-43e5-4c75-b824-d8200c02701b", "af53c0bd-d42c-47d3-accc-3e80f4e52b44", "Owner", "OWNER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "670b06e4-dfe4-422a-89f3-e74944913808", "2f435e55-414a-4652-98b8-e2c5022d3824", "StaffMember", "STAFFMEMBER" });
        }
    }
}
