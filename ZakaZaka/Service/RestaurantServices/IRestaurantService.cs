using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ZakaZaka.Service.RestaurantServices
{
    public interface IRestaurantService<T, in TK> where T : DbSet<T> where TK : class
    {
        public Task<IEnumerable<T>> Get();

        public Task<T> GetById(int id);

        public void Add(TK modelDTO);

        public void Update(TK modelDTO);

        public Task Remove(int id);

        public Task SaveDataBase();
    }
}