using Jitter.Dynamics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Models.Contracts;

namespace TanksArena.Models
{
    public class Player : IPlayer
    {
        public string Id { get; set; }
        public RigidBody RigidBody { get; set; }
    }
}
