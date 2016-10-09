/// <reference path="~/Scripts/common/KeyboardHelper.js" />

var Controls = (function () {

    function Controls() {
        this.helper = new KeyboardHelper();
    }

    Controls.prototype.MovingForward = function () {
        return this.helper.IsKeyPressed(this.helper.keys.W) || this.helper.IsKeyPressed(this.helper.keys.Up);
    };

    Controls.prototype.MovingBackward = function () {
        return this.helper.IsKeyPressed(this.helper.keys.S) || this.helper.IsKeyPressed(this.helper.keys.Down);
    };

    Controls.prototype.MovingLeft = function () {
        return this.helper.IsKeyPressed(this.helper.keys.A) || this.helper.IsKeyPressed(this.helper.keys.Left);
    };

    Controls.prototype.MovingRight = function () {
        return this.helper.IsKeyPressed(this.helper.keys.D) || this.helper.IsKeyPressed(this.helper.keys.Right);
    };

    return Controls;
})();