using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Service.FormDataBinder;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;
using ZakaZaka.Service.RestaurantCuisines;
using ZakaZaka.ViewModels;

namespace ZakaZaka.Controllers.RestaurantController
{
    [ApiController]
    [Route("api/Restaurant")]
    public class RestaurantController : Controller
    {
        private readonly IFileOnServer _fileOnServer;
        private readonly ApplicationContext _db;

        public RestaurantController(ApplicationContext db, IFileOnServer fileOnServer)
        {
            _db = db;
            _fileOnServer = fileOnServer;
        }

        [HttpGet]
        public RestaurantManageViewModel Get()
        {
            var restaurants = _db.Restaurants
                .Include(cuisine => cuisine.RestaurantCuisines)
                .Include(item => item.RestaurantFoods)
                .ToList();

            var cuisines = _db.Cuisines.ToList();

            var restaurantManage = new RestaurantManageViewModel()
            {
                Restaurants = restaurants,
                Cuisines = cuisines
            };

            return restaurantManage;
        }

        [HttpGet("{id}")]
        public ActionResult<Restaurant> Get(int? id)
        {
            if (id == null)
                return BadRequest();

            var restaurant = _db.Restaurants
                .Include(item => item.RestaurantFoods)
                .Include(item => item.RestaurantCuisines)
                .ThenInclude(item => item.Cuisine)
                .Include(item => item.RestaurantReviews)
                .FirstOrDefault(item => item.Id == id);


            if (restaurant == null)
                return BadRequest();

            return restaurant;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Post(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            Restaurant restaurant,
            [FromForm] IFormFile file,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            List<Cuisine> cuisines
        )
        {
            if (restaurant == null)
                return BadRequest(ModelState);

            _db.Restaurants.Add(restaurant);
            /*Save the database so that when transferring restaurant to restaurantCuisine,
             restaurantCuisine can link the table using the restaurant id*/
            _db.SaveChanges();

            if (file != null)
            {
                const string pathToFolder = "/files/restaurants/logo/";

                restaurant.PathToImage = _fileOnServer.Add(pathToFolder, file);
            }

            if (cuisines != null)
            {
                var restaurantCuisineService = new RestaurantCuisineService(restaurant, cuisines);

                var listRestaurantCuisine = restaurantCuisineService.Add();
                _db.RestaurantCuisines.AddRange(listRestaurantCuisine);
            }

            _db.SaveChanges();

            return Ok(restaurant);
        }

        [HttpPut]
        public IActionResult Put(
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            Restaurant restaurant,
            [FromForm] IFormFile file,
            [FromForm] [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
            List<Cuisine> cuisines
        )
        {
            if (restaurant == null)
                return BadRequest(ModelState);

            _db.Restaurants.Update(restaurant);

            if (file != null)
            {
                const string pathToFolder = "/files/restaurants/logo/";

                _fileOnServer.Remove(restaurant.PathToImage);
                restaurant.PathToImage = _fileOnServer.Add(pathToFolder, file);
            }

            if (cuisines != null)
            {
                var restaurantCuisineService = new RestaurantCuisineService(restaurant, cuisines);

                var listRestaurantCuisine = restaurantCuisineService.Add();
                _db.RestaurantCuisines.AddRange(listRestaurantCuisine);

                var restaurantCuisines = _db.RestaurantCuisines.Where(i => i.RestaurantId == restaurant.Id).ToList();

                var unnecessaryRestaurantCuisine = restaurantCuisineService.Remove(restaurantCuisines);
                _db.RestaurantCuisines.RemoveRange(unnecessaryRestaurantCuisine);
            }

            _db.SaveChanges();
            return Ok(restaurant);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var restaurant = _db.Restaurants.Find(id);

            if (restaurant == null)
                return BadRequest();

            if (_fileOnServer.Exists(restaurant.PathToImage))
            {
                string pathToFile = restaurant.PathToImage;

                _fileOnServer.Remove(pathToFile);
            }

            _db.Restaurants.Remove(restaurant);
            _db.SaveChanges();

            return Ok(restaurant);
        }
    }
}