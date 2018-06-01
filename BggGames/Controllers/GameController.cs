using BggGames.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BggGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> Get(int id)
        {
            using (var ctx = new WebContext())
            {
                return await ctx.Games.FirstOrDefaultAsync(x => x.ID == id);
            }
        }
    }
}