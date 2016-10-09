/// <reference path="~/Scripts/libs/babylon.max.js" />


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

            this.Reload();
        }
    }

    BulletsManager.prototype.Update = function () {
        var self = this;

        for (var b in this.bullets) {
            var bullet = this.bullets[b];

            //if (CheckForCollision(bullet))
            //    delete this.bullets[b];
            //else
                bullet.Update();
        }

        function CheckForCollision(bullet) {
            var meshes = self.scene.meshes.filter(function (m) { return m != self.tank.body && m != self.tank.gun && m.name != "skyBox" && m != bullet.body; });
            for (var i = 0; i < meshes.length; i++) {
                var mesh = meshes[i];
                if (bullet.body.intersectsMesh(mesh, true)) {
                    var partSystem = AnimationsHelper.BulletExplosion(bullet.body, self.scene);
                    partSystem.onDispose = function () {
                        bullet.Dispose();
                    }
                    return true
                }
            }
            return false;

        }
    }

    BulletsManager.prototype.Reload = function () {
        var _this = this;

        setTimeout(function () {
            _this.reloading = false;
        }, this.cooldown);
    }

    return BulletsManager;
})();