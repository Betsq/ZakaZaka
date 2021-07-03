using AutoMapper;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Helpers.AutoMapper
{
    public class MappingRestaurant : Profile
    {
        public MappingRestaurant()
        {
            CreateMap<Restaurant, RestaurantDTO>();
            CreateMap<RestaurantDTO, Restaurant>();
        }
    }
}