using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ZakaZaka.Service.AddingFile
{
    public sealed class AddImageToServer : AddFile
    {
    private readonly IWebHostEnvironment _webHostEnvironment;

    public AddImageToServer(IFormFile file, string path, string nameFile, IWebHostEnvironment webHostEnvironment)
        : base(file, path, nameFile)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public override string Add()
    {
        if (_file == null)
            throw new NullReferenceException("File can't be a null");

        if (!Directory.Exists(_webHostEnvironment.WebRootPath + _path))
            throw new Exception($"The directory on the path " +
                                $"{_webHostEnvironment.WebRootPath + _path} does not exist");

        if (File.Exists(_webHostEnvironment.WebRootPath + _path + _nameFile))
            throw new Exception($"The file named {_nameFile} already exists");

        using var fileStream =
            new FileStream(_webHostEnvironment.WebRootPath + _path + _nameFile, FileMode.Create);

        _file.CopyTo(fileStream);

        return _path + _nameFile;
    }
    }
}