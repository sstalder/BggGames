using Microsoft.EntityFrameworkCore;

namespace BggGames.Models
{
    public class WebContext : DbContext
    {
        public DbSet<Game> Games { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(local);Database=BggScrape;User=sa;Password=switchbox");
        }
    }
}