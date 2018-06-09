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
        public async Task<ActionResult<List<GameListPoco>>> Get()
        {
            return await GetGames();
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<List<GameListPoco>>> Get(string search)
        {
            var results = await GetGames();

            return results
                .Where(x =>
                    x.Title.Contains(search, StringComparison.InvariantCultureIgnoreCase)
                )
                .ToList();
        }

        private async Task<List<GameListPoco>> GetGames()
        {
            var results = await _cache.GetOrCreateAsync<List<GameListPoco>>(CACHE_KEY, async entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromDays(7);

                using (var ctx = new WebContext())
                {
                    return await ctx.Games.Select(x => new GameListPoco { ID = x.ID, Title = x.Title }).ToListAsync();
                }
            });

            return results;
        }
    }
}