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