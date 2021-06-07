using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Service.RestaurantCuisines
{
    public class RestaurantCuisineService : IAdd, IRemove
    {
        private Restaurant _restaurant;
        private List<Cuisine> _cuisines;
        public RestaurantCuisineService(Restaurant restaurant, List<Cuisine> cuisines)
        {
            _restaurant = restaurant;
            _cuisines = cuisines;
        }
        
        public List<RestaurantCuisine> Add()
        {
            Validate();
            
            var listOfRestaurantCuisine = new List<RestaurantCuisine>();
            var restaurantCuisine = new RestaurantCuisine() { };
            
            foreach (var cuisine in _cuisines)
            {
                if (!Exist(cuisine.Id))
                {
                    restaurantCuisine.CuisineId = cuisine.Id;
                    restaurantCuisine.RestaurantId = _restaurant.Id;
                    
                    listOfRestaurantCuisine.Add(restaurantCuisine);
                }
            }

            return listOfRestaurantCuisine;
        }

        public List<RestaurantCuisine> Remove(List<RestaurantCuisine> restaurantCuisinesList)
        {
            Validate();

            var listOfRestaurantCuisine = restaurantCuisinesList;
            
            foreach (var cuisine in _cuisines)
            {
                var s = restaurantCuisinesList.FirstOrDefault(i => i.CuisineId == cuisine.Id);
                
                if (s != null)
                {
                    listOfRestaurantCuisine.Remove(s);
                }
            }

            return listOfRestaurantCuisine;
        }

        private void Validate()
        {
            if (_restaurant == null) throw new NullReferenceException("Restaurant is null");

            if (_cuisines == null) throw new NullReferenceException("Cuisines is null");
        }

        private bool Exist(int cuisineId)
        {
            var hasCuisine = _restaurant.RestaurantCuisines.FirstOrDefault(item => item.CuisineId == cuisineId);

            return hasCuisine != null;
        }
    }
}