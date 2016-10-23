using Jitter.Dynamics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Models.Contracts
{
    public interface IPlayer
    {
        string Id { get; set; }
        RigidBody RigidBody { get; set; }
    }
}
