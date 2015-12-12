/// <reference path="~/Scripts/libs/babylon.max.js" />


(function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {

        // This creates a Babylon Scene object (not a shape/mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions an free camera
        var camera = new BABYLON.FreeCamera("camera1",
            new BABYLON.Vector3(0, 100, -20), scene);

        // This targets the camera to scene origin
        camera.setTarget(new BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, false);

        // This creates a light - aimed 0,1,0 - to the sky.
        var light = new BABYLON.HemisphericLight("sun", new BABYLON.Vector3(0, 0, 0), scene);
        //light.position.add(new BABYLON.Vector3(0, 50, 0));

        light.intensity = 0.6;

        Debug("light", light);

        var scale = 120;
        var scaling = 30;

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", scale, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Content/Images/textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        skybox.scaling.x = scaling;
        skybox.scaling.z = scaling;
        skybox.scaling.y = 10;

        //var ground = BABYLON.Mesh.CreateGround("ground", 1400, 1400, 8, scene);
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../Content/Images/textures/grounds/terrainbasic.png", scale * scaling, scale * scaling, 100, 0, 130, scene);
        var groundMaterian = new BABYLON.StandardMaterial("ground", scene);
        groundMaterian.diffuseTexture = new BABYLON.Texture("../Content/Images/textures/grounds/ground.jpg", scene);
        groundMaterian.diffuseTexture.uScale = 6;
        groundMaterian.diffuseTexture.vScale = 6;
        groundMaterian.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterian;

        ground.position.y = -350;

        //Set gravity for the scene (G force like, on Y-axis)
        scene.gravity = new BABYLON.Vector3(0, -9, 0);

        // Enable Collisions
        scene.collisionsEnabled = true;



        var tank = BABYLON.Mesh.CreateBox("tank", 10, scene);
        tank.position.add(new BABYLON.Vector3(0, 30, 0));

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });


    // DEBUG
    window.scene = scene;

})();

function Debug(name, obj) {
    window[name] = obj;
}

