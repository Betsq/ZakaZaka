using System;
using System.Collections.Generic;
using System.Linq;
using ZakaZaka.Models;
using ZakaZaka.Models.Restaurants;


namespace ZakaZaka.Service.RestaurantServices
{
    public abstract class RelateTableOperations<T, J>

    {
        private protected readonly Restaurant _restaurant;
        private protected readonly List<T> _products;

        protected RelateTableOperations(Restaurant restaurant, List<T> products)
        {
            _restaurant = restaurant;
            _products = products;
        }

        public abstract IEnumerable<J> Add();

        public abstract IEnumerable<J> Remove(List<J> productListFormDb);

        private protected virtual void Validate()
        {
            if (_restaurant == null) throw new NullReferenceException("Restaurant is null");

            if (_products == null) throw new NullReferenceException("Products is null");
        }
    }
}