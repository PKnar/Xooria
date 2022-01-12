using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.OrderEntities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration config;
        public OrderUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {

            if (!string.IsNullOrEmpty(source.OrderedProduct.PictureUrl))
            {
                return this.config["ApiUrl"] + source.OrderedProduct.PictureUrl;
            }

            return null;

        }
    }
}