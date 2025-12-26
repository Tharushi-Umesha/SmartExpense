namespace SmartExpense.Models.DTOs
{
    public class MonthlyTrendDto
    {
        public string Month { get; set; } = string.Empty;
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal NetAmount { get; set; }
    }
}