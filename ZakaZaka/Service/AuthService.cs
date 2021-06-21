using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ZakaZaka.Auth;
using ZakaZaka.Models.Identity;

namespace ZakaZaka.Service
{
    public class AuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;
        
        public AuthService(UserManager<User> userManager, IJwtFactory jwtFactory)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
        }
        
        public async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
                {
                    if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                        return await Task.FromResult<ClaimsIdentity>(null);
                    
                    var userToVerify = await _userManager.FindByNameAsync(userName);
        
                    if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);
        
                    // check the credentials
                    if (await _userManager.CheckPasswordAsync(userToVerify, password))
                        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
        
                        // Credentials are invalid, or account doesn't exist
                    return await Task.FromResult<ClaimsIdentity>(null);
                }
    }
}