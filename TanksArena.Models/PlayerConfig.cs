using Jitter.LinearMath;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Models.Contracts;

namespace TanksArena.Models
{
    public class PlayerConfig : IPlayerConfig
    {
        public string Id { get; set; }
        public JVector Position { get; set; }
    }
}
