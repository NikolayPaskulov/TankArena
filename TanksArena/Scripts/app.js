/// <reference path="~/babylon.js" />


(function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);



    var createScene = function () {

        // This creates a Babylon Scene object (not a shape/mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions an free camera
        var camera = new BABYLON.FreeCamera("camera1",
            new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(new BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, false);

        // This creates a light - aimed 0,1,0 - to the sky.
        var light = new BABYLON.HemisphericLight("light1",
            new BABYLON.Vector3(0, 1, 0), scene);

        // Dim the light a small amount
        light.intensity = .5;

        // Skybox




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

})();

