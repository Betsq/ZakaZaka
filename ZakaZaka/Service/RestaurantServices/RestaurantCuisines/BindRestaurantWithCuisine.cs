using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.RestaurantServices;

namespace ZakaZaka.Service.RestaurantCuisines
{
    public sealed class BindRestaurantWithCuisine
    {
        private readonly Restaurant _restaurant;
        private readonly List<Cuisine> _cuisines;

        public BindRestaurantWithCuisine(Restaurant restaurant, List<Cuisine> products)
        {
            _restaurant = restaurant;
            _cuisines = products;
        }

        public IEnumerable<RestaurantCuisine> Add()
        {
            var restaurantCuisines = new List<RestaurantCuisine>();

            foreach (var cuisine in _cuisines.Where(cuisine => !Exist(cuisine.Id)))
            {
                var restaurantCuisine = new RestaurantCuisine()
                {
                    CuisineId = cuisine.Id,
                    RestaurantId = _restaurant.Id
                };

                restaurantCuisines.Add(restaurantCuisine);
            }

            return restaurantCuisines;
        }
        public IEnumerable<RestaurantCuisine> Remove(List<RestaurantCuisine> restaurantCuisinesFromDb)
        {
            foreach (var cuisine in _cuisines)
            {
                var restaurantCuisine = RestaurantCuisineExistInDb(restaurantCuisinesFromDb, cuisine);

                if (restaurantCuisine != null)
                    restaurantCuisinesFromDb.Remove(restaurantCuisine);
            }

            return restaurantCuisinesFromDb;
        }

        private bool Exist(int productId)
        {
            var hasCuisine = _restaurant.RestaurantCuisines
                .FirstOrDefault(item => item.CuisineId == productId);

            return hasCuisine != null;
        }

        private RestaurantCuisine RestaurantCuisineExistInDb(
            IEnumerable<RestaurantCuisine> restaurantCuisinesFromDb,
            Cuisine cuisine)
        {
            return restaurantCuisinesFromDb.FirstOrDefault(i => i.CuisineId == cuisine.Id);
        }
    }
}