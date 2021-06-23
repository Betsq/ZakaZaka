using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ZakaZaka.Context;
using ZakaZaka.Models.Restaurants;
using ZakaZaka.Service.FileOnServer;

namespace ZakaZaka.Service.RestaurantFoods
{
    public class RestaurantFoodService
    {
        private RestaurantFood _restaurantFood;
        private readonly IFileOnServer _fileOnServer;

        private readonly string _pathToFolder = "/files/restaurants/restaurantFood/";

        public RestaurantFoodService(RestaurantFood restaurantFood,
            IFileOnServer fileOnServer)
        {
            _restaurantFood = restaurantFood;
            _fileOnServer = fileOnServer;
        }

        public RestaurantFood Create(int restaurantId, IFormFile file = null)
        {
            if (file != null)
                _restaurantFood.PathToImage = _fileOnServer.Add(_pathToFolder, file);

            _restaurantFood.RestaurantId = restaurantId;

            return _restaurantFood;
        }

        public RestaurantFood Update(IFormFile file = null)
        {
            if (file != null)
            {
                if (_fileOnServer.Exists(_restaurantFood.PathToImage))
                {
                    _fileOnServer.Remove(_restaurantFood.PathToImage);
                }

                _restaurantFood.PathToImage = _fileOnServer.Add(_pathToFolder, file);
            }

            return _restaurantFood;
        }

        public RestaurantFood Remove()
        {
            if (_fileOnServer.Exists(_restaurantFood.PathToImage))
            {
                _fileOnServer.Remove(_restaurantFood.PathToImage);
            }

            return _restaurantFood;
        }
    }
}