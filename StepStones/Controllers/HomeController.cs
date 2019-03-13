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

        [HttpGet("id")]
        public IActionResult Index(int id)
        {
            return View();
        }

        [HttpGet]
        public ActionResult<string> GetStepStones()
        {
            var status = base.StatusCode(403, "Die angeforderte Seite steht momentan nicht zur verfügung.");

            return new ActionResult<string>("sa"); 
        }

    }
}
