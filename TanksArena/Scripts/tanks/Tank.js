/// <reference path="~/Scripts/KeyboardHelper.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var Tank = (function () {

    function Tank(name, attack, def, acceleration, maxSpeed, rotationSpeed, scene) {
        this.name = name;
        this.attack = attack;
        this.def = def;
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.rotationSpeed = rotationSpeed;
        this.scene = scene;
        this.body = null;
        this.gun = null;
        this.speed = 0;
        this.keysHelper = new KeyboardHelper();
    }

    Tank.prototype.Initialize = function (success) {
        this.Build(success);
        this.Update();
        return this;
    }

    Tank.prototype.Build = function () { };

    Tank.prototype.BeforeUpdate = function () { };

    Tank.prototype.Update = function () {
        var _this = this;

        this.scene.registerBeforeRender(function () {
            if (_this.scene.isReady()) {
                _this.BeforeUpdate();

                if (_this.keysHelper.IsKeyPressed(_this.keysHelper.keys.W) ||
                    _this.keysHelper.IsKeyPressed(_this.keysHelper.keys.Up)) {
                    if (_this.speed < _this.maxSpeed) {
                        _this.speed += _this.acceleration * _this.scene.getAnimationRatio();
                    }
                } else if (_this.keysHelper.IsKeyPressed(_this.keysHelper.keys.S) ||
                           _this.keysHelper.IsKeyPressed(_this.keysHelper.keys.Down)) {
                    if (_this.speed > (_this.maxSpeed * -1) / 2) {
                        _this.speed -= (_this.acceleration * _this.scene.getAnimationRatio()) / 2;
                    }
                }

                if (_this.body && _this.body.position) {

                    if (_this.speed != 0) {
                        if (_this.keysHelper.IsKeyPressed(_this.keysHelper.keys.A) ||
                           _this.keysHelper.IsKeyPressed(_this.keysHelper.keys.Left)) {
                            _this.body.rotation.y -= _this.rotationSpeed * _this.scene.getAnimationRatio();
                        } else if (_this.keysHelper.IsKeyPressed(_this.keysHelper.keys.D) ||
                           _this.keysHelper.IsKeyPressed(_this.keysHelper.keys.Right)) {
                            _this.body.rotation.y += _this.rotationSpeed * _this.scene.getAnimationRatio();
                        }
                    }

                    _this.body.position.z += Math.cos(_this.body.rotation.y) * _this.speed;
                    _this.body.position.x += Math.sin(_this.body.rotation.y) * _this.speed;
                }

                var pickResult = _this.scene.pick(_this.scene.pointerX, _this.scene.pointerY);

                _this.AfterUpdate();
            }
        });
    };

    Tank.prototype.AfterUpdate = function () { };

    return Tank;
})();