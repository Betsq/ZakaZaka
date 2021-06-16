﻿using System.Collections.Generic;

namespace ZakaZaka.Models.Restaurants
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PathToImage { get; set; }
        public int MinimumOrder { get; set; }
        public int CostDelivery { get; set; }
        public double TimeToDelivery { get; set; }
        public bool PayToCard { get; set; }
        public List<RestaurantCuisine> RestaurantCuisines { get; set; } = new List<RestaurantCuisine>();
        public List<RestaurantFood> RestaurantFoods { get; set; } = new List<RestaurantFood>();
        public List<RestaurantReview> RestaurantReviews { get; set; } = new List<RestaurantReview>();
    }
}