

var ServerLoop = (function () {

    function ServerLoop(server, serverQ) {
        this._server = server;
        this._serverQ = serverQ;
    }

    ServerLoop.prototype.Start = function (fps) {
        Loop.call(this, this._Callback, fps);
    }

    ServerLoop.prototype._Callback = function () {
        var input = this._serverQ.Dequeue();

        if (input)
            this._server.SendInput(input);
    }

    return ServerLoop;

})();