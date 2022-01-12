using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderEntities;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {

        private readonly IBasketRepository basketRepo;
        private readonly IUnitWork unitWork;

        public OrderService(IUnitWork unitWork,
                            IBasketRepository basketRepo)
        {
            this.unitWork = unitWork;
            this.basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(string customerEmail, string basketId, OrderAddress shippingAddress)
        {
            var basket = await basketRepo.GetBasketAsync(basketId);
            var products = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var product = await unitWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductOrdered(product.Id, product.Name, product.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, product.Price, item.Quantity);
                products.Add(orderItem);
            }


            var subtotal = products.Sum(item => item.Price * item.Quantity);
            var order = new Order(products, customerEmail, shippingAddress, subtotal);

            unitWork.Repository<Order>().Add(order);

            var result = await unitWork.Complete();


            if (result <= 0)
            {
                return null;
            }

            await basketRepo.DeleteBasketAsync(basketId);



            return order;

        }



        public async Task<Order> GetOrderByIdAsync(int id, string customerEmail)
        {
            var spec = new OrdersSpecification(id, customerEmail);
            return await unitWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<List<Order>> GetOrdersAsync(string customerEmail)
        {
            var spec = new OrdersSpecification(customerEmail);
            return await unitWork.Repository<Order>().ListAsync(spec);
        }
    }
}