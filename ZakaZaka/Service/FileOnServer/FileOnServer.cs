using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace ZakaZaka.Service.FileOnServer
{
    public sealed class FileOnServer : IFileOnServer
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileOnServer(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public string Add(string pathToFolder, IFormFile file)
        {
            ThrowIfInvalidAdding(file, pathToFolder);

            string pathToFile = pathToFolder + file.FileName;
            using var fileStream =
                new FileStream(_webHostEnvironment.WebRootPath + pathToFile, FileMode.Create);

            file.CopyTo(fileStream);

            return pathToFolder + file.FileName;
        }

        public void Remove(string pathToFile)
        {
            ThrowIfInvalidRemoving(pathToFile);

            File.Delete(_webHostEnvironment.WebRootPath + pathToFile);
        }

        public bool Exists(string path)
        {
            return File.Exists(_webHostEnvironment.WebRootPath + path);
        }

        private void ThrowIfInvalidAdding(IFormFile file, string pathToFolder)
        {
            if (file == null)
                throw new NullReferenceException("File can't be a null");

            if (!Directory.Exists(_webHostEnvironment.WebRootPath + pathToFolder))
                throw new Exception($"The directory {_webHostEnvironment.WebRootPath + pathToFolder} does not exist");

            if(Exists(pathToFolder + file.FileName))
                throw new Exception($"The file {file.FileName} have already existed");
                
        }

        private void ThrowIfInvalidRemoving(string pathToFile)
        {
            if (!Exists(pathToFile))
                throw new Exception($"The file in the path " +
                                    $"{_webHostEnvironment.WebRootPath + pathToFile} doesn't exist");
        }
    }
}