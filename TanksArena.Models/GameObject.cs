using Jitter.LinearMath;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Models
{
    public class GameObject
    {
        public string Id { get; set; }
        public JVector Position { get; set; }
        public JVector Rotation { get; set; }
    }
}
