using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;


/* 

with this we are abstracting our database from 
away from the code. we don't directly query from our 
database, we instead use DbContext methods to query from the 
database. 

*/
namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {


        }

        // this will allow us to retrive the data
        // we are looking for from the database
        // <Product> bahaves like Mongo models which 
        //are called entities in C#
        //we are saying that the retrived data should have
        //Product entity structure
        //DbSet itself , is a class that represents entities
        // so here DbSet says that this Entity can be used
        // to create delete update read from the database
        // so the structure DbSet <EntityName> [methodName]
        public DbSet<Product> Products { get; set; }


        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}