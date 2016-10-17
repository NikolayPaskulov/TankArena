/// <reference path="~/Scripts/libs/babylon.max.js" />

var Bullet = (function () {

    function Bullet(tank, origin, impact, type, tankAttack, physics, scene) {
        this.tank = tank;
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
        this.physics = physics;

        this._AddPhysics();

    }

    Bullet.prototype._AddPhysics = function () {

        this.body.physicsImpostor = new BABYLON.PhysicsImpostor(this.body, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: this.physics.mass || 3,
            friction: this.physics.friction || 0,
            restitution: this.physics.restitution || 0
        })
    }

    Bullet.prototype.ApplyImpulse = function () {
        this.body.physicsImpostor.applyImpulse(this.direction.scale(2000), this.body.getAbsolutePosition());
    }

    Bullet.prototype.Update = function () {
        //this.body.position.addInPlace((this.direction).scale(this.speed));
    }

    function vector3Reverse(v) {
        v.x = v.x * -1;
        v.y = v.y * -1;
        v.z = v.z * -1;
        return v;
    }

    Bullet.prototype.Dispose = function () {
        this.body.dispose();
    };

    return Bullet;
})();