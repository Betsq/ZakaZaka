using Microsoft.EntityFrameworkCore;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            :base(options) { }
            
       public DbSet<Restaurant> Restaurants { get; set; }
       public DbSet<RestaurantCuisine> RestaurantCuisines { get; set; }
       public DbSet<Cuisine> Cuisines { get; set; }
       
    }
}