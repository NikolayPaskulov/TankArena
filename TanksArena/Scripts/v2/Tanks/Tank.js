/// <reference path="~/Scripts/common/KeyboardHelper.js" />
/// <reference path="~/Scripts/common/SoundEffectsService.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/Bullets/BulletsManager.js" />


var Tank = (function () {

    function Tank(name,
                  tankType,
                  bulletType,
                  attack,
                  def,
                  acceleration,
                  maxForwardSpeed,
                  maxBackwardSpeed,
                  rotationSpeed,
                  physics,
                  scene,
                  success) {

        this.name = name;
        this.attack = attack;
        this.def = def;
        this.acceleration = acceleration;
        this.MAX_SPEED = maxForwardSpeed;
        this.MAX_REVERSE_SPEED = maxBackwardSpeed;
        this.rotationSpeed = rotationSpeed;
        this.scene = scene;
        this.body = null;
        this.gun = null;
        this.speed = 0;
        this.MAX_GUN_ROTATION = 0.5;

        this.tankType = tankType;
        this.bulletType = bulletType;

        //physics
        this.mass = physics.mass; //Mass in kg. A 0 as a value will create a static impostor - good for floors.
        this.friction = physics.friction; // is the impostor's friction when colliding against other impostors.
        this.restitution = physics.restitution; // is the amount of force the body will "give back" when colliding. A low value will create no bounce, a value of 1 will be a very bouncy interaction.

        this.BulletsManager = new BulletsManager(this, 500, scene);

        this.Build(success);
    }

    Tank.prototype.Fire = function (impact) {
        var self = this;
        this.BulletsManager.Fire(this.gun.getBoundingInfo().boundingBox.center, impact, this.bulletType, this.attack, function () {
            SoundEffectsService.TankFire();
        });
    }

    Tank.prototype.Build = function () { };

    return Tank;
})();