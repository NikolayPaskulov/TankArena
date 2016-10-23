/// <reference path="~/Scripts/common/Controls.js" />

var InputLoop = (function () {

    function InputLoop(clientQ, serverQ, scene) {
        this.controls = new Controls();
        this._clientQ = clientQ;
        this._serverQ = serverQ;
        this.scene = scene;
    }

    InputLoop.prototype.Start = function (fps) {
        this.RegisterLoop(fps);
        this.RegisterEvents();

    };

    InputLoop.prototype.RegisterLoop = function (fps) {
        Loop.call(this, this._Callback, fps);
    };

    InputLoop.prototype.RegisterEvents = function () {

    };

    InputLoop.prototype._Callback = function () {
        var inputs = [];

        if (this.controls.MovingForward())
            inputs.push({ Source: "Keyboard", Directon: "Forward", Type : "Transform"});
        else if (this.controls.MovingBackward())
            inputs.push({ Source: "Keyboard", Directon: "Backward", Type: "Transform" });

        if (this.controls.MovingLeft())
            inputs.push({ Souce: "Keyboard", Directon: "Left", Type : "Rotation" });
        else if (this.controls.MovingRight())
            inputs.push({ Souce: "Keyboard", Directon: "Right", Type: "Rotation" });

        for (var i = 0; i < inputs.length; i++) {
            this._clientQ.Enqueue(inputs[i]);
            this._serverQ.Enqueue(inputs[i]);
        }
    }

    return InputLoop;
})();