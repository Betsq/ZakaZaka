using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Service.RestaurantServices.RestaurantFoods;

namespace ZakaZaka.Controllers.RestaurantController
{
    [ApiController]
    [Route("api/RestaurantFood")]
    public class RestaurantFoodController : Controller
    {
        private readonly IRestaurantFoodService _foodService;
        public RestaurantFoodController(ApplicationContext db, IFileOnServer fileOnServer, IMapper mapper)
        {
            _foodService = new RestaurantFoodService(db, fileOnServer, mapper);
        }

        [HttpGet("{restaurantId}")]
        public async Task<IEnumerable<RestaurantFoodDTO>> Get(int restaurantId) => await _foodService.Get(restaurantId);

        [HttpPost]
        public async Task<IActionResult> Post(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantFoodDTO model,
            [FromForm] IFormFile file)
        {
            if (model == null)
                return BadRequest();
            
            _foodService.Add(model, file);

            await _foodService.SaveDataBase();

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantFoodDTO model,
            [FromForm] IFormFile file)
        {
            if (model == null)
                return BadRequest();

            _foodService.Update(model, file);

            await _foodService.SaveDataBase();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _foodService.Remove(id);

            await _foodService.SaveDataBase();
            
            return Ok();
        }
    }
}