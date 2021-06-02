using System;
using Microsoft.AspNetCore.Mvc;

namespace ZakaZaka.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int MinimumOrder { get; set; }
        public int CostDelivery { get; set; }
        public double TimeToDelivery { get; set; }
        public bool PayToCard { get; set; }
    }
}