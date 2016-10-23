using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Models
{
    public class GameSnapshot
    {
        public IEnumerable<GameObject> GameObjects { get; set; }
    }
}
