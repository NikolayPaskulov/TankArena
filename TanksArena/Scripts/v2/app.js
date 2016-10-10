/// <reference path="~/Scripts/v2/Tanks/Tank.js" />
/// <reference path="~/Scripts/common/SoundEffectsService.js" />
/// <reference path="~/Scripts/v2/Tanks/T90aTank.js" />
/// <reference path="~/Scripts/v2/Tanks/TanksService.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/v2/Enums/TankType.js" />


(function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    // The function onload is loaded when the DOM has been loaded
    document.addEventListener("DOMContentLoaded", function () {
        var scene = createScene();

        SoundEffectsService.Initialize(scene);

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }, false);

    var createScene = function () {
        var scale = 180;
        var scaling = 30;

        // This creates a Babylon Scene object (not a shape/mesh)
        var scene = new BABYLON.Scene(engine);
        var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        var physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(gravityVector, physicsPlugin);

        // This creates and positions an free camera
        var camera = new BABYLON.FreeCamera("camera1",
            new BABYLON.Vector3(54, 15, 8), scene);

        // This targets the camera to scene origin
        camera.setTarget(new BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, false);

        // This creates a light - aimed 0,1,0 - to the sky.
        var light = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1, -2, -1), scene);
        light.position = new BABYLON.Vector3(0, 40, 0);

        light.intensity = 0.6;

        var ground = BABYLON.Mesh.CreateGround("ground", scale * scaling, scale * scaling, 100, scene);

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

        Debug("ground", ground);

        var groundMaterian = new BABYLON.StandardMaterial("ground", scene);
        groundMaterian.diffuseTexture = new BABYLON.Texture("../Content/Images/textures/grounds/ground.jpg", scene);
        groundMaterian.diffuseTexture.uScale = 6;
        groundMaterian.diffuseTexture.vScale = 6;
        groundMaterian.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterian;

        AddTank(canvas, scene);

        Debug("scene", scene);

        return scene;
    }
})();

function AddTank(canvas, scene) {
    var player = new Player("player", BABYLON.Vector3.Zero(), canvas, scene);

    
    var testTank = TanksService.CreateTank("enemy", TankType.T90aTank, scene, function () {

        testTank.body.position = new BABYLON.Vector3(50, 0, 50);

        testTank.body.physicsImpostor = new BABYLON.PhysicsImpostor(testTank.body,
                                                             BABYLON.PhysicsImpostor.BoxImpostor,
                                                             {
                                                                 mass: 12000,
                                                                 friction: 10,
                                                                 restitution: 0
                                                             },
                                                             scene);

    });

    Debug("player", player);
}

function Debug(name, obj) {
    window[name] = obj;
}
