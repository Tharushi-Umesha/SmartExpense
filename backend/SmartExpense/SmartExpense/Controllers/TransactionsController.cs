using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartExpense.Models.DTOs.Transaction;
using SmartExpense.Services;
using System.Security.Claims;

namespace SmartExpense.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        // GET: api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAllTransactions()
        {
            var userId = GetUserId();
            var transactions = await _transactionService.GetAllTransactionsAsync(userId);
            return Ok(transactions);
        }

        // GET: api/transactions/type/Expense
        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsByType(string type)
        {
            if (type != "Expense" && type != "Income")
            {
                return BadRequest(new { message = "Type must be 'Expense' or 'Income'" });
            }

            var userId = GetUserId();
            var transactions = await _transactionService.GetTransactionsByTypeAsync(userId, type);
            return Ok(transactions);
        }

        // GET: api/transactions/daterange?startDate=2024-01-01&endDate=2024-12-31
        [HttpGet("daterange")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactionsByDateRange(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var userId = GetUserId();
            var transactions = await _transactionService.GetTransactionsByDateRangeAsync(userId, startDate, endDate);
            return Ok(transactions);
        }

        // GET: api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransaction(int id)
        {
            var userId = GetUserId();
            var transaction = await _transactionService.GetTransactionByIdAsync(id, userId);

            if (transaction == null)
            {
                return NotFound(new { message = "Transaction not found" });
            }

            return Ok(transaction);
        }

        // GET: api/transactions/summary
        [HttpGet("summary")]
        public async Task<ActionResult<TransactionSummaryDto>> GetTransactionSummary(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();
            var summary = await _transactionService.GetTransactionSummaryAsync(userId, startDate, endDate);
            return Ok(summary);
        }

        // POST: api/transactions
        [HttpPost]
        public async Task<ActionResult<TransactionDto>> CreateTransaction([FromBody] CreateTransactionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();
            var transaction = await _transactionService.CreateTransactionAsync(dto, userId);

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.TransactionId }, transaction);
        }

        // PUT: api/transactions/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionDto>> UpdateTransaction(int id, [FromBody] UpdateTransactionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();
            var transaction = await _transactionService.UpdateTransactionAsync(id, dto, userId);

            if (transaction == null)
            {
                return NotFound(new { message = "Transaction not found" });
            }

            return Ok(transaction);
        }

        // DELETE: api/transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var userId = GetUserId();
            var result = await _transactionService.DeleteTransactionAsync(id, userId);

            if (!result)
            {
                return NotFound(new { message = "Transaction not found" });
            }

            return Ok(new { message = "Transaction deleted successfully" });
        }
    }
}