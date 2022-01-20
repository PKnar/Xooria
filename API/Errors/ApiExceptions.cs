using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiExceptions : ApiResponse
    {

        public string Details { get; set; }
        public ApiExceptions(int statusCode,
        string message = "", string details = "") : base(statusCode, message)
        {
            this.Details = details;
        }


    }
}