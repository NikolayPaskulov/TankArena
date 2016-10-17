/// <reference path="~/Scripts/v2/Tanks/Tank.js" />
/// <reference path="~/Scripts/common/SoundEffectsService.js" />
/// <reference path="~/Scripts/v2/Tanks/T90aTank.js" />
/// <reference path="~/Scripts/v2/Tanks/TanksService.js" />
/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/v3/Enums/TankType.js" />


(function () {
    // The function onload is loaded when the DOM has been loaded
    document.addEventListener("DOMContentLoaded", function () {

        var scene = new Scene();

        var app = new Application(scene);

        window.scene = scene;
        window.app = app;

        app.Start();
    }, false);
})();
