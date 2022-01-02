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

        public Order(IReadOnlyList<OrderItem> orderItems, string customerEmail, OrderAddress shipingAddress, decimal subtotal)
        {
            CustomerEmail = customerEmail;
            ShipingAddress = shipingAddress;
            OrderItems = orderItems;
            Subtotal = subtotal;


        }

        public string CustomerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public OrderAddress ShipingAddress { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        public string PaymentIntenId { get; set; }
        public decimal GetTotal()
        {
            return Subtotal + 5;
        }
    }
}