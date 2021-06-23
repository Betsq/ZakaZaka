using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantServices
{
    public class RestaurantReviewService : IRestaurantReviewService
    {
        private readonly ApplicationContext _db;
        private readonly string _errorText = "Restaurant review is null"; 

        public RestaurantReviewService(ApplicationContext db)
        {
            _db = db;
        }
        
        public async Task<IEnumerable<RestaurantReview>> Get(int restaurantId)
        {
            var reviews = await _db.RestaurantReviews.Where(item => item.RestaurantId == restaurantId).ToListAsync();

            return reviews;
        }

        public async Task Add(RestaurantReview restaurantReview)
        {
            if (restaurantReview == null)
                throw new NullReferenceException(_errorText);
            
            _db.RestaurantReviews.Add(restaurantReview);
            await _db.SaveChangesAsync();
        }

        public async Task Update(RestaurantReview restaurantReview)
        {
            if (restaurantReview == null)
                throw new NullReferenceException(_errorText);

            _db.RestaurantReviews.Update(restaurantReview);
            await _db.SaveChangesAsync();
        }

        public async Task Remove(int reviewId)
        {
            var review = await _db.RestaurantReviews.FindAsync(reviewId);

            if (review == null)
                throw new Exception("Review not found");

            _db.Remove(review);
            await _db.SaveChangesAsync();
        }
    }
}