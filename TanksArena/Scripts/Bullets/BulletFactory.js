

var BulletFactory = (function () {

    function BulletFactory() {
        this.Types = {
            BASIC_BULLET : 1001,
            FIRE_BULLET : 1002
        }
    }

    BulletFactory.prototype.Create = function (direction, type, tankAttack) {
        switch (type) {
            case type == this.Types.BASIC_BULLET:
                return new BasicBullet(direction, type, tankAttack);
                break;
            case type == this.Types.FIRE_BULLET:
                return new FireBullet(direction, type, tankAttack);
                break;
            default:
                throw new Error("Bullet type does not exist.");
                break;
        }
    }


    return new BulletFactory();
})();