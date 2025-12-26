using SmartExpense.Models.DTOs.Category;

namespace SmartExpense.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(int userId);
        Task<IEnumerable<CategoryDto>> GetCategoriesByTypeAsync(int userId, string type);
        Task<CategoryDto?> GetCategoryByIdAsync(int categoryId, int userId);
        Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto, int userId);
        Task<bool> DeleteCategoryAsync(int categoryId, int userId);
    }
}