/// <reference path="~/Scripts/KeyboardHelper.js" />
/// <reference path="~/Scripts/tanks/T90aTank.js" />

var Player = (function () {

    function Player(name, scene) {
        this.name = name;
        this.tank = new T90aTank(name, scene);
        this.camera = new BABYLON.ArcRotateCamera(name + "Camera", 1, 0.8, 50, new BABYLON.Vector3(0, 1, 0), scene);
        this.camera.keysUp = [];
        this.camera.keysDown = [];
        this.camera.keysLeft = [];
        this.camera.keysRight = [];
    }

    Player.prototype.AddToScene = function (position, onReady) {
        _this = this;
        this.tank.Initialize(function (success) {
            _this.tank.BeforeUpdate = function () {
                _this.camera.target = _this.tank.body.position;
            }

            if (success) {
                _this.tank.body.position.x = position.x;
                _this.tank.body.position.y = position.y;
                _this.tank.body.position.z = position.z;
            }

            if (onReady && typeof onReady == 'function') {
                onReady();
            }
        });
    }

    return Player;
})();