


var Queue = (function () {

    function Queue() {
        this._array = [];
    }

    Queue.prototype.Dequeue = function () {
        return this._array.shift();
    };

    Queue.prototype.Enqueue = function (item) {
        this._array.push(item);
    };

    Queue.prototype.Clear = function () {
        this._array = [];
    }

    return Queue;
})();