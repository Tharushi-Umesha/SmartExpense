namespace SmartExpense.Models.DTOs
{
    public class SpendingPatternDto
    {
        public decimal AverageDailySpending { get; set; }
        public string HighestExpenseCategory { get; set; } = string.Empty;
        public decimal HighestExpenseAmount { get; set; }
        public string MostFrequentCategory { get; set; } = string.Empty;
        public int MostFrequentCount { get; set; }
        public int TotalTransactionsThisMonth { get; set; }
    }
}