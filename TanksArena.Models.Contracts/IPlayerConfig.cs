using Jitter.LinearMath;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Models.Contracts
{
    public interface IPlayerConfig
    {
        string Id { get; set; }
        JVector Position { get; set; }
    }
}
