using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {

        /*
        An INTERFACE in C# is a type definition 
        similar to a class, except that it purely 
        represents a contract between an object and 
        its user. It can neither be directly instantiated
         as an object, nor can data members be defined. 
         So, an interface is nothing but a collection 
         of method and property declarations. */

        /* this will be used by ProductRepository class
         which will commnicate with the database and 
         handle data requests, so interfaces just  
         represent the Infra Repositories structure,
         just like Entities represent the data structure
          */

        Task<Product> GetProductByIdAsync(int id);

        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();


    }
}