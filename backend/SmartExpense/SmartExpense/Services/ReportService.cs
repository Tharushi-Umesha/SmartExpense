using Microsoft.EntityFrameworkCore;
using SmartExpense.Data;
using SmartExpense.Models.DTOs;

namespace SmartExpense.Services
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryReportDto>> GetExpenseByCategoryAsync(int userId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && t.Type == "Expense");

            if (startDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate <= endDate.Value);
            }

            var result = await query
                .GroupBy(t => new { t.CategoryId, t.Category.Name, t.Category.Icon, t.Category.Color })
                .Select(g => new CategoryReportDto
                {
                    CategoryId = g.Key.CategoryId,
                    CategoryName = g.Key.Name,
                    Icon = g.Key.Icon,
                    Color = g.Key.Color,
                    TotalAmount = g.Sum(t => t.Amount),
                    TransactionCount = g.Count()
                })
                .OrderByDescending(x => x.TotalAmount)
                .ToListAsync();

            return result;
        }

        public async Task<List<CategoryReportDto>> GetIncomeByCategoryAsync(int userId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && t.Type == "Income");

            if (startDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate <= endDate.Value);
            }

            var result = await query
                .GroupBy(t => new { t.CategoryId, t.Category.Name, t.Category.Icon, t.Category.Color })
                .Select(g => new CategoryReportDto
                {
                    CategoryId = g.Key.CategoryId,
                    CategoryName = g.Key.Name,
                    Icon = g.Key.Icon,
                    Color = g.Key.Color,
                    TotalAmount = g.Sum(t => t.Amount),
                    TransactionCount = g.Count()
                })
                .OrderByDescending(x => x.TotalAmount)
                .ToListAsync();

            return result;
        }

        public async Task<List<MonthlyTrendDto>> GetMonthlyTrendAsync(int userId, int months)
        {
            var startDate = DateTime.UtcNow.AddMonths(-months);

            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId && t.TransactionDate >= startDate)
                .ToListAsync();

            var result = transactions
                .GroupBy(t => new { t.TransactionDate.Year, t.TransactionDate.Month })
                .Select(g => new MonthlyTrendDto
                {
                    Month = new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMM yyyy"),
                    TotalIncome = g.Where(t => t.Type == "Income").Sum(t => t.Amount),
                    TotalExpense = g.Where(t => t.Type == "Expense").Sum(t => t.Amount),
                    NetAmount = g.Where(t => t.Type == "Income").Sum(t => t.Amount) -
                               g.Where(t => t.Type == "Expense").Sum(t => t.Amount)
                })
                .OrderBy(x => x.Month)
                .ToList();

            return result;
        }

        public async Task<SpendingPatternDto> GetSpendingPatternAsync(int userId)
        {
            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1);
            var daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

            // Get this month's transactions
            var thisMonthTransactions = await _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.UserId == userId && t.TransactionDate >= startOfMonth)
                .ToListAsync();

            var expenses = thisMonthTransactions.Where(t => t.Type == "Expense").ToList();
            var totalExpense = expenses.Sum(t => t.Amount);

            // Average daily spending
            var averageDailySpending = totalExpense / now.Day;

            // Highest expense category
            var highestExpenseCategory = expenses
                .GroupBy(t => new { t.Category.Name, t.CategoryId })
                .Select(g => new { CategoryName = g.Key.Name, TotalAmount = g.Sum(t => t.Amount) })
                .OrderByDescending(x => x.TotalAmount)
                .FirstOrDefault();

            // Most frequent category
            var mostFrequentCategory = expenses
                .GroupBy(t => new { t.Category.Name, t.CategoryId })
                .Select(g => new { CategoryName = g.Key.Name, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .FirstOrDefault();

            return new SpendingPatternDto
            {
                AverageDailySpending = averageDailySpending,
                HighestExpenseCategory = highestExpenseCategory?.CategoryName ?? "N/A",
                HighestExpenseAmount = highestExpenseCategory?.TotalAmount ?? 0,
                MostFrequentCategory = mostFrequentCategory?.CategoryName ?? "N/A",
                MostFrequentCount = mostFrequentCategory?.Count ?? 0,
                TotalTransactionsThisMonth = thisMonthTransactions.Count
            };
        }
    }
}