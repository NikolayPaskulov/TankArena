/// <reference path="~/Scripts/Bullets/BasicBullet.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />

var FireBullet = (function () {

    function FireBullet(origin, impact, type, tankAttack, scene) {
        BasicBullet.call(this, origin, impact, type, tankAttack, scene);
        this.fireSystem = this.CreateParticleSystem();
    }

    FireBullet.prototype = Object.create(BasicBullet.prototype);
    FireBullet.prototype.constructor = FireBullet;

    FireBullet.prototype.Dispose = function () {
        this.fireSystem.dispose();
        this.body.dispose();
    }

    FireBullet.prototype.CreateParticleSystem = function () {
        // Create a particle system
        var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

        //Texture of each particle
        fireSystem.particleTexture = new BABYLON.Texture("../../Content/Images/textures/flare.png", scene);

        // Where the particles come from
        fireSystem.emitter = this.body; // the starting object, the emitter
        fireSystem.minEmitBox = new BABYLON.Vector3(-0.5, 1, -0.5); // Starting all from
        fireSystem.maxEmitBox = new BABYLON.Vector3(0.5, 1, 0.5); // To...

        // Colors of all particles
        fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        // Size of each particle (random between...
        fireSystem.minSize = 0.3;
        fireSystem.maxSize = 1;

        // Life time of each particle (random between...
        fireSystem.minLifeTime = 0.2;
        fireSystem.maxLifeTime = 0.4;

        // Emission rate
        fireSystem.emitRate = 600;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

        // Direction of each particle after it has been emitted
        fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
        fireSystem.direction2 = new BABYLON.Vector3(0, -4, 0);

        // Angular speed, in radians
        fireSystem.minAngularSpeed = 0;
        fireSystem.maxAngularSpeed = Math.PI;

        // Speed
        fireSystem.minEmitPower = 1;
        fireSystem.maxEmitPower = 3;
        fireSystem.updateSpeed = 0.007;

        // Start the particle system
        fireSystem.start();

        return fireSystem;
    }

    return FireBullet;
})();