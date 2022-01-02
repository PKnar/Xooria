using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities.OrderEntities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var address = mapper.Map<AddressDto, OrderAddress>(orderDto.ShippingAddress);
            var order = await orderService.CreateOrderAsync(email, orderDto.BasketId, address);


            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "Problem with creating the order"));
            }
            return Ok(order);

        }

        [HttpGet]

        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrders()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var orders = await orderService.GetOrdersAsync(email);
            return Ok(orders);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var order = await orderService.GetOrderByIdAsync(id, email);

            if (order == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return order;
        }



    }
}