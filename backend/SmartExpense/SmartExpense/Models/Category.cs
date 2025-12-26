namespace SmartExpense.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public int? UserId { get; set; }  // Null = default category, otherwise user-specific
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // "Expense" or "Income"
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public User? User { get; set; }
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}