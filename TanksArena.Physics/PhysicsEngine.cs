using Jitter;
using Jitter.Dynamics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Physics.Contracts;
using TanksArena.Physics.Models;

namespace TanksArena.Physics
{
    public class PhysicsEngine : IPhysicsEngine
    {
        private readonly World _world;
        private IList<Action<float>> _postActions = new List<Action<float>>();

        public PhysicsEngine(World world)
        {
            _world = world;
            _world.Events.PostStep += Events_PostStep;
        }

        public void AddRigitBody(RigidBody body)
        {
            _world.AddBody(body);
        }

        public void RemoveRigitBody(RigidBody body)
        {
            _world.RemoveBody(body);
        }

        public void HandleCommands(IEnumerable<PhysicsCommand> commands)
        {
        }

        public void RegisterPostStep(Action<float> action)
        {
            _postActions.Add(action);
        }

        void Events_PostStep(float timestep)
        {
            foreach (var a in _postActions)
            {
                a.Invoke(timestep);
            }
        }

        public void Step(float timeStep, bool multithread)
        {
            _world.Step(timeStep, multithread);
        }
    }
}
