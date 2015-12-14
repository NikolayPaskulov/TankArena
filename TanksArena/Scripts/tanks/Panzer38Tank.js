/// <reference path="~/Scripts/tanks/Tank.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var Panzer38Tank = (function () {

    function Panzer38Tank(name, scene) {
        Tank.call(this, name, 30, 30, 0.05, 1, 0.003, scene);
        this.type = "Panzer38";
    }

    Panzer38Tank.prototype = Object.create(Tank.prototype);
    T90aTank.prototype.constructor = Panzer38Tank;

    Panzer38Tank.prototype.Build = function (success) {
        var _this = this;

        var assetManager = new BABYLON.AssetsManager(this.scene);

        var t90aTask = assetManager.addMeshTask("t90a", "", "../../Content/Assets/Tanks/T90a/", "T90a.babylon");

        assetManager.load();

        t90aTask.onSuccess = function (result) {
            //for (var mesh in result.loadedMeshes) {
            //    result.loadedMeshes[mesh].position = _this.body.position;
            //    result.loadedMeshes[mesh].parent = _this.body;
            //}

            if (success && typeof success == 'function')
                success(true);
        }
    };

    return T90aTank;
})();