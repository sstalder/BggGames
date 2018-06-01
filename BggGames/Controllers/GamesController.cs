using BggGames.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> Get()
        {
            using (var ctx = new WebContext())
            {
                return await ctx.Games.ToListAsync();
            }
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<Game>>> Get(string search)
        {
            using (var ctx = new WebContext())
            {
                return await ctx.Games
                    .Where(x =>
                        x.Title.Contains(search, StringComparison.InvariantCultureIgnoreCase) ||
                        x.SleeveData.Contains(search, StringComparison.InvariantCultureIgnoreCase)
                    )
                    .ToListAsync();
            }
        }
    }
}