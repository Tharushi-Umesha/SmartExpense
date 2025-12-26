using System.ComponentModel.DataAnnotations;

namespace SmartExpense.Models.DTOs.Category
{
    public class CreateCategoryDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [RegularExpression("^(Expense|Income)$", ErrorMessage = "Type must be 'Expense' or 'Income'")]
        public string Type { get; set; } = string.Empty;

        public string? Icon { get; set; }
        public string? Color { get; set; }
    }
}