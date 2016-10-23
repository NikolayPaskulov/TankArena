var Loop = function (fn, fps) {
    fps = fps || 60;
    var self = this;

    var now;
    var delta;
    var interval;
    var then = new Date().getTime();

    var frames;
    var oldtime = 0;

    return (function loop(time) {
        requestAnimationFrame(loop);

        interval = 1000 / (this.fps || fps);
        now = new Date().getTime();
        delta = now - then;

        if (delta > interval) {
            // update time stuffs
            then = now - (delta % interval);

            // calculate the frames per second
            frames = 1000 / (time - oldtime)
            oldtime = time;

            // call the fn
            // and pass current fps to it
            fn.call(self, frames);
        }
    }(0));
};