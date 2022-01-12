using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/* having separate ordered product entity implementation
makes sure any changes to the product does not
affect customers order */
namespace Core.Entities.OrderEntities
{
    public class ProductOrdered
    {
        public ProductOrdered()
        {
        }

        public ProductOrdered(int productId, string productName, string pictureUrl)
        {
            ProductId = productId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public string PictureUrl { get; set; }
    }
}