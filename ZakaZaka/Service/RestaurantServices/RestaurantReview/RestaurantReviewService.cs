using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantServices
{
    public class RestaurantReviewService : IRestaurantReviewService
    {
        private readonly ApplicationContext _db;
        private readonly IMapper _mapper;
        private const string ERROR_MODEL_NULL = "Restaurant review is null"; 

        public RestaurantReviewService(ApplicationContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<RestaurantReviewDTO>> Get(int restaurantId)
        {
            var reviews = await _db.RestaurantReviews.Where(item => item.RestaurantId == restaurantId).ToListAsync();

            var models = _mapper.Map<List<RestaurantReviewDTO>>(reviews);
            
            return models;
        }

        public void Add(RestaurantReviewDTO modelDTO)
        {
            var model = _mapper.Map<RestaurantReview>(modelDTO);
            ThrowIfInvalid(model);
            _db.RestaurantReviews.Add(model);
        }

        public void Update(RestaurantReviewDTO modelDTO)
        {
            var model = _mapper.Map<RestaurantReview>(modelDTO);
            ThrowIfInvalid(model);
            _db.RestaurantReviews.Update(model);
        }

        public async Task Remove(int reviewId)
        {
            var review = await _db.RestaurantReviews.FindAsync(reviewId);
            
            ThrowIfInvalid(review);
            
            _db.Remove(review);
        }

        public async Task SaveDataBase()
        {
            await _db.SaveChangesAsync();
        }
        private void ThrowIfInvalid(RestaurantReview model)
        {
            if (model == null)
                throw new ArgumentNullException(ERROR_MODEL_NULL);
        }
    }
}