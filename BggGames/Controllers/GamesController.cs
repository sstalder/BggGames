using BggGames.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BggGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private const string CACHE_KEY = "games:cache";

        public GamesController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        [HttpGet]
        public async Task<ActionResult<List<Game>>> Get()
        {
            return await GetGames();
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<List<Game>>> Get(string search)
        {
            var results = await GetGames();

            return results
                .Where(x =>
                    x.Title.Contains(search, StringComparison.InvariantCultureIgnoreCase) ||
                    x.SleeveData.Contains(search, StringComparison.InvariantCultureIgnoreCase)
                )
                .ToList();
        }

        private async Task<List<Game>> GetGames()
        {
            var results = await _cache.GetOrCreateAsync<List<Game>>(CACHE_KEY, async entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromDays(7);

                using (var ctx = new WebContext())
                {
                    return await ctx.Games.ToListAsync();
                }
            });

            return results;
        }
    }
}