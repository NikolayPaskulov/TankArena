/// <reference path="~/Scripts/libs/babylon.max.js" />

var BasicBullet = (function () {

    function BasicBullet(origin, impact, type, tankAttack, scene) {
        this.speed = 10;
        this.maxDistance = 1000;
        this.bulletDmg = 0;
        this.origin = origin.clone(),
        this.impact = impact.clone();
        this.type = type;
        this.dmg = tankAttack + this.bulletDmg;
        this.scene = scene;
        this.body = BABYLON.Mesh.CreateSphere("bullet" + Math.random(), 8, 0.5, scene);
        this.body.position = this.origin;
        this.direction = vector3Reverse(this.origin.clone().subtract(this.impact).normalize());
    }

    BasicBullet.prototype.Update = function () {
        this.body.position.addInPlace((this.direction).scale(this.speed));
    }

    function vector3Reverse(v) {
        v.x = v.x * -1;
        v.y = v.y * -1;
        v.z = v.z * -1;
        return v;
    }

    BasicBullet.prototype.Dispose = function () {
        this.body.dispose();
    };

    return BasicBullet;
})();