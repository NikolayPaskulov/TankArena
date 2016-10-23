using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TanksArena.Models.Contracts;

namespace TanksArena.Business.Contracts.Factories
{
    public interface IPlayerFactory
    {
        IPlayer Create(IPlayerConfig config); 
    }
}
