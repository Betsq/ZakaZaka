using Microsoft.EntityFrameworkCore;

namespace ZakaZaka.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            :base(options) { }
    }
}