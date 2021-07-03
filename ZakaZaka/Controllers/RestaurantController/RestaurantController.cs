using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Service.FormDataBinder;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;
using ZakaZaka.Service.RestaurantServices;


namespace ZakaZaka.Controllers.RestaurantController
{
    [ApiController]
    [Route("api/Restaurant")]
    public class RestaurantController : Controller
    {
        private readonly RestaurantService _restaurantService;

        public RestaurantController(ApplicationContext db, IFileOnServer fileOnServer, IMapper mapper)
        {
            _restaurantService = new RestaurantService(db, mapper, fileOnServer);
        }

        [HttpGet]
        public async Task<IEnumerable<Restaurant>> Get()
        {
            var restaurants = await _restaurantService.Get();

            return restaurants;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> Get(int id)
        {
            var restaurant = await _restaurantService.GetById(id);
            
            return restaurant;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Post(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantDTO restaurant,
            [FromForm] IFormFile file,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            List<Cuisine> cuisines
        )
        {
            if (restaurant == null)
                return BadRequest(ModelState);

            _restaurantService.Add(restaurant, file, cuisines);
            await _restaurantService.SaveDataBase();

            return Ok(restaurant);
        }

        [HttpPut]
        public async Task<IActionResult> Put(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            RestaurantDTO restaurant,
            [FromForm] IFormFile file,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            List<Cuisine> cuisines
        )
        {
            if (restaurant == null)
                return BadRequest(ModelState);

            _restaurantService.Update(restaurant, file, cuisines);
            await _restaurantService.SaveDataBase();
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _restaurantService.Remove(id);
            await _restaurantService.SaveDataBase();
            
            return Ok();
        }
    }
}