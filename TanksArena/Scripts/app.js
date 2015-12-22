/// <reference path="~/Scripts/libs/babylon.max.js" />


(function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    // The function onload is loaded when the DOM has been loaded
    document.addEventListener("DOMContentLoaded", function () {
        var scene = createScene();

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }, false);

    var createScene = function () {

        // This creates a Babylon Scene object (not a shape/mesh)
        var scene = new BABYLON.Scene(engine);

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

        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../Content/Images/textures/grounds/terrainbasic.png", scale * scaling, scale * scaling, 100, 0, 530, scene, false, function () {
        });

        var groundMaterian = new BABYLON.StandardMaterial("ground", scene);
        groundMaterian.diffuseTexture = new BABYLON.Texture("../Content/Images/textures/grounds/ground.jpg", scene);
        groundMaterian.diffuseTexture.uScale = 6;
        groundMaterian.diffuseTexture.vScale = 6;
        groundMaterian.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterian;

        ground.position.y = -350;

        var player = new Player("niki", scene);

        Debug("player", player);
        Debug("ground", ground);
        Debug("scene", scene);
        Debug("camera", camera);
        Debug("light", light);

        var physicsEngine = new PhysicsEngine(new BABYLON.Vector3(0, -10, 0), ground, scene);

        //var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        //ground.receiveShadows = true;

        player.AddToScene(new BABYLON.Vector3(0, -300, 0), function () {
            player.camera.attachControl(canvas, false);
            scene.activeCamera = player.camera;
            physicsEngine.AddMesh(player.tank.body);
            //shadowGenerator.getShadowMap().renderList.push(player.tank.body);
        });


        scene.registerBeforeRender(function () {
            physicsEngine.UpdateMeshes();
        });

        return scene;
    };

})();

function Debug(name, obj) {
    window[name] = obj;
}

