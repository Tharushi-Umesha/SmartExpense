namespace SmartExpense.Models.DTOs.Transaction
{
    public class TransactionSummaryDto
    {
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal NetBalance { get; set; }
        public int TransactionCount { get; set; }
    }
}