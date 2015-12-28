/// <reference path="~/Scripts/KeyboardHelper.js" />
/// <reference path="~/Scripts/tanks/T90aTank.js" />

var Player = (function () {

    function Player(name, scene) {
        this.name = name;
        this.tank = new T90aTank(name, scene);
        this.scene = scene;
        this.camera = new BABYLON.FollowCamera(name + "Camera", BABYLON.Vector3.Zero(), scene),
        this.camera.keysUp = [];
        this.camera.keysDown = [];
        this.camera.keysLeft = [];
        this.camera.keysRight = [];
    }

    Player.prototype.AddToScene = function (position, onReady) {
        _this = this;
        this.tank.Initialize(function (success) {
            _this.tank.BeforeUpdate = function () {
                _this.camera.rotationOffset = _this.tank.speed < 0 ? 0 : 180;
            }

            if (success) {
                _this.tank.body.position.x = position.x;
                _this.tank.body.position.y = position.y;
                _this.tank.body.position.z = position.z;

                _this.camera.target = _this.tank.body;
                _this.camera.radius = 90;
                _this.camera.heightOffset = 25;
                _this.camera.rotationOffset = 180;
            }

            if (onReady && typeof onReady == 'function') {
                onReady();
            }
        });
    }

    return Player;
})();