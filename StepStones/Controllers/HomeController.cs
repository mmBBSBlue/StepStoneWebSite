using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StepStones.Database;
using StepStones.Models;

namespace StepStones.Controllers
{
    public class HomeController : Controller
    {
        SSDatabase SSDatabase;
        public HomeController(SSDatabase sSDatabase)
        {
            this.SSDatabase = sSDatabase;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public IActionResult Contact()
        {
            return View();
        }

    }
}
