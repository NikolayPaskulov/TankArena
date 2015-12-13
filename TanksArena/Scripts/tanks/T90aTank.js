/// <reference path="~/Scripts/tanks/Tank.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var T90aTank = (function () {

    function T90aTank(name, scene) {
        Tank.call(this, name, 30, 30, 0.05, 1, 0.003, scene);
        this.type = "T90a";
    }

    T90aTank.prototype = Object.create(Tank.prototype);
    T90aTank.prototype.constructor = T90aTank;

    T90aTank.prototype.Build = function (success) {
        var _this = this;

        var assetManager = new BABYLON.AssetsManager(this.scene);

        this.body = BABYLON.Mesh.CreateBox(_this.name + "t90a", 10, this.scene);
        var bodyMat = new BABYLON.StandardMaterial("t90a", this.scene);
        bodyMat.alpha = 0.0;
        this.body.material = bodyMat;

        var t90aTask = assetManager.addMeshTask("t90a", "", "../../Content/Assets/Tanks/T90a/", "T90a.babylon");

        assetManager.load();

        t90aTask.onSuccess = function (result) {
            for (var mesh in result.loadedMeshes) {
                result.loadedMeshes[mesh].position = _this.body.position;
                result.loadedMeshes[mesh].parent = _this.body;
            }

            if (success && typeof success == 'function')
                success(true);
        }
    };

    return T90aTank;
})();