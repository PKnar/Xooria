using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderEntities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<UrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<BasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, OrderAddress>();
            CreateMap<Order, OrderFormattedDto>();
            CreateMap<OrderItem, OrderItemDto>()
                           .ForMember(d => d.ProductId, o => o.MapFrom(s => s.OrderedProduct.ProductId))
                           .ForMember(d => d.ProductName, o => o.MapFrom(s => s.OrderedProduct.ProductName))
                           .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.OrderedProduct.PictureUrl))
                           .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderUrlResolver>());



        }


    }
}