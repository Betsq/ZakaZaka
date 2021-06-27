using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ZakaZaka.Models.ModelsDTO;

namespace ZakaZaka.Service.RestaurantServices.RestaurantFoods
{
    public interface IRestaurantFoodService
    {
        public Task<IEnumerable<RestaurantFoodDTO>> Get(int restaurantId);

        public void Add(RestaurantFoodDTO modelDTO, IFormFile file);
        
        public void Update(RestaurantFoodDTO modelDTO, IFormFile file);
        
        public Task Remove(int id);

        public Task SaveDataBase();
    }
}