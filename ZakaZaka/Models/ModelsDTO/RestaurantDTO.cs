using System.Collections.Generic;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Models.ModelsDTO
{
    public class RestaurantDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PathToImage { get; set; }
        public int MinimumOrder { get; set; }
        public int CostDelivery { get; set; }
        public double TimeToDelivery { get; set; }
        public bool PayToCard { get; set; }
        public IEnumerable<RestaurantCuisine> RestaurantCuisines { get; set; }
        public IEnumerable<RestaurantFood> RestaurantFoods { get; set; } 
        public IEnumerable<RestaurantReview> RestaurantReviews { get; set; }
    }
}