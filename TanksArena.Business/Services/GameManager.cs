using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Business.Contracts;
using TanksArena.Business.Contracts.Directors;
using TanksArena.Business.Contracts.Services;
using TanksArena.Models;

namespace TanksArena.Business.Services
{
    public class GameManager : IGameManager<IHub>
    {
        private readonly IGameDirector<IHub> _director;
        private ConcurrentDictionary<string, IGame<IHub>> _games =
                        new ConcurrentDictionary<string, IGame<IHub>>();

        public GameManager(IGameDirector<IHub> director)
        {
            _director = director;
        }

        public void CreateGame(IHub provider)
        {
            if (_games.Any())
                return;

            var id = Guid.NewGuid().ToString();
            var game = _director.CreateGame(provider);
            _games.TryAdd(id, game);

            game.Start();
        }

        public void PlayerJoined(string id, IHub provider)
        {
            if (!_games.Any())
                this.CreateGame(provider);

            var game = _games.FirstOrDefault().Value;

            game.AddPlayer(new PlayerConfig() { Id = id });
        }

        public void HandlePlayerInputs(string gameId, string playerId, IEnumerable<PhysicsCommand> commands)
        {
            var game = _games.FirstOrDefault().Value;

            game.HandlePlayerInputs(playerId, commands);
        }
    }
}
