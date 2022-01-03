using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class AppServicesExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {

            services.AddScoped<IToken, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUnitWork, UnitWork>();
            //AddCoped is about the specified methods lifecycle 
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));


            services.Configure<ApiBehaviorOptions>(options =>
                     {
                         options.InvalidModelStateResponseFactory = actionContext =>
                         {
                             var errors = actionContext.ModelState
                             .Where(errors => errors.Value.Errors.Count > 0)
                             .SelectMany(x => x.Value.Errors)
                             .Select(x => x.ErrorMessage).ToArray();

                             var errorResponse = new ApiValidationError
                             {
                                 Errors = errors
                             };

                             return new BadRequestObjectResult(errorResponse);
                         };
                     });

            return services;
        }
    }
}