using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Physics.Models;

namespace TanksArena.Business.Contracts.Services
{
    public interface IGameManager<TNetworkProvider>
    {
        void CreateGame(TNetworkProvider provider);
        void PlayerJoined(string id, TNetworkProvider provider);
        void HandlePlayerInputs(string gameId, string playerId, IEnumerable<PhysicsCommand> commands);
    }
}
