using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models;

namespace ZakaZaka.Controllers
{
    [ApiController]
    [Route("api/Cuisine")]
    public class CuisineController : Controller
    {
        private readonly ApplicationContext _db;
        
        public CuisineController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Cuisine> Get() => _db.Cuisines.ToList();

        [HttpGet("{id}")]
        public IActionResult Get(int? id)
        {
            if (id == null)
                return BadRequest();

            var cuisine = _db.Cuisines.Find(id);
            
            if(cuisine == null)
                return BadRequest();

            return Ok(cuisine);
        }

        [HttpPost]
        public IActionResult Post(Cuisine cuisine)
        {
            if (cuisine == null)
                return BadRequest();

            _db.Cuisines.Add(cuisine);
            _db.SaveChanges();

            return Ok(cuisine);
        }

        [HttpPut]
        public IActionResult Put(Cuisine cuisine)
        {
            if (cuisine == null)
                return BadRequest();

            _db.Cuisines.Update(cuisine);
            _db.SaveChanges();

            return Ok(cuisine);
        }

        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            if (id == null)
                return BadRequest();

            var cuisine = _db.Cuisines.Find(id);

            if (cuisine == null)
                return BadRequest();

            _db.Cuisines.Remove(cuisine);
            _db.SaveChanges();

            return Ok();
        }
    }
}