using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Service.AddingFile;
using ZakaZaka.Service.FormDataBinder;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/Restaurant")]
    public class RestaurantController : Controller
    {
        private IWebHostEnvironment _webHostEnvironment;
        private readonly ApplicationContext _db;

        public RestaurantController(ApplicationContext db, IWebHostEnvironment environment)
        {
            _db = db;
            _webHostEnvironment = environment;
        }
        
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
            return _db.Restaurants.ToList();
        }

        [HttpGet("id")]
        public ActionResult<Restaurant> Get(int? id)
        {
            if (id == null)
                return NotFound();
            
            var restaurant = _db.Restaurants.Find(id);

            if (restaurant == null)
                return NotFound();
                
            return restaurant;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Post(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            Restaurant restaurant,
            [FromForm]
            IFormFile file)
        {
            if (restaurant == null)
                return BadRequest(ModelState);
            
            const string pathToFolder = "/files/restaurants/logo/";

            if (file != null)
            {
                var addImage = new AddImageToServer(file, pathToFolder, file.FileName, _webHostEnvironment);
            
                restaurant.Image = addImage.Add();
            }
            
            _db.Restaurants.Add(restaurant);
            _db.SaveChanges();
            
            return Ok(restaurant);
        }
        
        [HttpPut]
        public IActionResult Put(Restaurant restaurant)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _db.Update(restaurant);
            _db.SaveChanges();
            return Ok(restaurant);
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            var restaurant = _db.Restaurants.Find(id);

            if (restaurant == null)
                return Ok();

            _db.Restaurants.Remove(restaurant);
            _db.SaveChanges();

            return Ok(restaurant);
        }
    }
}