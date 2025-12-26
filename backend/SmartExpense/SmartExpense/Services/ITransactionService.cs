using SmartExpense.Models.DTOs.Transaction;

namespace SmartExpense.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllTransactionsAsync(int userId);
        Task<IEnumerable<TransactionDto>> GetTransactionsByTypeAsync(int userId, string type);
        Task<IEnumerable<TransactionDto>> GetTransactionsByDateRangeAsync(int userId, DateTime startDate, DateTime endDate);
        Task<TransactionDto?> GetTransactionByIdAsync(int transactionId, int userId);
        Task<TransactionDto> CreateTransactionAsync(CreateTransactionDto dto, int userId);
        Task<TransactionDto?> UpdateTransactionAsync(int transactionId, UpdateTransactionDto dto, int userId);
        Task<bool> DeleteTransactionAsync(int transactionId, int userId);
        Task<TransactionSummaryDto> GetTransactionSummaryAsync(int userId, DateTime? startDate, DateTime? endDate);
    }
}