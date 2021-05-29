using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/Restaurant")]
    public class RestaurantController : Controller
    {
        private readonly ApplicationContext _db;

        public RestaurantController(ApplicationContext db)
        {
            _db = db;
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

        [HttpPost]
        public IActionResult Post(Restaurant restaurant)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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

        [HttpDelete]
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