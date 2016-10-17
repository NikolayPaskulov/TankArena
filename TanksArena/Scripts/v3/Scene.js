/// <reference path="~/Scripts/libs/babylon.max.js" />


var Scene = (function () {

    function Scene() {}

    Scene.prototype.CreateScene = function (canvas, engine) {
        this.canvas = canvas;
        this.engine = engine;

        this.scene = new BABYLON.Scene(engine);

        this.InitializePhysics();
        this.InitializeCameras(canvas);
        this.InitializeLights();
        this.InitializeGround();

        return this.scene;
    }


    Scene.prototype.InitializePhysics = function () {
        this.gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        this.physicsPlugin = new BABYLON.CannonJSPlugin();

        this.scene.enablePhysics(this.gravityVector, this.physicsPlugin);
    }

    Scene.prototype.InitializeCameras = function () {
        var camera = new BABYLON.FreeCamera("mainCamera",
            new BABYLON.Vector3(54, 15, 8), this.scene);

        camera.setTarget(new BABYLON.Vector3.Zero());

        camera.attachControl(this.canvas, false);
    }

    Scene.prototype.InitializeLights = function () {
        var light = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1, -2, -1), this.scene);
        light.position = new BABYLON.Vector3(0, 40, 0);

        light.intensity = 0.6;
    }

    Scene.prototype.InitializeGround = function () {
        var scale = 180;
        var scaling = 30;

        var ground = BABYLON.Mesh.CreateGround("ground", scale * scaling, scale * scaling, 100, this.scene);

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, this.scene);

        var groundMaterian = new BABYLON.StandardMaterial("ground", this.scene);
        groundMaterian.diffuseTexture = new BABYLON.Texture("../Content/Images/textures/grounds/ground.jpg", this.scene);
        groundMaterian.diffuseTexture.uScale = 6;
        groundMaterian.diffuseTexture.vScale = 6;
        groundMaterian.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterian;
    }

    return Scene;
})();