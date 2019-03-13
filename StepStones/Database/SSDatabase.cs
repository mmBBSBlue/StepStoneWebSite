using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StepStones.Models;

namespace StepStones.Database
{
    public class SSDatabase : DbContext
    {
        public DbSet<StepStone> StepStone;
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StepStone>();
            modelBuilder.Model.Relational();
        }

        public SSDatabase(DbContextOptions<SSDatabase> dbContextOptions) : base(dbContextOptions)
        {
        }
    }
}
