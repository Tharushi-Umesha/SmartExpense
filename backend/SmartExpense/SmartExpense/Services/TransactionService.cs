using Microsoft.EntityFrameworkCore;
using SmartExpense.Data;
using SmartExpense.Models;
using SmartExpense.Models.DTOs.Transaction;

namespace SmartExpense.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransactionDto>> GetAllTransactionsAsync(int userId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .Include(t => t.Category)
                .OrderByDescending(t => t.TransactionDate)
                .Select(t => new TransactionDto
                {
                    TransactionId = t.TransactionId,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Type = t.Type,
                    Description = t.Description,
                    TransactionDate = t.TransactionDate
                })
                .ToListAsync();

            return transactions;
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionsByTypeAsync(int userId, string type)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == type)
                .Include(t => t.Category)
                .OrderByDescending(t => t.TransactionDate)
                .Select(t => new TransactionDto
                {
                    TransactionId = t.TransactionId,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Type = t.Type,
                    Description = t.Description,
                    TransactionDate = t.TransactionDate
                })
                .ToListAsync();

            return transactions;
        }

        public async Task<IEnumerable<TransactionDto>> GetTransactionsByDateRangeAsync(int userId, DateTime startDate, DateTime endDate)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId && t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                .Include(t => t.Category)
                .OrderByDescending(t => t.TransactionDate)
                .Select(t => new TransactionDto
                {
                    TransactionId = t.TransactionId,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Type = t.Type,
                    Description = t.Description,
                    TransactionDate = t.TransactionDate
                })
                .ToListAsync();

            return transactions;
        }

        public async Task<TransactionDto?> GetTransactionByIdAsync(int transactionId, int userId)
        {
            var transaction = await _context.Transactions
                .Where(t => t.TransactionId == transactionId && t.UserId == userId)
                .Include(t => t.Category)
                .Select(t => new TransactionDto
                {
                    TransactionId = t.TransactionId,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Type = t.Type,
                    Description = t.Description,
                    TransactionDate = t.TransactionDate
                })
                .FirstOrDefaultAsync();

            return transaction;
        }

        public async Task<TransactionDto> CreateTransactionAsync(CreateTransactionDto dto, int userId)
        {
            var transaction = new Transaction
            {
                UserId = userId,
                CategoryId = dto.CategoryId,
                Amount = dto.Amount,
                Type = dto.Type,
                Description = dto.Description,
                TransactionDate = dto.TransactionDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // Load category for response
            var category = await _context.Categories.FindAsync(dto.CategoryId);

            return new TransactionDto
            {
                TransactionId = transaction.TransactionId,
                CategoryId = transaction.CategoryId,
                CategoryName = category?.Name ?? "",
                Amount = transaction.Amount,
                Type = transaction.Type,
                Description = transaction.Description,
                TransactionDate = transaction.TransactionDate
            };
        }

        public async Task<TransactionDto?> UpdateTransactionAsync(int transactionId, UpdateTransactionDto dto, int userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId && t.UserId == userId);

            if (transaction == null)
                return null;

            transaction.CategoryId = dto.CategoryId;
            transaction.Amount = dto.Amount;
            transaction.Type = dto.Type;
            transaction.Description = dto.Description;
            transaction.TransactionDate = dto.TransactionDate;
            transaction.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Load category for response
            var category = await _context.Categories.FindAsync(dto.CategoryId);

            return new TransactionDto
            {
                TransactionId = transaction.TransactionId,
                CategoryId = transaction.CategoryId,
                CategoryName = category?.Name ?? "",
                Amount = transaction.Amount,
                Type = transaction.Type,
                Description = transaction.Description,
                TransactionDate = transaction.TransactionDate
            };
        }

        public async Task<bool> DeleteTransactionAsync(int transactionId, int userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId && t.UserId == userId);

            if (transaction == null)
                return false;

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TransactionSummaryDto> GetTransactionSummaryAsync(int userId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Transactions.Where(t => t.UserId == userId);

            if (startDate.HasValue)
                query = query.Where(t => t.TransactionDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(t => t.TransactionDate <= endDate.Value);

            var transactions = await query.ToListAsync();

            var totalIncome = transactions.Where(t => t.Type == "Income").Sum(t => t.Amount);
            var totalExpense = transactions.Where(t => t.Type == "Expense").Sum(t => t.Amount);

            return new TransactionSummaryDto
            {
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                NetBalance = totalIncome - totalExpense,
                TransactionCount = transactions.Count
            };
        }
    }
}