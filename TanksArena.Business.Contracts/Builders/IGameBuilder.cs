using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Business.Contracts.Builders
{
    public interface IGameBuilder<TNetworkProvider>
    {
        IGameBuilder<TNetworkProvider> CreatePlayGround();
        IGameBuilder<TNetworkProvider> CreatePhysicEngine();
        IGameBuilder<TNetworkProvider> CreateGame(TNetworkProvider provider);
        IGame<TNetworkProvider> Get();
    }
}
