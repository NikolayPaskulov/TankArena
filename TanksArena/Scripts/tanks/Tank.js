/// <reference path="~/Scripts/KeyboardHelper.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/Bullets/BulletsManager.js" />


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
        this.BulletsManager = new BulletsManager(3000, 3, scene);
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

                _this.BulletsManager.Update();

               

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

                _this.AfterUpdate();
            }
        });
    };

    Tank.prototype.AfterUpdate = function () { };

    Tank.prototype.UpdateTankSpeed = function () {
        if (this.keysHelper.IsKeyPressed(this.keysHelper.keys.W) ||
                   this.keysHelper.IsKeyPressed(this.keysHelper.keys.Up)) {
            if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration * this.scene.getAnimationRatio();
            }
        } else if (this.keysHelper.IsKeyPressed(this.keysHelper.keys.S) ||
                   this.keysHelper.IsKeyPressed(this.keysHelper.keys.Down)) {
            if (this.speed > (this.maxSpeed * -1) / 2) {
                this.speed -= (this.acceleration * this.scene.getAnimationRatio()) / 2;
            }
        }
    }

    Tank.prototype.UpdateTankRotation = function () {
        if (this.body && this.body.position) {

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
    }

    return Tank;
})();