using GameEngine.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameEngine.Lobby.Models
{
    public class GameLobbyMember<TPlayer> where TPlayer : IPlayer
    {
        public string Id { get; set; }

        public bool Ready { get; set; } = false;

        public TPlayer Player { get; set; }
    }
}
