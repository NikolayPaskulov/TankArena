using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Models;
using TanksArena.Models.Contracts;
using TanksArena.Physics.Models;

namespace TanksArena.Business.Contracts
{
    public interface IGame<TNetworkProvider>
    {
        IEnumerable<IPlayer> Players { get; }
        void AddPlayer(IPlayerConfig playerConfig);
        void RemovePlayer(string playerId);
        void HandlePlayerInputs(string playerId, IEnumerable<PhysicsCommand> commands);
        void Start();
        void Stop();
    }
}
