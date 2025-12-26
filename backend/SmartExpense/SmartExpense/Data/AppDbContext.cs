using Microsoft.EntityFrameworkCore;
using SmartExpense.Models;

namespace SmartExpense.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.UserId);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(u => u.LastName).IsRequired().HasMaxLength(50);
            });

            // Configure Category entity
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.CategoryId);
                entity.Property(c => c.Name).IsRequired().HasMaxLength(50);
                entity.Property(c => c.Type).IsRequired().HasMaxLength(10);
                
                // Relationship: Category -> User (optional, for custom categories)
                entity.HasOne(c => c.User)
                      .WithMany()
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure Transaction entity
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(t => t.TransactionId);
                entity.Property(t => t.Amount).HasColumnType("decimal(18,2)");
                entity.Property(t => t.Type).IsRequired().HasMaxLength(10);
                entity.Property(t => t.Description).HasMaxLength(200);

                // Relationship: Transaction -> User
                entity.HasOne(t => t.User)
                      .WithMany()
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Relationship: Transaction -> Category
                entity.HasOne(t => t.Category)
                      .WithMany(c => c.Transactions)
                      .HasForeignKey(t => t.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed default categories
            SeedCategories(modelBuilder);
        }

        private void SeedCategories(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                // Expense Categories
                new Category { CategoryId = 1, Name = "Food & Dining", Type = "Expense", Icon = "🍔", Color = "#FF6B6B" },
                new Category { CategoryId = 2, Name = "Transportation", Type = "Expense", Icon = "🚗", Color = "#4ECDC4" },
                new Category { CategoryId = 3, Name = "Shopping", Type = "Expense", Icon = "🛍️", Color = "#45B7D1" },
                new Category { CategoryId = 4, Name = "Entertainment", Type = "Expense", Icon = "🎬", Color = "#FFA07A" },
                new Category { CategoryId = 5, Name = "Healthcare", Type = "Expense", Icon = "🏥", Color = "#98D8C8" },
                new Category { CategoryId = 6, Name = "Bills & Utilities", Type = "Expense", Icon = "📱", Color = "#F7DC6F" },
                new Category { CategoryId = 7, Name = "Education", Type = "Expense", Icon = "📚", Color = "#BB8FCE" },
                new Category { CategoryId = 8, Name = "Others", Type = "Expense", Icon = "📦", Color = "#95A5A6" },

                // Income Categories
                new Category { CategoryId = 9, Name = "Salary", Type = "Income", Icon = "💰", Color = "#52C41A" },
                new Category { CategoryId = 10, Name = "Freelance", Type = "Income", Icon = "💼", Color = "#13C2C2" },
                new Category { CategoryId = 11, Name = "Investment", Type = "Income", Icon = "📈", Color = "#1890FF" },
                new Category { CategoryId = 12, Name = "Gift", Type = "Income", Icon = "🎁", Color = "#EB2F96" },
                new Category { CategoryId = 13, Name = "Other Income", Type = "Income", Icon = "💵", Color = "#52C41A" }
            );
        }
    }
}