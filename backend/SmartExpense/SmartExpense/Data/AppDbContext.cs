using Microsoft.EntityFrameworkCore;

namespace SmartExpense.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Entities will be added here later:
        // public DbSet<Expense> Expenses { get; set; }
        // public DbSet<Category> Categories { get; set; }
    }
}
