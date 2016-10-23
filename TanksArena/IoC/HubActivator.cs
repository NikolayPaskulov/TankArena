using Microsoft.AspNet.SignalR.Hubs;

namespace TanksArena.IoC
{
    public class HubActivator : IHubActivator
    {
        public IHub Create(HubDescriptor descriptor)
        {
            return (IHub)System.Web.Mvc.DependencyResolver.Current.GetService(descriptor.HubType);
        }
    }
}