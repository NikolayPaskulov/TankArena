

var SoundEffectsService = (function () {

    function SoundEffectsService() {
        this.effects = {
            tank: {
                fire: {
                    isLoaded : false,
                    sound : null
                }
            }
        }
    }

    SoundEffectsService.prototype.Initialize = function (scene) {
        var self = this;

        this.effects.tank.fire.sound = new BABYLON.Sound("Music", "../../Content/Audio/fire.mp3", scene, 
            function () { self.effects.tank.fire.isLoaded = true; })

    }

    SoundEffectsService.prototype.TankFire = function () {
        if (this.effects.tank.fire.isLoaded)
            this.effects.tank.fire.sound.play();
    }

    return new SoundEffectsService();
})();