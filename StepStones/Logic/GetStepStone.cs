using StepStones.Database;
using StepStones.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StepStones.Logic
{
    public class GetStepStone
    {
        private SSDatabase _sSDatabase;
        private List<StepStone> _stepStones;
        private int _returnCode;
        private CustomError customError;
    }
}
