

var Server = (function () {

    function Server() {
        this.isStarted = false;
        this._onStateChangedActions = [];

        this.StartServerConnection();
    }

    Server.prototype.StartServerConnection = function () {
        var self = this;

        this.hub = $.connection.tankMultiplayer;

        $.connection.hub.start()
            .done(function() { 
                self.isStarted = true;
                console.log("Server started! ConnectionId : " + $.connection.hub.id);
            })
            .fail(function () { console.log("Server error while starting."); });

        this.hub.client.stateChanged = this.StateChanged;
    }

    Server.prototype.SendInput = function (input) {
        if (this.isStarted)
            this.hub.server.handleCommands([input]);
    };

    Server.prototype.RegisterOnStateChangesAction = function(fn) {
        this._onStateChangedActions.push(fn);
    }

    Server.prototype.StateChanged = function (state) {
        for (var i = 0; i < this._onStateChangedActions.length; i++) {
            this._onStateChangedActions[i](state);
        }
    };

    return Server;
})();