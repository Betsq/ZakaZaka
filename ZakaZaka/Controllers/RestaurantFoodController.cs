using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Service.RestaurantFoods;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/RestaurantFood")]
    public class RestaurantFoodController : Controller
    {
        private readonly ApplicationContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
            
        public RestaurantFoodController(ApplicationContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public IEnumerable<RestaurantFood> Get()
        {
            return _db.RestaurantFoods.ToList();
        }

        [HttpGet("{restaurantId}")]
        public IEnumerable<RestaurantFood> Get(int restaurantId)
        {
            var restaurantFood = _db.RestaurantFoods.Where(item => item.RestaurantId == restaurantId).ToList();

            return restaurantFood;
        }

        [HttpPost]
        public IActionResult Post(
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]RestaurantFood restaurantFood,
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]int restaurantId, [FromForm] IFormFile file)
        {
            if (restaurantFood == null)
                return BadRequest();
            if (restaurantId < 1)
                return BadRequest();
            
            var restaurantFoodService =
                new RestaurantFoodService(restaurantFood, restaurantId, file, _db, _webHostEnvironment);

            var create = restaurantFoodService.Create();
            return Ok(create);
        }

        [HttpPut]
        public IActionResult Put(
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]RestaurantFood restaurantFood,
            [FromForm][ModelBinder(BinderType = typeof(FormDataJsonBinder))]int restaurantId, [FromForm] IFormFile file)
        {
            if (restaurantFood == null)
                return BadRequest();
            if (restaurantId < 1)
                return BadRequest();

            var restaurantFoodService =
                new RestaurantFoodService(restaurantFood, restaurantId, file, _db, _webHostEnvironment);

            var create = restaurantFoodService.Update();
            return Ok(create);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var restaurantFood = _db.RestaurantFoods.Find(id);
            
            if (restaurantFood == null)
                return BadRequest();
            
            var restaurantFoodService =
                new RestaurantFoodService(restaurantFood, restaurantFood.RestaurantId, null, _db, _webHostEnvironment);

            var remove = restaurantFoodService.Remove();
            return Ok(remove);
        }
        
        
    }
}