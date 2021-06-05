using Microsoft.EntityFrameworkCore;
using ZakaZaka.Models;

namespace ZakaZaka.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            :base(options) { }
            
       public DbSet<Restaurant> Restaurants { get; set; }
       public DbSet<Cuisine> Cuisines { get; set; }
    }
}