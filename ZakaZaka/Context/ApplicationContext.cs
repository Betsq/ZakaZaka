using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Models;
using ZakaZaka.Models.Identity;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Context
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            :base(options) { }
            
       public DbSet<Restaurant> Restaurants { get; set; }
       public DbSet<RestaurantCuisine> RestaurantCuisines { get; set; }
       public DbSet<RestaurantFood> RestaurantFoods { get; set; }
       public DbSet<RestaurantReview> RestaurantReviews { get; set; }
       public DbSet<Cuisine> Cuisines { get; set; }
       
    }
}