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

        //this is a contractor, in the parethese 
        // is the database context, we are connectin the constructor
        // to the database 
        // when you call an endpoint for the products
        // it will hit this controller
        // then a new instamnce will be created
        // then the program will check what other 
        // class this class depends on
        // and it will see that this class
        // is connected/depends on the database class
        //it is imported as Api.Data
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
        // so this long line basically means
        // we have and async Task, which is an ActionResult 
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
            //context is basically the database instance
            //that has methods
            //so we [databaseInstance].[tablename].method()
            return await context.Produts.FindAsync(id);
        }
    }
}