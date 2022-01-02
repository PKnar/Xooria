using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitWork : IUnitWork
    {
        private readonly StoreContext context;
        private Hashtable respositories;

        public UnitWork(StoreContext context)
        {
            this.context = context;
        }

        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (respositories == null)
            {
                respositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;
            if (!respositories.ContainsKey(type))
            {
                var respositoryType = typeof(GenericRepository<>);
                var respositoryInstance = Activator.CreateInstance(respositoryType.MakeGenericType(typeof(TEntity)), context);

                respositories.Add(type, respositoryInstance);
            }

            return (IGenericRepository<TEntity>)respositories[type];


        }
    }
}