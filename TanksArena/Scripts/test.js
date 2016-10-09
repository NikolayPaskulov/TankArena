var MainScene = (function () {
    function MainScene(engine) {
        this.nLoad = 0;
        // mesh
        this.car_m = null;
        this.glass_m = null;
        this.wfl = null;
        this.wfr = null;
        this.wbl = null;
        this.wbr = null;
        // dummy mesh
        this.car = null;
        this.frontLeftWheelMesh = null;
        this.frontRightWheelMesh = null;
        this.backLeftWheelMesh = null;
        this.backRightWheelMesh = null;
        // car physic
        this.wheelDiameter = 8;
        this.modelScale = 1;
        this.speed = 0;
        this.acceleration = 0;
        this.wheelOrientation = 0;
        this.carOrientation = 0;
        this.MAX_SPEED = 400;
        this.MAX_REVERSE_SPEED = -400;
        this.MAX_WHEEL_ROTATION = 0.6;
        this.FRONT_ACCELERATION = 800;
        this.BACK_ACCELERATION = 800;
        this.WHEEL_ANGULAR_ACCELERATION = 4;
        this.FRONT_DECCELERATION = 400;
        this.WHEEL_ANGULAR_DECCELERATION = 2;
        this.STEERING_RADIUS_RATIO = 0.05;
        this.MAX_TILT_SIDES = 0.07;
        this.MAX_TILT_FRONTBACK = 0.015;
        // test for skid
        this.skidMaterial = null;
        this.lSkids = [];
        this.rSkids = [];
        this.skidNumber = 0;
        this.scene = new BABYLON.Scene(engine);
        this.scene.enablePhysics();

        this.engine = engine;

        // create layer fake backGround
        var background0 = new BABYLON.Layer("back0", "Assets/back.jpg", this.scene, true, new BABYLON.Color4(1, 1, 1, 1));

        //create skid mat
        this.createSkidMat();

        this.addLightAndCamera();
        this.addStaticGeometry();
        this.load();
        //this.addPhysic();
    }
    MainScene.prototype.addPhysic = function () {
        // Material
        var materialAmiga = new BABYLON.StandardMaterial("amiga", this.scene);
        materialAmiga.diffuseTexture = new BABYLON.Texture("Assets/amiga.jpg", this.scene);
        materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        materialAmiga.diffuseTexture.uScale = 5;
        materialAmiga.diffuseTexture.vScale = 5;
        var y = 5;
        for (var index = 0; index < 32; index++) {
            var sphere = BABYLON.Mesh.CreateSphere("Sphere", 32, 3, this.scene);
            sphere.material = materialAmiga;

            sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

            this.shadowGenerator.getShadowMap().renderList.push(sphere);

            sphere.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 10 });

            y += 2;
        }
    };

    MainScene.prototype.load = function () {
        var _this = this;
        BABYLON.SceneLoader.ImportMesh("#Car", "Assets/", "carflip.babylon", this.scene, function (newMeshes, particleSystems, skeletons) {
            _this.onLoading(newMeshes, particleSystems, skeletons);
        });
        BABYLON.SceneLoader.ImportMesh("#Wheel", "Assets/", "wheela.babylon", this.scene, function (newMeshes, particleSystems, skeletons) {
            _this.onLoading(newMeshes, particleSystems, skeletons);
        });
        BABYLON.SceneLoader.ImportMesh("#Glass", "Assets/", "carflip.babylon", this.scene, function (newMeshes, particleSystems, skeletons) {
            _this.onLoading(newMeshes, particleSystems, skeletons);
        });
    };

    MainScene.prototype.onLoading = function (newMeshes, particleSystems, skeletons) {
        this.nLoad++;

        if (newMeshes[0].name == "#Car") {
            this.car_m = newMeshes[0];
            this.car_m.scaling = new BABYLON.Vector3(80, 80, 80);
            this.car_m.rotation = new BABYLON.Vector3(0, Math.PI, 0);
            var mat = this.car_m.material;
            mat.emissiveColor = new BABYLON.Color3(.5, .5, .5);
            mat.reflectionTexture = new BABYLON.Texture("Assets/reflection.jpg", this.scene);
            mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
            mat.reflectionTexture.level = 0.05;

            this.shadowGenerator.getShadowMap().renderList.push(this.car_m);
        }
        if (newMeshes[0].name == "#Wheel") {
            this.wfl = newMeshes[0];
            var mat = this.wfl.material;
            mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
            this.wfl.material = mat;
            this.wfl.scaling = new BABYLON.Vector3(80, 80, 80);

            // cloning wheel
            this.wfr = this.wfl.clone("wfr", null, true);
            this.wfr.rotation = new BABYLON.Vector3(0, Math.PI, 0);
            this.wbl = this.wfl.clone("wbl", null, true);
            this.wbr = this.wfl.clone("wbr", null, true);
            this.wbr.rotation = new BABYLON.Vector3(0, Math.PI, 0);
            this.shadowGenerator.getShadowMap().renderList.push(this.wfl);
            this.shadowGenerator.getShadowMap().renderList.push(this.wfr);
            this.shadowGenerator.getShadowMap().renderList.push(this.wbl);
            this.shadowGenerator.getShadowMap().renderList.push(this.wbr);
        }

        if (newMeshes[0].name == "#Glass") {
            this.glass_m = newMeshes[0];
            this.glass_m.scaling = new BABYLON.Vector3(80, 80, 80);
            this.glass_m.rotation = new BABYLON.Vector3(0, Math.PI, 0);

            var mat1 = this.glass_m.material;

            // mat.diffuseColor = new BABYLON.Vector3(.8, .8, .8);
            //  mat.emissiveColor = new BABYLON.Color3(.5, .5, .5);
            mat1.alpha = .5;
            mat1.reflectionTexture = new BABYLON.Texture("Assets/reflection.jpg", this.scene);
            mat1.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
            mat1.reflectionTexture.level = 0.55;
        }

        // asset management...
        if (this.nLoad == 3) {
            this.setUpCar();
            MainScene.isLoaded = true;
        }
    };

    MainScene.prototype.updateCar = function (delta) {
        // to compute skid
        //this.computeSkid();
        //this.camera.target.x = this.car.position.x;
        //this.camera.target.z = this.car.position.z;
        // camera constraint
        if (this.camera.position.y < 10) {
            this.camera.setPosition(new BABYLON.Vector3(this.camera.position.x, 10, this.camera.position.z));
        }

        if (Control.moveForward) {
            this.speed = this.clamp(this.speed + delta * this.FRONT_ACCELERATION, this.MAX_REVERSE_SPEED, this.MAX_SPEED);
            this.acceleration = this.clamp(this.acceleration + delta, -1, 1);
        }

        if (Control.moveBackward) {
            this.speed = this.clamp(this.speed - delta * this.BACK_ACCELERATION, this.MAX_REVERSE_SPEED, this.MAX_SPEED);
            this.acceleration = this.clamp(this.acceleration - delta, -1, 1);
        }

        if (Control.moveLeft) {
            this.wheelOrientation = this.clamp(this.wheelOrientation + delta * this.WHEEL_ANGULAR_ACCELERATION, -this.MAX_WHEEL_ROTATION, this.MAX_WHEEL_ROTATION);
        }

        if (Control.moveRight) {
            this.wheelOrientation = this.clamp(this.wheelOrientation - delta * this.WHEEL_ANGULAR_ACCELERATION, -this.MAX_WHEEL_ROTATION, this.MAX_WHEEL_ROTATION);
        }

        // speed decay
        if (!(Control.moveForward || Control.moveBackward)) {
            if (this.speed > 0) {
                var k = this.exponentialEaseOut(this.speed / this.MAX_SPEED);

                this.speed = this.clamp(this.speed - k * delta * this.FRONT_DECCELERATION, 0, this.MAX_SPEED);
                this.acceleration = this.clamp(this.acceleration - k * delta, 0, 1);
            } else {
                var k = this.exponentialEaseOut(this.speed / this.MAX_REVERSE_SPEED);

                this.speed = this.clamp(this.speed + k * delta * this.BACK_ACCELERATION, this.MAX_REVERSE_SPEED, 0);
                this.acceleration = this.clamp(this.acceleration + k * delta, -1, 0);
            }
        }

        // steering decay
        if (!(Control.moveLeft || Control.moveRight)) {
            if (this.wheelOrientation > 0) {
                this.wheelOrientation = this.clamp(this.wheelOrientation - delta * this.WHEEL_ANGULAR_DECCELERATION, 0, this.MAX_WHEEL_ROTATION);
            } else {
                this.wheelOrientation = this.clamp(this.wheelOrientation + delta * this.WHEEL_ANGULAR_DECCELERATION, -this.MAX_WHEEL_ROTATION, 0);
            }
        }

        // car update
        var forwardDelta = this.speed * delta;

        // console.log(forwardDelta);
        this.carOrientation += (forwardDelta * this.STEERING_RADIUS_RATIO) * this.wheelOrientation;

        // displacement
        this.car.position.x += Math.sin(this.carOrientation) * forwardDelta;
        this.car.position.z += Math.cos(this.carOrientation) * forwardDelta;

        // steering and drift
        if (Control.driftMode) {
            this.MAX_TILT_SIDES = 0.07;
            this.WHEEL_ANGULAR_DECCELERATION = 2;
            this.car.rotation.y = this.carOrientation + (this.wheelOrientation * this.speed / this.MAX_SPEED);
        } else {
            this.WHEEL_ANGULAR_DECCELERATION = 4;
            this.MAX_TILT_SIDES = 0.007;
            this.car.rotation.y = this.carOrientation;
        }

        // tilt
        this.car.rotation.z = this.MAX_TILT_SIDES * this.wheelOrientation * (this.speed / this.MAX_SPEED);
        this.car.rotation.x = -this.MAX_TILT_FRONTBACK * this.acceleration;

        // wheels rolling
        var angularSpeedRatio = 1 / (this.modelScale * (this.wheelDiameter / 2));

        var wheelDelta = forwardDelta * angularSpeedRatio;

        this.frontLeftWheelMesh.rotation.x += wheelDelta;
        this.frontRightWheelMesh.rotation.x += wheelDelta;
        this.backLeftWheelMesh.rotation.x += wheelDelta;
        this.backRightWheelMesh.rotation.x += wheelDelta;

        // front wheels steering
        this.frontLeftWheelMesh.rotation.y = this.wheelOrientation;
        this.frontRightWheelMesh.rotation.y = this.wheelOrientation;
    };

    MainScene.prototype.clamp = function (x, a, b) {
        return (x < a) ? a : ((x > b) ? b : x);
    };
    MainScene.prototype.quadraticEaseOut = function (k) {
        return -k * (k - 2);
    };
    MainScene.prototype.cubicEaseOut = function (k) {
        return --k * k * k + 1;
    };
    MainScene.prototype.circularEaseOut = function (k) {
        return Math.sqrt(1 - --k * k);
    };
    MainScene.prototype.sinusoidalEaseOut = function (k) {
        return Math.sin(k * Math.PI / 2);
    };
    MainScene.prototype.exponentialEaseOut = function (k) {
        return k === 1 ? 1 : -Math.pow(2, -10 * k) + 1;
    };

    MainScene.prototype.setUpCar = function () {
        this.car = BABYLON.Mesh.CreateBox("box", 20, this.scene);
        this.car.position = new BABYLON.Vector3(0, 1, 0);
        this.car.isVisible = false;

        this.frontLeftWheelMesh = BABYLON.Mesh.CreateBox("box", 2, this.scene);
        this.frontLeftWheelMesh.isVisible = false;
        this.frontRightWheelMesh = BABYLON.Mesh.CreateBox("box", 2, this.scene);
        this.frontRightWheelMesh.isVisible = false;
        this.backLeftWheelMesh = BABYLON.Mesh.CreateBox("box", 2, this.scene);
        this.backLeftWheelMesh.isVisible = false;
        this.backRightWheelMesh = BABYLON.Mesh.CreateBox("box", 2, this.scene);
        this.backRightWheelMesh.isVisible = false;

        this.frontLeftWheelMesh.position = new BABYLON.Vector3(8, 2, 16);
        this.frontRightWheelMesh.position = new BABYLON.Vector3(-8, 2, 16);

        this.backLeftWheelMesh.position = new BABYLON.Vector3(8, 2, -8);
        this.backRightWheelMesh.position = new BABYLON.Vector3(-8, 2, -8);

        this.frontLeftWheelMesh.parent = this.car;
        this.frontRightWheelMesh.parent = this.car;
        this.backLeftWheelMesh.parent = this.car;
        this.backRightWheelMesh.parent = this.car;

        this.car_m.parent = this.car;

        this.glass_m.parent = this.car;
        this.wfl.parent = this.frontLeftWheelMesh;
        this.wfr.parent = this.frontRightWheelMesh;
        this.wbl.parent = this.backLeftWheelMesh;
        this.wbr.parent = this.backRightWheelMesh;
    };

    MainScene.prototype.addStaticGeometry = function () {
        // Ground
        // var ground = BABYLON.Mesh.CreateGround("ground", 4000, 4000, 10, this.scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        groundMaterial.emissiveColor = new BABYLON.Color3(.3, .3, .3);

        // ground.material = groundMaterial;
        // ground.receiveShadows = true;
        // ground.checkCollisions = true;
        var ground = BABYLON.Mesh.CreateBox("Ground", 1, this.scene);
        ground.scaling = new BABYLON.Vector3(4000, 1, 4000);
        ground.position.y = -1.0;

        ground.material = groundMaterial;
        ground.receiveShadows = true;
        ground.checkCollisions = true;

        ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    };

    MainScene.prototype.addLightAndCamera = function () {
        this.light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0.2, -1, 0), this.scene);
        this.light.position = new BABYLON.Vector3(0, 600, 0);
        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 10, 0), this.scene);
        this.camera.setPosition(new BABYLON.Vector3(40, 15, 40));

        this.camera.keysDown = [67];
        this.camera.keysLeft = [67];
        this.camera.keysUp = [67];
        this.camera.keysRight = [67];

        // camera.minZ = 10.0;
        this.scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        this.shadowGenerator = new BABYLON.ShadowGenerator(2048, this.light);
    };

    MainScene.prototype.createSkidMat = function () {
        // a foutre ailleur
        this.skidMaterial = new BABYLON.StandardMaterial("a", this.scene);

        //this.ma.diffuseColor = new BABYLON.Color3(1,1,1);
        this.skidMaterial.diffuseTexture = new BABYLON.Texture("Assets/skid.png", this.scene);
        this.skidMaterial.opacityTexture = new BABYLON.Texture("Assets/skid.png", this.scene);
        this.skidMaterial.diffuseTexture.hasAlpha = true;
    };

    MainScene.prototype.computeSkid = function () {
        if (this.speed > 150 && (this.wheelOrientation < -0.3 || this.wheelOrientation > 0.3) && Control.moveForward) {
            var skid = BABYLON.Mesh.CreateBox("boA", 8, this.scene);

            skid.material = this.skidMaterial;
            skid.position = this.backLeftWheelMesh.getAbsolutePosition().clone();
            skid.rotation.y = this.car.rotation.y;
            skid.position.y = -3.8;

            this.lSkids.push(skid);

            var skid = BABYLON.Mesh.CreateBox("boA", 8, this.scene);

            skid.material = this.skidMaterial;
            skid.position = this.backRightWheelMesh.getAbsolutePosition().clone();
            skid.rotation.y = this.car.rotation.y;
            skid.position.y = -3.8;

            this.rSkids.push(skid);

            if (++this.skidNumber > 500) {
                this.lSkids.shift().dispose();
                this.rSkids.shift().dispose();
                --this.skidNumber;
            }
        }
    };

    MainScene.prototype.getScene = function () {
        return this.scene;
    };
    MainScene.isLoaded = false;
    return MainScene;
})();
//# sourceMappingURL=MainScene.js.map
