

var MathHelper = (function () {
    function MathHelper() {}

    MathHelper.prototype.ExponentialEaseOut = function (v) {
        return v === 1 ? 1 : -Math.pow(2, -10 * v) + 1;
    }

    MathHelper.prototype.Clamp = function (v, low, high) {
        return (v < low) ? low : ((v > high) ? high : v);
    }

    return new MathHelper();
})();