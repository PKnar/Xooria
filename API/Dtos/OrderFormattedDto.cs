using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Entities.OrderEntities;

namespace API.Dtos
{
    public class OrderFormattedDto
    {
        public int Id { get; set; }
        public string CustomerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public OrderAddress ShippingAddress { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public decimal Subtotal { get; set; }

    }
}