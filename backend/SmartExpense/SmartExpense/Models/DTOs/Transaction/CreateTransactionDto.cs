using System.ComponentModel.DataAnnotations;

namespace SmartExpense.Models.DTOs.Transaction
{
    public class CreateTransactionDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression("^(Expense|Income)$", ErrorMessage = "Type must be 'Expense' or 'Income'")]
        public string Type { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Description { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }
    }
}