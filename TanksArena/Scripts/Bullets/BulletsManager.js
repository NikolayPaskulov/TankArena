

var BulletsManager = (function () {

    function BulletsManager(cooldown, attacks, scene) {
        this.cooldown = cooldown;
        this.attacks = attacks;
        this.scene = scene;

        this.bullets = [];
        this.Types = BulletFactory.Types;
        this.reloading = false;
    }

    BulletsManager.prototype.Fire = function (direction, type, tankAttack) {
        this.reloading = true;
        this.attacks -= 1;

        var bullet = BulletFactory.Create(direction, type, tankAttack, this.scene);
        this.bullets.push(bullet);

        // Fire Logic.

        this.Reload();
    }

    BulletsManager.prototype.Update = function () {
        for (var i = 0, len = this.bullets.length; i < len; i++) {
            this.bullets[i].Update();
        }
    }

    BulletsManager.prototype.Reload = function () {
        var _this = this;

        setTimeout(function () {
            _this.attacks += 1;
            _this.reloading = false;
        }, this.cooldown);
    }

    return BulletsManager;
})();