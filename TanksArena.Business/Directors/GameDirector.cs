using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Business.Contracts.Builders;
using TanksArena.Business.Contracts.Directors;

namespace TanksArena.Business.Directors
{
    public class GameDirector : IGameDirector<IHub>
    {
        private readonly IGameBuilder<IHub> _builder;

        public GameDirector(IGameBuilder<IHub> builder)
        {
            _builder = builder;
        }

        public Contracts.IGame<IHub> CreateGame(IHub provider)
        {
            return _builder.CreatePlayGround()
                           .CreatePhysicEngine()
                           .CreateGame(provider)
                           .Get();
        }
    }
}
