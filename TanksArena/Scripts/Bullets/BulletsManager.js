

var BulletsManager = (function () {

    function BulletsManager(cooldown, scene) {
        this.cooldown = cooldown;
        this.scene = scene;
        this.bullets = [];
        this.Types = BulletFactory.Types;
        this.reloading = false;
    }

    BulletsManager.prototype.Fire = function (origin, impact, type, tankAttack) {
        if (!this.reloading) {
            this.reloading = true;

            var bullet = BulletFactory.Create(origin, impact, type, tankAttack, this.scene);
            this.bullets.push(bullet);

            this.Reload();
        }
    }

    BulletsManager.prototype.Update = function () {
        for (var i = 0, len = this.bullets.length; i < len; i++) {
            this.bullets[i].Update();
            this.CheckCollision(this.bullets[i]);
        }
    }

    BulletsManager.prototype.CheckCollision = function (bullet) {

    }

    BulletsManager.prototype.Reload = function () {
        var _this = this;

        setTimeout(function () {
            _this.reloading = false;
        }, this.cooldown);
    }

    return BulletsManager;
})();