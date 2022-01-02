using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities.OrderEntities;

namespace Core.Specifications
{
    public class OrdersSpecification : BaseSpecification<Order>
    {
        public OrdersSpecification(string email) : base(o => o.CustomerEmail == email)
        {

            AddInclude(o => o.OrderItems);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersSpecification(int id, string email) : base(o => o.Id == id && o.CustomerEmail == email)
        {
            AddInclude(o => o.OrderItems);
        }
    }
}