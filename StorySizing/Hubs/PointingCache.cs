using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorySizing.Hubs
{
    public class PointingCache
    {
        private static MemoryCache _cache;

        public MemoryCache MemoryCache
        {
            get
            {
                if (_cache == null)
                    _cache = new MemoryCache(new MemoryCacheOptions());

                return _cache;
            }
        }

        public PointingSession GetCacheData(string groupName)
        {
            PointingSession model;
            if (!MemoryCache.TryGetValue(groupName, out model))
                return model = new PointingSession();

            return model;
        }

        public bool LoadCacheData(PointingSession model, string groupName)
        {
            MemoryCache.Set(groupName, model);
            return MemoryCache.TryGetValue(groupName, out model);
        }
    }
}