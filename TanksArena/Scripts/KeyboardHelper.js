

var KeyboardHelper = (function () {

    function KeyboardHelper() {
        this.keysPressed = {};
        this.keys = {
            Q: 81, W: 87, E: 69, R: 82, T: 84, Y: 89, U: 85, I: 73, O: 79, P: 80, OpenBracket: 219, CloseBracket: 221,
            A: 65, S: 83, D: 68, F: 70, G: 71, H: 72, J: 74, K: 75, L: 76, SemiColon: 186, SingleQuota: 222,
            BackSlash: 220, Z: 90, X: 88, C: 67, V: 86, B: 66, N: 78, M: 77, Comma: 188, Period: 190,
            ForwardSlash: 191, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57,
            Ctrl: false, Alt: false, Up : 38 , Down : 40, Left : 37, Right : 39
        };
        this.AddEvents();

        window.keysPressed = this.keysPressed;
    }

    KeyboardHelper.prototype.AddEvents = function () {
        var _this = this;

        window.addEventListener("keydown", function (event) {
            _this.AddKey(event.keyCode);
            _this.UpdateBooleanKeys(event);
        });

        window.addEventListener("keyup", function (event) {
            _this.RemoveKey(event.keyCode);
            _this.UpdateBooleanKeys(event);
        });
    }

    KeyboardHelper.prototype.AddKey = function (keyCode) {
        this.keysPressed[keyCode] = true;
    }

    KeyboardHelper.prototype.RemoveKey = function (keyCode) {
        this.keysPressed[keyCode] = false;
    }

    KeyboardHelper.prototype.UpdateBooleanKeys = function (event) {

    }

    KeyboardHelper.prototype.IsKeyPressed = function (key) {
        return this.keysPressed[key] || false;
    }

    return KeyboardHelper;
})();