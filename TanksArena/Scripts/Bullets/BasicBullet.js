/// <reference path="~/Scripts/libs/babylon.max.js" />

var BasicBullet = (function () {

    function BasicBullet(origin, impact, type, tankAttack, scene) {
        this.speed = 0.5;
        this.maxDistance = 1000;
        this.bulletDmg = 0;
        this.origin = origin,
        this.impact = impact;
        this.type = type;
        this.dmg = tankAttack + this.bulletDmg;
        this.scene = scene;
        this.body = BABYLON.Mesh.CreateSphere("bullet" + Math.random(), 8, 0.5, scene);
        this.body.position = this.origin;
    }

    BasicBullet.prototype.Update = function () {
        var directionVector = this.body.position.subtract(this.impact).normalize();
        this.body.position = this.body.position.subtract(directionVector.scale(this.speed));
    }

    BasicBullet.prototype.Remove = function () {
        this.body.dispose();
    }

    return BasicBullet;
})();