using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepStones.Models
{
    public class StepStone
    {
        public int Id { get; private set; }
        public float X { get; set; }
        public float Y { get; set; }
        public string Description { get; set; }
        public System.Reflection.Metadata.Blob Image { get; set; }
        
        public StepStone()
        {

        }

        public StepStone(float x, float y, string description, System.Reflection.Metadata.Blob image)
        {
            this.X = x;
            this.Y = y;
            this.Description = description;
            this.Image = image;
        }
    }
}
