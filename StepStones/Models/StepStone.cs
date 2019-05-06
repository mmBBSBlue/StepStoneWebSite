using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepStones.Models
{
    public class StepStone
    {
        public int Id { get; set; }
        public string Lon { get; set; }
        public string Lat { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }

        public StepStone()
        {

        }

        public StepStone(string lon, string lat, string description)
        {
            this.Lon = lon;
            this.Lat = lat;
            this.Description = description;
        }
    }
}
