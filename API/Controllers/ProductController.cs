using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using System.Linq;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {


        public IGenericRepository<Product> _productsRepo;
        public IGenericRepository<ProductBrand> _productBrandRepo;
        public IGenericRepository<ProductType> _productTypeRepo;
        public IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
        {
            this._mapper = mapper;
            this._productTypeRepo = productTypeRepo;
            this._productBrandRepo = productBrandRepo;
            this._productsRepo = productsRepo;


        }


        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductsWithFiltersAndCountSpecification(productParams);
            var totalItems = await this._productsRepo.CountAsync(countSpec);
            var products = await this._productsRepo.ListAsync(spec);

            var data = this._mapper
            .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));


            //  Manual method of returning a flat organized object
            //  products.Select(product => new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     PictureUrl = product.PictureUrl,
            //     Price = product.Price,
            //     ProductBrand = product.ProductBrand.Name,
            //     ProductType = product.ProductType.Name,


            // }).ToList();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await this._productsRepo.GetEntityWithSpec(spec);


            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }
            // new automated way of returning a flat object
            return _mapper.Map<Product, ProductToReturnDto>(product);


            // traditonal way of returning a flat object
            // new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     PictureUrl = product.PictureUrl,
            //     Price = product.Price,
            //     ProductBrand = product.ProductBrand.Name,
            //     ProductType = product.ProductType.Name,


            // };
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductBrands()
        {

            var brands = await this._productBrandRepo.ListAllAync();
            return Ok(brands);
        }


        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductTypes()
        {

            var types = await this._productTypeRepo.ListAllAync();
            return Ok(types);
        }


    }
}