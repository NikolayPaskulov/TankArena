/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/v2/Tanks/TanksService.js" />

var BulletsManager = (function () {

    function BulletsManager(tank, cooldown, scene) {
        this.tank = tank;
        this.cooldown = cooldown;
        this.scene = scene;
        this.bullets = {};
        this.reloading = false;
    }

    BulletsManager.prototype.Fire = function (origin, impact, type, tankAttack, success) {
        if (!this.reloading) {
            success()
            this.reloading = true;

            var bullet = BulletFactory.Create(this.tank, origin, impact, type, tankAttack, this.scene);
            this.bullets[bullet.body.name] = bullet;

            this.AddCollision(bullet);

            bullet.ApplyImpulse();

            this.Reload();
        }
    }

    BulletsManager.prototype.AddCollision = function (bullet) {
        var self = this;
        var tanks = TanksService.tanks.filter(function (t) { return t != self.tank });

        tanks.forEach(function (t) {
            bullet.body.physicsImpostor.registerOnPhysicsCollide(t.body.physicsImpostor, function (a, b) {
                var partSystem = AnimationsHelper.BulletExplosion(bullet.body.position, self.scene);

                bullet.Dispose();
            });
        });
    }

    BulletsManager.prototype.Reload = function () {
        var _this = this;

        setTimeout(function () {
            _this.reloading = false;
        }, this.cooldown);
    }

    return BulletsManager;
})();