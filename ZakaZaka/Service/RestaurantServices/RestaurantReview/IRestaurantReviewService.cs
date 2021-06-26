using System.Collections.Generic;
using System.Threading.Tasks;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantServices
{
    public interface IRestaurantReviewService
    {
        public Task<IEnumerable<RestaurantReviewDTO>> Get(int restaurantId);

        public void Add(RestaurantReviewDTO restaurantReview);
        
        public void Update(RestaurantReviewDTO restaurantReview);
        
        public Task Remove(int reviewId);

        public Task SaveDataBase();
    }
}