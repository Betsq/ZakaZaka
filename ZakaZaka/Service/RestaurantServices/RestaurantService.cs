using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;
using ZakaZaka.Service.RestaurantCuisines;

namespace ZakaZaka.Service.RestaurantServices
{
    public class RestaurantService : RestaurantAbstractServices<Restaurant, RestaurantDTO>
    {
        private readonly IFileOnServer _fileOnServer;
        
        private const string PathToFolder = "/files/restaurants/logo/";
        public RestaurantService(ApplicationContext db, IMapper mapper, IFileOnServer fileOnServer)
            : base(db, mapper)
        {
            _fileOnServer = fileOnServer;
        }

        public override async Task<IEnumerable<Restaurant>> Get()
        {
            var model = await Db.Restaurants
                .Include(item => item.RestaurantFoods)
                .Include(item => item.RestaurantCuisines)
                    .ThenInclude(item => item.Cuisine)
                .Include(item => item.RestaurantReviews)
                .ToListAsync();

            return model;
        }

        public override async Task<Restaurant> GetById(int id)
        {
            var model = await Db.Restaurants
                .Include(item => item.RestaurantFoods)
                .Include(item => item.RestaurantCuisines)
                    .ThenInclude(item => item.Cuisine)
                .Include(item => item.RestaurantReviews)
                .FirstOrDefaultAsync(item => item.Id == id);

            return model;
        }

        public void Add(RestaurantDTO modelDTO, IFormFile file, List<Cuisine> cuisines)
        {
            var model = MapModel(modelDTO);

            if (file != null)
            {
                _fileOnServer.Remove(model.PathToImage);
                model.PathToImage = _fileOnServer.Add(PathToFolder, file);
            }

            if (cuisines != null)
            {
                var restaurantCuisineService = new BindRestaurantWithCuisine(model, cuisines);

                var listRestaurantCuisine = restaurantCuisineService.Add();
                Db.RestaurantCuisines.AddRange(listRestaurantCuisine);
            }

            Db.Restaurants.Update(model);
        }

        public void Update(RestaurantDTO modelDTO, IFormFile file, List<Cuisine> cuisines)
        {
            var model = MapModel(modelDTO);

            if (file != null)
                model.PathToImage = _fileOnServer.Add(PathToFolder, file);
            
            Db.Restaurants.Update(model);

            if (cuisines != null)
            {
                var bindRestaurantWithCuisine = new BindRestaurantWithCuisine(model, cuisines);

                AddCuisinesToRestaurant(bindRestaurantWithCuisine);

                RemoveCuisinesFromRestaurant(bindRestaurantWithCuisine, model.Id);
            }
        }

        public override async Task Remove(int id)
        {
            var model = await Db.Restaurants.FindAsync(id);

            ThrowIfInvalid(model);

            if (_fileOnServer.Exists(model.PathToImage))
            {
                string pathToFile = model.PathToImage;

                _fileOnServer.Remove(pathToFile);
            }

            Db.Restaurants.Remove(model);
        }

        private void RemoveCuisinesFromRestaurant(BindRestaurantWithCuisine service, int modelId)
        {
            var restaurantCuisinesFromDb = Db.RestaurantCuisines.Where(i => i.RestaurantId == modelId).ToList();
            
            var unnecessaryRestaurantCuisines = service.Remove(restaurantCuisinesFromDb);

            Db.RestaurantCuisines.RemoveRange(unnecessaryRestaurantCuisines);
        }

        private void AddCuisinesToRestaurant(BindRestaurantWithCuisine service)
        {
            var restaurantCuisines = service.Add();
            Db.RestaurantCuisines.AddRange(restaurantCuisines);
        }
    }
}