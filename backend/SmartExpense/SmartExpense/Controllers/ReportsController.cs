using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartExpense.Services;
using System.Security.Claims;

namespace SmartExpense.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        [HttpGet("expense-by-category")]
        public async Task<IActionResult> GetExpenseByCategory([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();
            var result = await _reportService.GetExpenseByCategoryAsync(userId, startDate, endDate);
            return Ok(result);
        }

        [HttpGet("income-by-category")]
        public async Task<IActionResult> GetIncomeByCategory([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var userId = GetUserId();
            var result = await _reportService.GetIncomeByCategoryAsync(userId, startDate, endDate);
            return Ok(result);
        }

        [HttpGet("monthly-trend")]
        public async Task<IActionResult> GetMonthlyTrend([FromQuery] int months = 6)
        {
            var userId = GetUserId();
            var result = await _reportService.GetMonthlyTrendAsync(userId, months);
            return Ok(result);
        }

        [HttpGet("spending-pattern")]
        public async Task<IActionResult> GetSpendingPattern()
        {
            var userId = GetUserId();
            var result = await _reportService.GetSpendingPatternAsync(userId);
            return Ok(result);
        }
    }
}