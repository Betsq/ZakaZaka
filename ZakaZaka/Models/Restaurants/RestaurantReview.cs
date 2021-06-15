using System;

namespace ZakaZaka.Models.Restaurants
{
    public class RestaurantReview
    {
        public int Id { get; set; }
        public string Review { get; set; }
        public int Assessment { get; set; }
        public DateTime Time { get; set; }
        
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}