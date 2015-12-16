/// <reference path="~/Scripts/tanks/Tank.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var T90aTank = (function () {

    function T90aTank(name, scene) {
        Tank.call(this, name, 30, 30, 0.1, 2, 0.009, scene);
        this.type = "T90a";
    }

    T90aTank.prototype = Object.create(Tank.prototype);
    T90aTank.prototype.constructor = T90aTank;

    T90aTank.prototype.Build = function (success) {
        var _this = this;

        var assetManager = new BABYLON.AssetsManager(this.scene);

        var t90aTask = assetManager.addMeshTask("t90a", "", "../../Content/Assets/Tanks/T90a/", "T90a.babylon");

        assetManager.load();

        t90aTask.onSuccess = function (result) {
            var body = result.loadedMeshes.filter(function (item) { return item.name == "Body" });
            var gun = result.loadedMeshes.filter(function (item) { return item.name == "Gun" });

            Debug("gun", gun);

            _this.body = body[0];
            _this.gun = gun[0];
            _this.body.scaling.y = 5;
            _this.body.scaling.x = 7;
            _this.body.scaling.z = 5;

            _this.gun.parent = _this.body;
            _this.gun.rotation = BABYLON.Vector3.Zero();

            var material = new BABYLON.StandardMaterial("bodyMaterial", _this.scene);
            //bodyMaterial.diffuseTexture = new BABYLON.Texture('../../Content/Assets/Tanks/T90a/textures/3fea26f0.jpg', _this.scene);
            //bodyMaterial.diffuseTexture = new BABYLON.Texture('../../Content/Assets/Tanks/T90a/textures/8430f8ee.jpg', _this.scene);
            material.diffuseTexture = new BABYLON.Texture('../../Content/Assets/Tanks/T90a/textures/8eca739b.jpg', _this.scene);

            _this.body.material = material;
            _this.gun.material = material;

            if (success && typeof success == 'function')
                success(true);
        }
    };

    return T90aTank;
})();