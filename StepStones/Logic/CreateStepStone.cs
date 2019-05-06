using StepStones.Database;
using StepStones.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepStones.Logic
{
    public class CreateStepStone
    {
        private SSDatabase _sSDatabase;

        public CreateStepStone(SSDatabase sSDatabase)
        {
            this._sSDatabase = sSDatabase;
        }


        public StepStone Create(StepStone stepStone)
        {
            // Logic zur richtigkeitsPrüfung?
            _sSDatabase.StepStones.Add(stepStone);
            _sSDatabase.SaveChanges();
            return stepStone;
        }
    }
}
