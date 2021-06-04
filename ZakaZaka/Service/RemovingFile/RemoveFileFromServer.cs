using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ZakaZaka.Service.RemovingFile
{
    public class RemoveFileFromServer : RemoveFile
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        
        public RemoveFileFromServer(string path, IWebHostEnvironment webHostEnvironment)
            : base(path)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public override void Remove()
        {
            if (!File.Exists(_webHostEnvironment.WebRootPath +_path))
                throw new Exception($"The file in the path " +
                                    $"{_webHostEnvironment.WebRootPath + _path} does not exist");
            
            File.Delete(_webHostEnvironment.WebRootPath + _path);
        }
    }
}