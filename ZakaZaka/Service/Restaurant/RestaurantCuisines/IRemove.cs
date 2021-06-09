using System.Collections.Generic;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantCuisines
{
    public interface IRemove
    {
        public List<RestaurantCuisine> Remove(List<RestaurantCuisine> restaurantCuisinesList);
    }
}