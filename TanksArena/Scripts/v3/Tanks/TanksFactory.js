/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/v2/Tanks/T90aTank.js" />
/// <reference path="~/Scripts/v2/Tanks/Tank.js" />
/// <reference path="~/Scripts/v2/Enums/TankType.js" />

var TanksFactory = (function () {

    function TanksFactory() {}

    TanksFactory.prototype.Craete = function (name, type, scene, success) {
        switch (type) {
            case TankType.T90aTank :
                return new T90aTank(name, scene, success)
            default:
                throw new Error("Tank with provided type is not supported!");
        }
    }

    return new TanksFactory();

})();