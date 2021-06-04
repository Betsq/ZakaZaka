namespace ZakaZaka.Service.RemovingFile
{
    public abstract class RemoveFile
    {
        protected private string _path;
        
        public RemoveFile(string path)
        {
            _path = path;
        }

        public abstract void Remove();
    }
}