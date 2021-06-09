using System.ComponentModel.DataAnnotations.Schema;

namespace ZakaZaka.Models.Restaurants
{
    public class RestaurantFood
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName="money")]
        public decimal Price { get; set; }
        public string Ingredient { get; set; }
        public string PathToImage { get; set; }
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
        
    }
}