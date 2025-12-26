using Microsoft.EntityFrameworkCore;
using SmartExpense.Data;
using SmartExpense.Models;
using SmartExpense.Models.DTOs.Category;

namespace SmartExpense.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(int userId)
        {
            var categories = await _context.Categories
                .Where(c => c.UserId == null || c.UserId == userId)
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    Type = c.Type,
                    Icon = c.Icon,
                    Color = c.Color
                })
                .ToListAsync();

            return categories;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesByTypeAsync(int userId, string type)
        {
            var categories = await _context.Categories
                .Where(c => (c.UserId == null || c.UserId == userId) && c.Type == type)
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    Type = c.Type,
                    Icon = c.Icon,
                    Color = c.Color
                })
                .ToListAsync();

            return categories;
        }

        public async Task<CategoryDto?> GetCategoryByIdAsync(int categoryId, int userId)
        {
            var category = await _context.Categories
                .Where(c => c.CategoryId == categoryId && (c.UserId == null || c.UserId == userId))
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    Type = c.Type,
                    Icon = c.Icon,
                    Color = c.Color
                })
                .FirstOrDefaultAsync();

            return category;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto, int userId)
        {
            var category = new Category
            {
                UserId = userId,
                Name = dto.Name,
                Type = dto.Type,
                Icon = dto.Icon,
                Color = dto.Color,
                CreatedAt = DateTime.UtcNow
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                Name = category.Name,
                Type = category.Type,
                Icon = category.Icon,
                Color = category.Color
            };
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId, int userId)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId && c.UserId == userId);

            if (category == null)
                return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}