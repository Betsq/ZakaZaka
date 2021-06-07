using System.Collections.Generic;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantCuisines
{
    public interface IAdd
    {
        public List<RestaurantCuisine> Add();
    }
}