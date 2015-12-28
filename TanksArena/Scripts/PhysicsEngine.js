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
            mesh._customEngine = { cach: { rotationX : mesh.rotation.x, rotationZ : 0 }};
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

            this.CheckCollisionWithGround(mesh);

            this.UpdateMeshRotation(mesh);
        }
    }

    PhysicsEngine.prototype.UpdateMeshRotation = function (mesh) {
        var ground = this.ground;
        var groundBox = this.ground.getBoundingInfo().boundingBox;
        var meshBox = mesh.getBoundingInfo().boundingBox;
        var width = this.CalculateDistance(meshBox.vectorsWorld[0], meshBox.vectorsWorld[3]);
        var height = this.CalculateDistance(meshBox.vectorsWorld[0], meshBox.vectorsWorld[2]);
        var direction = new BABYLON.Vector3(0, -1, 0);
        var cachRotationX = mesh._customEngine.cach.rotationX;
        var cachRotationZ = mesh._customEngine.cach.rotationZ;
        
        var frontLeft = createPickInfo(meshBox.vectorsWorld[0]);
        var backLeft = createPickInfo(meshBox.vectorsWorld[3]);

        var frontRight = createPickInfo(meshBox.vectorsWorld[2]);
        var backRight = createPickInfo(meshBox.vectorsWorld[5]);

        var frontMin = Math.min(frontLeft.distance, frontRight.distance);
        var backMin = Math.min(backLeft.distance, backRight.distance);

        var frontH = frontMin - backMin;

        mesh.rotation.x = cachRotationX + Math.atan2(frontH, width);

        function createPickInfo(vector) {
            var ray = new BABYLON.Ray(new BABYLON.Vector3(vector.x, groundBox.maximumWorld.y + 1, vector.z), direction);
            var worldInverse = new BABYLON.Matrix();

            ground.getWorldMatrix().invertToRef(worldInverse);
            ray = BABYLON.Ray.Transform(ray, worldInverse);

            return ground.intersects(ray);
        }
    }

    PhysicsEngine.prototype.CheckCollisionWithGround = function (mesh) {
        var meshBox = mesh.getBoundingInfo().boundingBox.center;
        var ray = new BABYLON.Ray(new BABYLON.Vector3(meshBox.x, this.ground.getBoundingInfo().boundingBox.maximumWorld.y + 1, meshBox.z),
                          new BABYLON.Vector3(0, -1, 0));
        var worldInverse = new BABYLON.Matrix();

        this.ground.getWorldMatrix().invertToRef(worldInverse);
        ray = BABYLON.Ray.Transform(ray, worldInverse);

        var pickInfo = this.ground.intersects(ray);

        if (pickInfo.hit) {
            mesh.position.y = pickInfo.pickedPoint.y + 0.5;
        }
    }

    PhysicsEngine.prototype._isMeshAdded = function (mesh) {
        return this.meshes.indexOf(mesh) >= 0;
    }

    PhysicsEngine.prototype.CalculateDistance = function (vector1, vector2) {
        var x = (vector1.x - (vector2.x));
        var y = (vector1.y - (vector2.y));
        var z = (vector1.z - (vector2.z));

        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    }


    return PhysicsEngine;
})();