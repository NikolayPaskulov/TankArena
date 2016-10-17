/// <reference path="~/Scripts/libs/babylon.max.js" />

var Application = (function () {

    function Application(scene) {
        this.canvas = document.querySelector('canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.IScene = scene;
        this._scene = null;
    }

    Application.prototype.Start = function () {
        this._scene = this.IScene.CreateScene(this.canvas, this.engine);

        this.InitializeSounds();
        this.StartEngineLoop();
        this.AddResizeHandler();
    }

    Application.prototype.InitializeSounds = function () {
        SoundEffectsService.Initialize(this._scene);
    }

    Application.prototype.StartEngineLoop = function () {
        var self = this;
        this.engine.runRenderLoop(function () {
            self._scene.render();
        });
    }

    Application.prototype.AddResizeHandler = function () {
        var self = this;
        window.addEventListener("resize", function () {
            self.engine.resize();
        });

    }


    return Application;
})();