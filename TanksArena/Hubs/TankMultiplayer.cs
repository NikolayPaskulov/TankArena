using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using TanksArena.Physics.Contracts;
using TanksArena.Physics.Models;
using TanksArena.Business.Contracts.Services;

namespace TanksArena.Hubs
{
    [HubName("tankMultiplayer")]
    public class TankMultiplayer : Hub
    {
        private readonly IGameManager<IHub> _manager;

        public TankMultiplayer(IGameManager<IHub> manager)
        {
            _manager = manager;
        }

        public void HandleCommands(IEnumerable<PhysicsCommand> commands)
        {

        }

        public override Task OnConnected()
        {
            _manager.PlayerJoined(this.Context.ConnectionId, this);
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}