using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {


        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            this._repo = repo;

        }


        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {

            var products = await this._repo.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            return await this._repo.GetProductByIdAsync(id);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductBrands()
        {

            var brands = await this._repo.GetProductBrandsAsync();
            return Ok(brands);
        }


        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductTypes()
        {

            var types = await this._repo.GetProductTypesAsync();
            return Ok(types);
        }


    }
}