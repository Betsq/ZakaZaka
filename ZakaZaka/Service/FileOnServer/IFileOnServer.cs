using Microsoft.AspNetCore.Http;

namespace ZakaZaka.Service.FileOnServer
{
    public interface IFileOnServer
    {
        public string Add(string pathToFolder, IFormFile file);

        public void Remove(string pathToFile);

        public bool Exists(string path);
    }
}