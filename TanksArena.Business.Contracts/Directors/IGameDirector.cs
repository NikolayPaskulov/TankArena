using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TanksArena.Business.Contracts.Directors
{
    public interface IGameDirector<TNetworkProvider>
    {
        IGame<TNetworkProvider> CreateGame(TNetworkProvider provider);
    }
}
