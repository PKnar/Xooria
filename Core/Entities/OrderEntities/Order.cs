using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderEntities
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(List<OrderItem> orderItems, string customerEmail, OrderAddress shippingAddress, decimal subtotal)
        {
            CustomerEmail = customerEmail;
            ShippingAddress = shippingAddress;
            OrderItems = orderItems;
            Subtotal = subtotal;


        }

        public string CustomerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public OrderAddress ShippingAddress { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
    }
}