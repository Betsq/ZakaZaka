using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using ZakaZaka.Models.Restaurants;

namespace ZakaZaka.Models.ModelsDTO
{
    public class RestaurantReviewDTO
    {
        public int Id { get; set; }
        
        [Required]
        [MinLength(3, ErrorMessage = "Review must be more than three characters")]
        public string Review { get; set; }
        
        [Required (ErrorMessage = "No rating specified")]
        public int Assessment { get; set; }
        
        public DateTime Time { get; set; } = DateTime.Now;
        
        [Required]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}