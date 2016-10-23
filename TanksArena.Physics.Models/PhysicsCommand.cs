using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Physics.Models.Enums;

namespace TanksArena.Physics.Models
{
    public class PhysicsCommand
    {
        public Direction Direction{ get; set; }
        public Source Source { get; set; }
        public InputType Type { get; set; }
    }
}
