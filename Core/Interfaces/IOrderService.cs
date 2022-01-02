using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderEntities;

namespace Core.Interfaces
{
    public interface IOrderService
    {

        Task<Order> CreateOrderAsync(string customerEmail, string basketId, OrderAddress shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersAsync(string customerEmail);

        Task<Order> GetOrderByIdAsync(int id, string customerEmail);


    }
}