using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.AddingFile;
using ZakaZaka.Service.RemovingFile;

namespace ZakaZaka.Service.RestaurantFoods
{
    public class RestaurantFoodService
    {
        private RestaurantFood _restaurantFood;
        private int _restaurantId;
        private IFormFile _file;
        private ApplicationContext _db;
        private IWebHostEnvironment _webHostEnvironment;
        
        private readonly string _pathToFolder = "/files/restaurants/restaurantFood/";
        private string _pathToImage;
        
        public RestaurantFoodService(RestaurantFood restaurantFood, int restaurantId,
            IFormFile file, ApplicationContext db, IWebHostEnvironment webHostEnvironment)
        {
            _restaurantFood = restaurantFood;
            _restaurantId = restaurantId;
            _file = file;
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public RestaurantFood Create()
        {
            if (_file != null)
            {
                var addImage = new AddImageToServer(_file, _pathToFolder, _file.FileName, _webHostEnvironment);

                _pathToImage = addImage.Add();
                _restaurantFood.PathToImage = _pathToImage;
            }
            
            _restaurantFood.RestaurantId = _restaurantId;
            
            _db.RestaurantFoods.Add(_restaurantFood);
            _db.SaveChanges();
            
            return _restaurantFood;
        }

        public RestaurantFood Update()
        {
            if (_file != null)
            {
                if (System.IO.File.Exists(_webHostEnvironment.WebRootPath + _restaurantFood.PathToImage)) 
                {
                    var removeFile = new RemoveFileFromServer(_restaurantFood.PathToImage, _webHostEnvironment);
                    removeFile.Remove();
                }
                
                var image = new AddImageToServer(_file, _pathToFolder, _file.FileName, _webHostEnvironment);

                _pathToImage = image.Add();
                _restaurantFood.PathToImage = _pathToImage;
            }
            
            _restaurantFood.RestaurantId = _restaurantId;
            _db.RestaurantFoods.Update(_restaurantFood);

            _db.SaveChanges();

            return _restaurantFood;
        }

        public RestaurantFood Remove()
        {
            if (System.IO.File.Exists(_webHostEnvironment.WebRootPath + _restaurantFood.PathToImage))
            {
                var removeFile = new RemoveFileFromServer(_restaurantFood.PathToImage, _webHostEnvironment);
                removeFile.Remove();
            }

            _db.RestaurantFoods.Remove(_restaurantFood);
            _db.SaveChanges();

            return _restaurantFood;
        }
    }
}