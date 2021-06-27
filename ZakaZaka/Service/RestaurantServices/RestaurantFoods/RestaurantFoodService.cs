using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Helpers;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;

namespace ZakaZaka.Service.RestaurantServices.RestaurantFoods
{
    public class RestaurantFoodService : IRestaurantFoodService
    {
        private readonly IFileOnServer _fileOnServer;
        private readonly ApplicationContext _db;
        private readonly IMapper _mapper;
        private const string PathToFolder = "/files/restaurants/restaurantFood/";

        public RestaurantFoodService(ApplicationContext db, IFileOnServer fileOnServer, IMapper mapper)
        {
            _fileOnServer = fileOnServer;
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RestaurantFoodDTO>> Get(int restaurantId)
        {
            var foods = await _db.RestaurantFoods.Where(item => item.RestaurantId == restaurantId).ToListAsync();

            var foodsDTO = _mapper.Map<List<RestaurantFoodDTO>>(foods);

            return foodsDTO;
        }
        public void Add(RestaurantFoodDTO modelDTO, IFormFile file)
        {
            var model = _mapper.Map<RestaurantFood>(modelDTO);
            Errors.ThrowIfNull(model);

            if (file != null)
                model.PathToImage = AddFile(file);

            _db.Add(model);
        }

        public void Update(RestaurantFoodDTO modelDTO, IFormFile file)
        {
            var model = _mapper.Map<RestaurantFood>(modelDTO);

            Errors.ThrowIfNull(model);

            if (file != null)
                model.PathToImage = UpdateFile(file);
            
            _db.Update(model);
        }

        public async Task Remove(int id)
        {
            var model = await _db.RestaurantFoods.FindAsync(id);
            
            Errors.ThrowIfNull(model);
            
            if (_fileOnServer.Exists(model.PathToImage))
            {
                _fileOnServer.Remove(model.PathToImage);
            }

            _db.Remove(model);
        }

        public async Task SaveDataBase()
        {
            await _db.SaveChangesAsync();
        }

        private string UpdateFile(IFormFile file)
        {
            string pathToFile = PathToFolder + file.FileName;

            if (_fileOnServer.Exists(pathToFile))
            {
                _fileOnServer.Remove(pathToFile); 
            }
            
            pathToFile = _fileOnServer.Add(PathToFolder, file);
            return pathToFile;
        }

        private string AddFile(IFormFile file)
        {
            string pathToFile = PathToFolder + file.FileName;

            if (_fileOnServer.Exists(pathToFile))
                return pathToFile;

            pathToFile = _fileOnServer.Add(PathToFolder, file);
            return pathToFile;
        }
    }
}