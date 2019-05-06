using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StepStones.Database;
using StepStones.Logic;
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

        [HttpGet]
        public IActionResult ProjectOverview()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Map()
        {
            return View();
        }

        [HttpPost]
        public IActionResult NewStepStone(StepStone obj)
        {
            var request = Request;
            var formFiles = request.Form.Files;
            MemoryStream ms = new MemoryStream();
            formFiles.FirstOrDefault().OpenReadStream().CopyTo(ms);

            byte[] p1 = null;
            using (var fs1 = formFiles.FirstOrDefault().OpenReadStream())
            using (var ms1 = new MemoryStream())
            {
                fs1.CopyTo(ms1);
                p1 = ms1.ToArray();
            }
            obj.Image = p1;

            CreateStepStone createStepStone = new CreateStepStone(SSDatabase);
            createStepStone.Create(obj);

            return StatusCode(204);
        }

        [HttpGet]
        public IActionResult GetStepStonePicture(string lon, string lat)
        {
            StepStone stepStone = SSDatabase.StepStones.Where(
                x => x.Lon == lon && x.Lat == lat).FirstOrDefault();

            return File(stepStone.Image, "image/png");
        }

        [HttpGet]
        public IActionResult Popup(string lon, string lat)
        {
            StepStone stepStone = SSDatabase.StepStones.Where(
                x => x.Lon == lon && x.Lat == lat).FirstOrDefault();
            
            return PartialView(stepStone);
        }

        [HttpGet]
        public List<StepStone> GetAllStepStones()
        {
            return SSDatabase.StepStones.ToList();
        }
    }
}
