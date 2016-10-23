using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Owin;
using Owin;
using TanksArena.IoC;

namespace TanksArena
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            Bootstrapper.Bootsrap();

            var unityHubActivator = new HubActivator();
            GlobalHost.DependencyResolver.Register(typeof(IHubActivator), () => unityHubActivator);

            app.MapSignalR(new HubConfiguration() { EnableDetailedErrors = true });
        }
    }
}