using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;


        /*this is a constractor, that contains
        the database context.
        When you call an endpoint for the products
        it will hit this controller
        then a new instance will be created.
        The program then will check what other 
         class this class depends on
         (in this case in depends on the database | Infrastructure)
        */

        public ProductRepository(StoreContext _context)
        {
            this._context = _context;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await this._context.ProductBrands.ToListAsync();
        }

        //context is  the database instance
        //that has methods
        //usage [databaseInstance].[tablename].method()
       //include method triggers eager loading of navigation properties
       //navigation properties are C# version of foreign keys
       // so include() goes and finds the data from the specified tables
       //and includes them in the data
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await this._context.Products
            .Include(p=>p.ProductType)
            .Include(p=>p.ProductBrand)
            .FirstOrDefaultAsync(p=>p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await this._context.Products
            .Include(p=>p.ProductType)
            .Include(p=>p.ProductBrand)
            .ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await this._context.ProductTypes.ToListAsync();
        }
    }
}