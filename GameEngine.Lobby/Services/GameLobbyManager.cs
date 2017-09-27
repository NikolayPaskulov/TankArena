using GameEngine.Lobby.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameEngine.Lobby.Models;
using GameEngine.Models.Contracts;

namespace GameEngine.Lobby.Services
{
    public class GameLobbyManager<TPlayer> : IGameLobbyManager<TPlayer> where TPlayer : IPlayer
    {
        public IList<GameLobby<TPlayer>> Lobbies { get; set; } = new List<GameLobby<TPlayer>>();

        public void AddLobby(GameLobby<TPlayer> lobby)
        {
            this.Lobbies.Add(lobby);
        }

        public void RemoveLobby(GameLobby<TPlayer> lobby)
        {
            this.Lobbies.Remove(lobby);
        }
    }
}

