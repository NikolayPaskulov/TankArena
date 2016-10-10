/// <reference path="~/Scripts/libs/babylon.max.js" />

var AnimationsHelper = (function () {

    function AnimationsHelper() {}


    AnimationsHelper.prototype.BulletExplosion = function (position, scene) {
        var particleSystem = new BABYLON.ParticleSystem("BulletExplosionPartSystem" + Math.random(), 20, scene);
        var p = position.clone();

        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("../Content/Images/textures/smoke3.png", scene);
        particleSystem.particleTexture.hasAlpha = true;
        // Where the particles come from
        particleSystem.emitter = p; // the starting object, the emitter
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, -1); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...
        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.5);
        particleSystem.color2 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.5);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
        // Size of each particle (random between...
        particleSystem.minSize = 2;
        particleSystem.maxSize = 5;
        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.2;
        particleSystem.maxLifeTime = 0.3;
        // Emission rate
        particleSystem.emitRate = 100000;
        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-1, 10, 1);
        particleSystem.direction2 = new BABYLON.Vector3(1, 10, -1);
        //particleSystem.direction2 = new BABYLON.Vector3(7, 0.5, 0);
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI / 8;
        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 7;
        particleSystem.updateSpeed = 0.001;

        particleSystem.targetStopDuration = 0.1;
        particleSystem.disposeOnStop = true;

        particleSystem.start();

        return particleSystem;
    }

    return new AnimationsHelper();
})();