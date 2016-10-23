using Jitter.Collision.Shapes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Business.Contracts.Factories;
using TanksArena.Models;
using TanksArena.Models.Contracts;

namespace TanksArena.Business.Factories
{
    public class PlayerFactory : IPlayerFactory
    {
        public IPlayer Create(IPlayerConfig config)
        {
            var playerRigitBody = new Jitter.Dynamics.RigidBody(new BoxShape(new Jitter.LinearMath.JVector(20)));
            playerRigitBody.Position = config.Position;

            return new Player()
            {
                Id = config.Id,
                RigidBody = playerRigitBody
            };
        }
    }
}
