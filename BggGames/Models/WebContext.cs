using Microsoft.EntityFrameworkCore;
using System;

namespace BggGames.Models
{
    public class WebContext : DbContext
    {
        public DbSet<Game> Games { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (Environment.MachineName.Contains("STEVE-DESKTOP"))
            {
                optionsBuilder.UseSqlServer(@"Server=beast;Database=BggScrape;User=sa;Password=beast");
            }
            else
            {
                optionsBuilder.UseSqlServer(@"Server=(local);Database=BggScrape;User=sa;Password=Prograde2500!");
            }
        }
    }
}