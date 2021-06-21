using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ZakaZaka.Auth;
using ZakaZaka.Helpers;
using ZakaZaka.Models;
using ZakaZaka.Models.Identity;
using ZakaZaka.Service;
using ZakaZaka.ViewModels;


namespace ZakaZaka.Controllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private IConfiguration Configuration { get; }

        public AuthController(UserManager<User> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, IConfiguration configuration)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            Configuration = configuration;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Incorrect data transferred.", ModelState));

            var authService = new AuthService(_userManager, _jwtFactory);
            
            var identity = await authService.GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));

            var jwt = await Tokens.GenerateJwt(
                identity, _jwtFactory,
                credentials.UserName,
                _jwtOptions,
                new JsonSerializerSettings { Formatting = Formatting.Indented });
            
            return new OkObjectResult(jwt);
        }
    
        [HttpGet("validateToken")]
        public bool Get(string token) => Tokens.Validate(token, Configuration);
    }
}