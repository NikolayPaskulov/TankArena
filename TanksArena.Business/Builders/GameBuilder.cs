using Jitter;
using Jitter.Collision;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Business.Contracts;
using TanksArena.Business.Contracts.Builders;
using TanksArena.Business.Contracts.Factories;
using TanksArena.Physics;
using TanksArena.Physics.Contracts;

namespace TanksArena.Business.Builders
{
    public class GameBuilder : IGameBuilder<IHub>
    {
        private World _world;
        private IPhysicsEngine _physicsEngine;
        private IGame<IHub> _game;

        private readonly IPlayerFactory _playerFactory;

        public GameBuilder(IPlayerFactory playerFactory)
        {
            _playerFactory = playerFactory;
        }

        public IGameBuilder<IHub> CreatePlayGround()
        {
            CollisionSystem collisionSystem = new CollisionSystemSAP();
            _world = new World(collisionSystem);

            return this;
        }

        public IGameBuilder<IHub> CreatePhysicEngine()
        {
            _physicsEngine = new PhysicsEngine(_world);

            return this;
        }

        public IGameBuilder<IHub> CreateGame(IHub provider)
        {
            _game = new Game(provider, _physicsEngine, _playerFactory);

            return this;
        }

        public Contracts.IGame<IHub> Get()
        {
            return _game;
        }
    }
}
