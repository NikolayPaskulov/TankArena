using Jitter;
using Jitter.Collision;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using TanksArena.Business.Contracts;
using TanksArena.Business.Contracts.Factories;
using TanksArena.Models;
using TanksArena.Models.Contracts;
using TanksArena.Physics;
using TanksArena.Physics.Contracts;
using TanksArena.Physics.Models;

namespace TanksArena.Business
{
    public class Game : IGame<IHub>
    {
        private ConcurrentDictionary<string, IPlayer> _players = new ConcurrentDictionary<string, IPlayer>();
        private readonly IPhysicsEngine _physicsEngine;
        private readonly IHub _provider;
        private readonly IPlayerFactory _playerFactory;
        private bool _isStarted = false;

        private Stopwatch timer = new Stopwatch();

        public Game(IHub provider, IPhysicsEngine physicEngine, IPlayerFactory playerFactory)
        {
            _provider = provider;
            _physicsEngine = physicEngine;
            _playerFactory = playerFactory;
        }

        private void StartLoop()
        {

            var test = Task.Factory.StartNew(() =>
            {
                var timer = new Timer();
                long startTime = 0L;

                while (_isStarted)
                {
                    startTime = timer.GetTicks();
                    _physicsEngine.Step(1.0f / 100.0f, true);
                    SendState();
                    while (timer.GetTicks() - startTime < 1000 / 50) ;
                }
            }, TaskCreationOptions.LongRunning);
        }

        private void SendState()
        {
            var state = this.GenerateState();
            _provider.Clients.Clients(_players.Keys.ToList()).StateChanged(state);
        }

        private GameSnapshot GenerateState()
        {
            return new GameSnapshot();
        }

        public IEnumerable<IPlayer> Players
        {
            get { return _players.Values.ToList(); }
        }

        public void AddPlayer(IPlayerConfig playerConfig)
        {
            var player = _playerFactory.Create(playerConfig);

            _players.TryAdd(playerConfig.Id, player);

            _physicsEngine.AddRigitBody(player.RigidBody);

        }

        public void RemovePlayer(string playerId)
        {
            IPlayer p;
            if (_players.TryRemove(playerId, out p))
                _physicsEngine.RemoveRigitBody(p.RigidBody);
        }

        public void HandlePlayerInputs(string playerId, IEnumerable<PhysicsCommand> commands)
        {
            IPlayer p;
            if (_players.TryGetValue(playerId, out p))
            {
                p.RigidBody.LinearVelocity = new Jitter.LinearMath.JVector(1, 1, 1);
            }
        }

        public void Start()
        {
            _isStarted = true;
            StartLoop();
        }

        public void Stop()
        {
            _isStarted = false;
        }
    }
}
