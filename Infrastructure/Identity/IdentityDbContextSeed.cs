using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Infrastructure.Identity
{
    public class IdentityDbContextSeed
    {
        public static async Task SeedUserAsync(Microsoft.AspNetCore.Identity.UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    Email = "jane@example.com",
                    UserName = "jane",
                    Address = new Address
                    {
                        FirstName = "Jane",
                        LastName = "Smith",
                        Street = "Martin Campslaan 59",
                        City = "Rijswijk",
                        PostalCode = "2286 ST"

                    }

                };

                await userManager.CreateAsync(user, "Yhhd67!nn");
            }
        }
    }
}