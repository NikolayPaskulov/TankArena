using Microsoft.AspNet.SignalR.Hubs;
using SimpleInjector;
using SimpleInjector.Integration.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TanksArena.Business.Builders;
using TanksArena.Business.Contracts.Builders;
using TanksArena.Business.Contracts.Directors;
using TanksArena.Business.Contracts.Factories;
using TanksArena.Business.Contracts.Services;
using TanksArena.Business.Directors;
using TanksArena.Business.Factories;
using TanksArena.Business.Services;
using TanksArena.Physics;
using TanksArena.Physics.Contracts;

namespace TanksArena.IoC
{
    public static class Bootstrapper
    {
        public static Container Bootsrap() 
        {
            var container = new Container();
            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));

            container.RegisterSingleton<IGameManager<IHub>, GameManager>();
            container.RegisterSingleton<IGameDirector<IHub>, GameDirector>();
            container.RegisterSingleton<IGameBuilder<IHub>, GameBuilder>();
            container.RegisterSingleton<IPlayerFactory, PlayerFactory>();

            return container;
        }
    }
}