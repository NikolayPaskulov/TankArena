using Microsoft.Owin;
using Owin;

namespace TanksArena
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}