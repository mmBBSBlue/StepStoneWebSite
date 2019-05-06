using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using StepStones.Models;

namespace StepStones.Database
{
    public class SSDatabase : DbContext
    {
        public DbSet<StepStone> StepStones { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var path = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "ssDatabase.db");
            optionsBuilder.UseSqlite("Filename=" + path);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var con = base.Database.GetDbConnection();
            con.Open();
            modelBuilder.Entity<StepStone>();
            base.OnModelCreating(modelBuilder);
        }

        public SSDatabase() : base()
        {
            this.UpdateRange(StepStones);
        }

        public SSDatabase(DbContextOptions options) : base(options)
        {
        }
    }
}
