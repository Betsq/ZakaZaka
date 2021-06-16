using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Service.RestaurantServices;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/review")]
    public class RestaurantReviewController : Controller
    {
        private IRestaurantReviewService _reviewService;
        
        public RestaurantReviewController(ApplicationContext db)
        {
            _reviewService = new RestaurantReviewService(db);
        }

        [HttpGet("{restaurantId}")]
        public async Task<IEnumerable<RestaurantReview>> Get(int restaurantId) => await _reviewService.Get(restaurantId);


        [HttpPost]
        public async Task<IActionResult> Post(
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]RestaurantReview restaurantReview)
        {
            if (restaurantReview == null)
                return BadRequest();

            restaurantReview.Time = DateTime.Now;
            
            await _reviewService.Add(restaurantReview);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]RestaurantReview restaurantReview)
        {
            if (restaurantReview == null)
                return BadRequest();
            
            await _reviewService.Update(restaurantReview);
            return Ok();
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> Delete(int reviewId)
        {
            await _reviewService.Remove(reviewId);

            return Ok();
        }
    }
}