using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZakaZaka.Models;

namespace ZakaZaka.ViewModels
{
    public class RestaurantViewModel
    {
        public Restaurant Restaurant { get; set; }
        
        public IFormFile File { get; set; }
    }
}