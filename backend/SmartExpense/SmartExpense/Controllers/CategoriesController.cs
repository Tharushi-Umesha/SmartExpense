using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartExpense.Models.DTOs.Category;
using SmartExpense.Services;
using System.Security.Claims;

namespace SmartExpense.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            var userId = GetUserId();
            var categories = await _categoryService.GetAllCategoriesAsync(userId);
            return Ok(categories);
        }

        // GET: api/categories/type/Expense
        [HttpGet("type/{type}")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategoriesByType(string type)
        {
            if (type != "Expense" && type != "Income")
            {
                return BadRequest(new { message = "Type must be 'Expense' or 'Income'" });
            }

            var userId = GetUserId();
            var categories = await _categoryService.GetCategoriesByTypeAsync(userId, type);
            return Ok(categories);
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var userId = GetUserId();
            var category = await _categoryService.GetCategoryByIdAsync(id, userId);

            if (category == null)
            {
                return NotFound(new { message = "Category not found" });
            }

            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();
            var category = await _categoryService.CreateCategoryAsync(dto, userId);

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, category);
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var userId = GetUserId();
            var result = await _categoryService.DeleteCategoryAsync(id, userId);

            if (!result)
            {
                return NotFound(new { message = "Category not found or you don't have permission to delete it" });
            }

            return Ok(new { message = "Category deleted successfully" });
        }
    }
}