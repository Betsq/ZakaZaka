using AutoMapper;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Helpers.AutoMapper
{
    public class MappingFood : Profile
    {
        public MappingFood()
        {
            CreateMap<RestaurantFood, RestaurantFoodDTO>();
            CreateMap<RestaurantFoodDTO, RestaurantFood>();
        }
    }
}