using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketRepository;
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.basketRepository = basketRepository;

        }

        [HttpGet]

        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await this.basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));

        }

        [HttpPost]

        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
            //var customerBasket = this.mapper.Map<BasketDto, CustomerBasket>(basket);
            var updatedBasket = await this.basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);

        }

        [HttpDelete]

        public async Task DeleteBasket(string id)
        {
            await this.basketRepository.DeleteBasketAsync(id);
        }
    }

}