using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Service.RestaurantFoods;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/RestaurantFood")]
    public class RestaurantFoodController : Controller
    {
        private readonly ApplicationContext _db;
        private readonly IFileOnServer _fileOnServer;

        public RestaurantFoodController(ApplicationContext db, IFileOnServer fileOnServer)
        {
            _db = db;
            _fileOnServer = fileOnServer;
        }

        [HttpGet]
        public IEnumerable<RestaurantFood> Get() => _db.RestaurantFoods.ToList();

        [HttpGet("{restaurantId}")]
        public IEnumerable<RestaurantFood> Get(int restaurantId) =>
            _db.RestaurantFoods.Where(item => item.RestaurantId == restaurantId).ToList();
        
        [HttpPost]
        public async Task<IActionResult> Post(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantFood restaurantFood,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            int restaurantId, [FromForm] IFormFile file)
        {
            if (restaurantFood == null)
                return BadRequest();

            var restaurantFoodService = new RestaurantFoodService(restaurantFood, _fileOnServer);

            var add = restaurantFoodService.Create(restaurantId, file);

            _db.Add(add);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantFood restaurantFood,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            int restaurantId, [FromForm] IFormFile file)
        {
            if (restaurantFood == null)
                return BadRequest();

            var restaurantFoodService = new RestaurantFoodService(restaurantFood, _fileOnServer);

            var update = restaurantFoodService.Update(file);

            _db.RestaurantFoods.Update(update);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var restaurantFood = await _db.RestaurantFoods.FindAsync(id);

            if (restaurantFood == null)
                return BadRequest();

            var restaurantFoodService = new RestaurantFoodService(restaurantFood, _fileOnServer);

            var remove = restaurantFoodService.Remove();

            _db.RestaurantFoods.Remove(remove);
            await _db.SaveChangesAsync();
            
            return Ok(remove);
        }
    }
}