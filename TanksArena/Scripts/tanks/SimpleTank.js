/// <reference path="~/Scripts/tanks/Tank.js" />

var SimpleTank = (function () {

    function SimpleTank(name, scene) {
        Tank.call(this, name, 30, 30, 0.05, 1, 0.003, scene);
        this.type = "simple";
    }

    SimpleTank.prototype = Object.create(Tank.prototype);
    SimpleTank.prototype.constructor = SimpleTank;

    SimpleTank.prototype.Build = function (success) {
        var tank = BABYLON.Mesh.CreateBox('tank', 10, this.scene);
        var tankMateriam = new BABYLON.StandardMaterial("tank", this.scene);
        tankMateriam.diffuseColor = BABYLON.Color3.Green();
        tank.material = tankMateriam;
        var tankHead = BABYLON.Mesh.CreateSphere("tankHead", 32, 7, this.scene);
        var tankHeadMaterial = new BABYLON.StandardMaterial("tankHead", this.scene);
        tankHeadMaterial.diffuseColor = BABYLON.Color3.Red();
        tankHead.parent = tank;
        tankHead.position.y = 5;
        tankHead.material = tankHeadMaterial;
        var tankGun = BABYLON.Mesh.CreateCylinder("gun", 10, 0.3, 0.3, 16, 8, this.scene);
        tankGun.parent = tankHead;
        tankGun.position.y = 4;
        tankGun.position.z = 7
        tankGun.rotation.x = 20;

        this.body = tank;

        if (success && typeof success == 'function')
            success(true);
    };

    return SimpleTank;
})();