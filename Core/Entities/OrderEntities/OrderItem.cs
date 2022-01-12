using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderEntities
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductOrdered orderedProduct, decimal price, int quantity)
        {
            this.OrderedProduct = orderedProduct;
            this.Price = price;
            this.Quantity = quantity;
        }

        public ProductOrdered OrderedProduct { get; set; }
        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}