using Jitter.Dynamics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Physics.Models;

namespace TanksArena.Physics.Contracts
{
    public interface IPhysicsEngine
    {
        void AddRigitBody(RigidBody body);
        void RemoveRigitBody(RigidBody body);
        void Step(float timeStep, bool multithread);
        void HandleCommands(IEnumerable<PhysicsCommand> commands);
        void RegisterPostStep(Action<float> action);
    }
}
