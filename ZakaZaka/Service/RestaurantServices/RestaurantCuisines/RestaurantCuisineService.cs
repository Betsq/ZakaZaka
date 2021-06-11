using System.Collections.Generic;
using System.Linq;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.RestaurantServices;

namespace ZakaZaka.Service.RestaurantCuisines
{
    public sealed class RestaurantCuisineService : RelateTableOperations<Cuisine, RestaurantCuisine>
    {
        public RestaurantCuisineService(Restaurant restaurant, List<Cuisine> products) 
            : base(restaurant, products) { }

        public override IEnumerable<RestaurantCuisine> Add()
        {
            Validate();
            
            var listOfRestaurantCuisine = new List<RestaurantCuisine>();
            var restaurantCuisine = new RestaurantCuisine();

            foreach (var cuisine in _products.Where(cuisine => !Exist(cuisine.Id)))
            {
                restaurantCuisine.CuisineId = cuisine.Id;
                restaurantCuisine.RestaurantId = _restaurant.Id;

                listOfRestaurantCuisine.Add(restaurantCuisine);
                restaurantCuisine = new RestaurantCuisine();
            }

            return listOfRestaurantCuisine;
        }

        public override IEnumerable<RestaurantCuisine> Remove(List<RestaurantCuisine> productListFormDb)
        {
            Validate();

            foreach (var cuisine in _products)
            {
                var rstCuisine = productListFormDb.FirstOrDefault(i => i.CuisineId == cuisine.Id);
                
                if (rstCuisine != null)
                    productListFormDb.Remove(rstCuisine);
            }

            return productListFormDb;
        }

        private bool Exist(int productId)
        {
            var hasCuisine = _restaurant.RestaurantCuisines
                .FirstOrDefault(item => item.CuisineId == productId);

            return hasCuisine != null;
        }
    }
}