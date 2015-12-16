/// <reference path="~/Scripts/libs/babylon.max.js" />


var PhysicsEngine = (function () {

    function PhysicsEngine(gravity, ground, scene) {
        this.gravity = gravity || BABYLON.Vector3.Zero();
        this.ground = ground;
        this.scene = scene;
        this.meshes = [];
    }

    PhysicsEngine.prototype.AddMesh = function (mesh) {
        if (!this._isMeshAdded(mesh)) {
            this.meshes.push(mesh);
        }
    }

    PhysicsEngine.prototype.RemoveMesh = function (mesh) {
        var index = this.meshes.indexOf(mesh);
        if (index >= 0) {
            this.meshes.splice(index, 1);
        }
    }

    PhysicsEngine.prototype.UpdateMeshes = function () {
        for (var i = 0, len = this.meshes.length; i < len; i++) {
            var mesh = this.meshes[i];
            var ray = new BABYLON.Ray(new BABYLON.Vector3(mesh.position.x, this.ground.getBoundingInfo().boundingBox.maximumWorld.y + 1, mesh.position.z),
                                      new BABYLON.Vector3(0, -1, 0));
            var worldInverse = new BABYLON.Matrix();

            this.ground.getWorldMatrix().invertToRef(worldInverse);
            ray = BABYLON.Ray.Transform(ray, worldInverse);

            var pickInfo = this.ground.intersects(ray);

            if (pickInfo.hit) {
                mesh.position.y = pickInfo.pickedPoint.y + 0.5;
            }
        }
    }

    PhysicsEngine.prototype.CheckCollisionWithGround = function (mesh) {

    }

    PhysicsEngine.prototype._isMeshAdded = function (mesh) {
        return this.meshes.indexOf(mesh) >= 0;
    }

    return PhysicsEngine;
})();