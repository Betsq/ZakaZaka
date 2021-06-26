using AutoMapper;
using ZakaZaka.Models.ModelsDTO;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Helpers.AutoMapper
{
    public class MappingReview : Profile
    {
        public MappingReview()
        {
            CreateMap<RestaurantReview, RestaurantReviewDTO>();
            CreateMap<RestaurantReviewDTO, RestaurantReview>();
        }
    }
}