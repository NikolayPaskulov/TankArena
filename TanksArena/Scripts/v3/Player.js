/// <reference path="~/Scripts/libs/babylon.max.js" />
/// <reference path="~/Scripts/common/Controls.js" />
/// <reference path="~/Scripts/common/MathHelper.js" />
/// <reference path="~/Scripts/v2/Tanks/TanksService.js" />
/// <reference path="~/Scripts/v2/Enums/TankType.js" />

var Player = (function () {

    function Player(name, position, canvas, scene) {
        this.name = name;
        this.canvas = canvas;
        this.scene = scene;
        this.position = position;
        this.tank = null;
        this.camera = new BABYLON.FollowCamera(name + "Camera", BABYLON.Vector3.Zero(), scene),
        this.camera.keysUp = [];
        this.camera.keysDown = [];
        this.camera.keysLeft = [];
        this.camera.keysRight = [];
        this.rotationY = 0;
        this.rotation = new BABYLON.Vector3(0, 0, 0);

        this.controls = new Controls();

        this.tank = null;

        this._InitializeTank();
    }

    Player.prototype._InitializeTank = function () {
        var self = this;

        this.tank = TanksService.CreateTank(this.name, TankType.T90aTank, this.scene, function (success) {
            if (!success)
                return;

            self._AddTankPhysics();
            self._UpdateTankPosition();
            self._AttachCamera();
            self._AddUpdateLoop();
            self._AddEvents();

            self.rotation = self.tank.body.rotationQuaternion.toEulerAngles();

        });
    }

    Player.prototype._AddTankPhysics = function () {
        this.tank.body.physicsImpostor = new BABYLON.PhysicsImpostor(this.tank.body,
                                                                     BABYLON.PhysicsImpostor.BoxImpostor,
                                                                     {
                                                                         mass: this.tank.mass,
                                                                         friction: this.tank.friction,
                                                                         restitution: this.tank.restitution
                                                                     },
                                                                     this.scene);
    }

    Player.prototype._UpdateTankPosition = function () {
        this.tank.body.position.x = this.position.x;
        this.tank.body.position.y = this.position.y;
        this.tank.body.position.z = this.position.z;
    }

    Player.prototype._AttachCamera = function () {
        this.camera.target = this.tank.body;
        this.camera.radius = 90;
        this.camera.heightOffset = 25;
        this.camera.rotationOffset = 180;

        this.camera.attachControl(this.canvas, false);
        this.scene.activeCamera = this.camera;
    }

    Player.prototype._AddUpdateLoop = function () {
        var self = this;

        this.scene.registerBeforeRender(function () {
            if (self.scene.isReady()) {
                // update camera rotation based on tank direction
                self.rotation = self.tank.body.rotationQuaternion.toEulerAngles();


                self._UpdateCameraRotationOffset();
                self._UpdateTankSpeed();

                if (self.tank.body && self.tank.body.position) {

                    self._UpdateTankRatation();
                    self._UpdateGunRotation();

                    self._UpdateTankPosition();
                }
            }
        });
    }

    Player.prototype._UpdateCameraRotationOffset = function () {
        this.camera.rotationOffset = this.controls.MovingForward() ? 90 : (this.controls.MovingBackward() ? -90 : 90);
    }

    Player.prototype._AddEvents = function () {
        var self = this;
        this.scene.onPointerDown = function (evt, pickResult) {
            if (pickResult && pickResult.pickedPoint)
                self.tank.Fire(pickResult.pickedPoint);
        }
    }


    Player.prototype._UpdateTankSpeed = function () {
        var isMovingForward = this.controls.MovingForward();
        var isMovingBackward = this.controls.MovingBackward();

        if (isMovingForward) {
            if (this.tank.speed < this.tank.MAX_SPEED) {
                this.tank.speed += this.tank.acceleration * this.scene.getAnimationRatio();
            } else if (this.tank.speed > this.tank.MAX_SPEED) {
                this.tank.speed = this.tank.MAX_SPEED;
            }
        } else if (isMovingBackward) {
            if (this.tank.speed > (this.tank.MAX_REVERSE_SPEED * -1)) {
                this.tank.speed -= (this.tank.acceleration * this.scene.getAnimationRatio()) / 2;
            }
        }

        if (!(isMovingForward || isMovingBackward)) {
            if (this.tank.speed > 0) {
                var frontDecay = this.tank.speed / 100 * 3;
                var speed = this.tank.speed - frontDecay;

                this.tank.speed = decay(speed);

            } else {
                var backDecay = (this.tank.speed / 100 * 3) * -1;
                var speed = this.tank.speed + backDecay;

                this.tank.speed = decay(speed);
            }
        }

        function decay(num) {
            return Math.abs(num) < 1e-2 ? 0 : num;
        }
    }

    Player.prototype._UpdateGunRotation = function () {
        if (this.scene.pointerX) {
            var screenWidth = window.innerWidth;
            var center = screenWidth / 2;
            this.tank.gun.rotation.z = this.tank.MAX_GUN_ROTATION / 100 * ((this.scene.pointerX - center) / center * 100);
        }
    };

    Player.prototype._UpdateTankRatation = function () {
        if (this.tank.speed != 0) {
            if (this.controls.MovingLeft()) {
                var v = this.tank.rotationSpeed * this.scene.getAnimationRatio();
                this.rotation.y -= v;
                this.tank.body.rotate(BABYLON.Axis.Z, -(v));
            } else if (this.controls.MovingRight()) {
                var v = this.tank.rotationSpeed * this.scene.getAnimationRatio();
                this.rotation.y += v;
                this.tank.body.rotate(BABYLON.Axis.Z, v);
            }
        }
    }

    Player.prototype._UpdateTankPosition = function () {
        this.tank.body.position.z += Math.cos(this.rotation.y) * this.tank.speed;
        this.tank.body.position.x += Math.sin(this.rotation.y) * this.tank.speed;
    }

    return Player;
})();