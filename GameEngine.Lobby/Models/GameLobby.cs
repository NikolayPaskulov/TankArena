using GameEngine.Models.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameEngine.Lobby.Models
{
    public class GameLobby<TPlayer> where TPlayer : IPlayer
    {
        public string Id { get; set; }

        public int MixMembers { get; set; }

        public int MaxMembers { get; set; }

        public IList<GameLobbyMember<TPlayer>> Members { get; } = new List<GameLobbyMember<TPlayer>>();

        public void AddMember(GameLobbyMember<TPlayer> member)
        {
            this.Members.Add(member);
        }

        public void RemoveMember(GameLobbyMember<TPlayer> member)
        {
            this.Members.Remove(member);
        }
        public void RemoveMember(string id)
        {
            var member = this.Members.FirstOrDefault(m => m.Id == id);
            if (member != null)
                this.Members.Remove(member);
        }
    }
}
