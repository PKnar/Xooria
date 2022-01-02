using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class UrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        public IConfiguration _config;
        public UrlResolver(IConfiguration config)
        {
            this._config = config;
        }


        // Adding host url to the image urls through config
        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}