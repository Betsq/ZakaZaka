using System.Collections.Generic;
using ZakaZaka.Models;

namespace ZakaZaka.ViewModels
{
    public class RestaurantManageViewModel
    {
        public List<Restaurant> Restaurants { get; set; }
        public List<Cuisine> Cuisines { get; set; }
    }
}