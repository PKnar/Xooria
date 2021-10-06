using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext context;

        /*this is a contractor, that contains
         the database context.
     When you call an endpoint for the products
     it will hit this controller
     then a new instance will be created.
     The program then will check what other 
     class this class depends on
     (in this case in depends on the database | Infrastructure)
     */

        public ProductsController(StoreContext context)
        {
            this.context = context;
        }


        // ActionResult means that this is going to be an
        // HTTP response
        // List means that it is going to be an Array
        //Product is basically the data model/structure
        //Tast represent async operation
        //it functions like promise
        // so we have and async Task, which is an ActionResult 
        // which returns a result of List type , which then has
        //Product Entity structure
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {

            var products = await context.Produts.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            //context is  the database instance
            //that has methods
            //usage [databaseInstance].[tablename].method()
            return await context.Produts.FindAsync(id);
        }
    }
}