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
        this.maxGunRotation = 0.5;
        this.keysHelper = new KeyboardHelper();
        this.BulletsManager = new BulletsManager(10, scene);
    }

    Tank.prototype.Initialize = function (success) {
        this.Build(success);
        this.Update();
        return this;
    }

    Tank.prototype.Fire = function (impact) {
        this.BulletsManager.Fire(this.gun.getBoundingInfo().boundingBox.center, impact, this.BulletsManager.Types.BASIC_BULLET, this.attack);
    }

    Tank.prototype.Build = function () { };

    Tank.prototype.BeforeUpdate = function () { };

    Tank.prototype.Update = function () {
        var _this = this;

        this.scene.registerBeforeRender(function () {
            if (_this.scene.isReady()) {
                _this.BeforeUpdate();

                _this.BulletsManager.Update();

                _this.UpdateTankSpeed();

                if (_this.body && _this.body.position) {

                    _this.UpdateTankRotation();
                    _this.UpdateGunRotation();

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
        if (this.speed != 0) {
            if (this.keysHelper.IsKeyPressed(this.keysHelper.keys.A) ||
               this.keysHelper.IsKeyPressed(this.keysHelper.keys.Left)) {
                this.body.rotation.y -= this.rotationSpeed * this.scene.getAnimationRatio();
            } else if (this.keysHelper.IsKeyPressed(this.keysHelper.keys.D) ||
               this.keysHelper.IsKeyPressed(this.keysHelper.keys.Right)) {
                this.body.rotation.y += this.rotationSpeed * this.scene.getAnimationRatio();
            }
        }
    }

    Tank.prototype.UpdateGunRotation = function () {
        var screenWidth = window.innerWidth;
        var center = screenWidth / 2;
        this.gun.rotation.z = this.maxGunRotation / 100 * ((this.scene.pointerX - center) / center * 100);
    }

    return Tank;
})();