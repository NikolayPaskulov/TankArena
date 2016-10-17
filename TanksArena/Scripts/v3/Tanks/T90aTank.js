/// <reference path="~/Scripts/v2/Tanks/Tank.js" />
/// <reference path="~/Scripts/v2/Bullets/BulletsFactory.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var T90aTank = (function () {

    function T90aTank(name, scene, success) {
        Tank.call(this, name, "T90a", BulletFactory.Types.FIRE_BULLET, 30, 30, 0.1, 2, 2, 0.009, {mass : 30, friction : 1, restitution: 0 }, scene, success);
    }

    T90aTank.prototype = Object.create(Tank.prototype);
    T90aTank.prototype.constructor = T90aTank;

    T90aTank.prototype.Build = function (success) {
        var _this = this;

        var assetManager = new BABYLON.AssetsManager(this.scene);

        var t90aTask = assetManager.addMeshTask("t90a", "", "../../../Content/Assets/Tanks/T90a/", "T90a.babylon");

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
            material.diffuseTexture = new BABYLON.Texture('../../../Content/Assets/Tanks/T90a/textures/8eca739b.jpg', _this.scene);

            _this.body.material = material;
            _this.gun.material = material;

            if (success && typeof success == 'function')
                success(true);
        }
    };

    return T90aTank;
})();