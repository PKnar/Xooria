using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [Required]
        public OrderAddress ShippingAddress { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
    }
}