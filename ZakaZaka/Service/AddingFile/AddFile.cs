using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ZakaZaka.Service.AddingFile
{
     public abstract class AddFile
     {
         private protected IFormFile _file;
         private protected string _path;
         private protected string _nameFile;

         public AddFile(IFormFile file, string path, string nameFile)
         {
             _file = file;
             _path = path;
             _nameFile = nameFile;
         }

        public abstract string Add();

     }
}