namespace SmartExpense.Models.DTOs.Transaction
{
    public class TransactionDto
    {
        public int TransactionId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}