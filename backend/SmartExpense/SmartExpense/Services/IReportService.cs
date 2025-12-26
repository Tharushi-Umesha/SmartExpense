using SmartExpense.Models.DTOs;

namespace SmartExpense.Services
{
    public interface IReportService
    {
        Task<List<CategoryReportDto>> GetExpenseByCategoryAsync(int userId, DateTime? startDate, DateTime? endDate);
        Task<List<CategoryReportDto>> GetIncomeByCategoryAsync(int userId, DateTime? startDate, DateTime? endDate);
        Task<List<MonthlyTrendDto>> GetMonthlyTrendAsync(int userId, int months);
        Task<SpendingPatternDto> GetSpendingPatternAsync(int userId);
    }
}