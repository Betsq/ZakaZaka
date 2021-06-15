using System.Collections.Generic;
using System.Threading.Tasks;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantFoods
{
    public interface IRestaurantReviewService
    {
        public Task<IEnumerable<RestaurantReview>> Get(int restaurantId);

        public Task Add(RestaurantReview restaurantReview);
        
        public Task Update(RestaurantReview restaurantReview);
        
        public Task Remove(int reviewId);
    }
}