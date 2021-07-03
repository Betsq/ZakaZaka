using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ZakaZaka.Context;

namespace ZakaZaka.Service.RestaurantServices
{
    public abstract class RestaurantAbstractServices<T, TK> where T : class where TK : class
    {
        protected readonly ApplicationContext Db;
        protected readonly IMapper Mapper;

        protected RestaurantAbstractServices(ApplicationContext db, IMapper mapper)
        {
            Db = db;
            Mapper = mapper;
        }

        public virtual async Task<IEnumerable<T>> Get() => await Db.Set<T>().ToListAsync();

        public virtual async Task<T> GetById(int id) => await Db.Set<T>().FindAsync(id);

        public virtual async Task Remove(int id)
        {
            var model = await Db.Set<T>().FindAsync(id);

            ThrowIfInvalid(model);

            Db.Set<T>().Remove(model);
        }

        public virtual async Task SaveDataBase() => await Db.SaveChangesAsync();

        protected virtual T MapModel(TK modelDTO) => Mapper.Map<T>(modelDTO);

        protected virtual void ThrowIfInvalid(T model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(T) + " is null");
        }
    }
}