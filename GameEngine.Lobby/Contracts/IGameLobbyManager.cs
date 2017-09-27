using GameEngine.Lobby.Models;
using GameEngine.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameEngine.Lobby.Contracts
{
    public interface IGameLobbyManager<TPlayer> where TPlayer : IPlayer
    {
        IList<GameLobby<TPlayer>> Lobbies { get; }
        void AddLobby(GameLobby<TPlayer> lobby);
        void RemoveLobby(GameLobby<TPlayer> lobby);
    }
}
