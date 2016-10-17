

var BulletFactory = (function () {

    function BulletFactory() {
        this.Types = {
            BASIC_BULLET: 1001,
            FIRE_BULLET: 1002
        }
    }

    BulletFactory.prototype.Create = function (tank, origin, impact, type, tankAttack, scene) {
        switch (type) {
            case this.Types.BASIC_BULLET:
                return new BasicBullet(tank, origin, impact, type, tankAttack, scene);
                break;
            case this.Types.FIRE_BULLET:
                return new FireBullet(tank, origin, impact, type, tankAttack, scene);
                break;
            default:
                throw new Error("Bullet type does not exist.");
                break;
        }
    }


    return new BulletFactory();
})();