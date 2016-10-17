/// <reference path="~/Scripts/v2/Tanks/TanksFactory.js" />

var TanksService = (function () {

    function TanksService() {
        this.tanks = [];
    }

    TanksService.prototype.CreateTank = function (name, type, scene, success) {
        var tank = TanksFactory.Craete(name, type, scene, success);

        this.tanks.push(tank);

        return tank;
    }

    
    return new TanksService();
})();