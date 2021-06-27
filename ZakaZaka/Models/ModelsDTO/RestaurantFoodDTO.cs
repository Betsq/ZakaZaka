using System.ComponentModel.DataAnnotations;

namespace ZakaZaka.Models.ModelsDTO
{
    public class RestaurantFoodDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string Ingredient { get; set; }
        public string PathToImage { get; set; }
        [Required]
        public int RestaurantId { get; set; }
    }
}