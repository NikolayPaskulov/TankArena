/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/v3/InputLoop.js" />
/// <reference path="~/Scripts/v3/Loop.js" />
/// <reference path="~/Scripts/v3/Queue.js" />

var Application = (function () {

    function Application(scene) {
        this.canvas = document.querySelector('canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.IScene = scene;
        this._scene = null;

        this.Server = new Server();

        this.ServerQ = new Queue();
        this.ClientQ = new Queue();

        this.InputLoop = null;
        this.ServerLoop = new ServerLoop(this.Server, this.ServerQ);
        this.CommandHandlers = [];
    }

    Application.prototype.Start = function () {
        this._scene = this.IScene.CreateScene(this.canvas, this.engine);

        this.InitializeSounds();
        this.StartEngineLoop();
        this.AddResizeHandler();

        this.InputLoop = new InputLoop(this.ClientQ, this.ServerQ, this._scene);
        this.InputLoop.Start(60);

        this.ServerLoop.Start(60);
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