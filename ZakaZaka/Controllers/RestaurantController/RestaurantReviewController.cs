using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Helpers;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Service.RestaurantServices;

namespace ZakaZaka.Controllers.RestaurantController
{
    [ApiController]
    [Route("api/review")]
    public class RestaurantReviewController : Controller
    {
        private readonly IRestaurantReviewService _reviewService;
        public RestaurantReviewController(ApplicationContext db, IMapper mapper)
        {
            _reviewService = new RestaurantReviewService(db, mapper);
        }

        [HttpGet("{restaurantId}")]
        public async Task<IEnumerable<RestaurantReviewDTO>> Get(int restaurantId) => await _reviewService.Get(restaurantId);


        [HttpPost]
        public async Task<IActionResult> Post(
            [FromBody]RestaurantReviewDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(model);

            _reviewService.Add(model);
            await _reviewService.SaveDataBase();
            
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(
            [FromBody]RestaurantReviewDTO model)
        {
            if (model == null)
                return BadRequest();
            
            _reviewService.Update(model);
            await _reviewService.SaveDataBase();
            
            return Ok();
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> Delete(int reviewId)
        {
            await _reviewService.Remove(reviewId);
            await _reviewService.SaveDataBase();
            
            return Ok();
        }
    }
}