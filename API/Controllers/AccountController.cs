using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        private readonly IToken tokenService;
        private readonly IMapper mapper;

        public AccountController(
            IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, IToken tokenService)
        {
            this.mapper = mapper;
            this.tokenService = tokenService;

            //Gets User from database
            this.userManager = userManager;

            //Checks the user's password against the database password
            this.signInManager = signInManager;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this.userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return new BadRequestObjectResult(new ApiValidationError { Errors = new[] { "User does not exist" } });
            }

            var result = await this.signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new ApiResponse(401));
            }

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = this.tokenService.CreateToken(user)
            };
        }


        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationError { Errors = new[] { "Email address is in use" } });
            }

            var user = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,

            };

            var result = await this.userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = this.tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [HttpGet("emailexists")]

        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]

        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {

            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);

            return mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddress(AddressDto address)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);

            user.Address = mapper.Map<AddressDto, Address>(address);

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(mapper.Map<Address, AddressDto>(user.Address));
            }

            return BadRequest("Error: Could not update the user");

        }





        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.FindByEmailAsync(email);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = this.tokenService.CreateToken(user)
            };

        }




    }
}