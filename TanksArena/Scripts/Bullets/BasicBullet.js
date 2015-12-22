/// <reference path="~/Scripts/libs/babylon.max.js" />

var BasicBullet = (function () {

    function BasicBullet(direction, type, tankAttack, scene) {
        this.speed = 100;
        this.maxDistance = 1000;
        this.bulletDmg = 0;
        this.direction = direction;
        this.type = type;
        this.dmg = tankAttack + this.bulletDmg;
        this.scene = scene;
        this.body = BABYLON.Mesh.CreateSphere("bullet" + Math.random(), 8, 1, scene);
    }

    BasicBullet.prototype.Update = function () {
        // Updating Position.
    }

    return BasicBullet;
})();