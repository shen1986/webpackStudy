// 异步串行
let { AsyncSeriesWaterfallHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(["name"])
        };
    }
    tap() {
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(function () {
                console.log("node", name);
                cb("error", 'result');
            }, 1000);
        });
        this.hooks.arch.tapAsync("react", (name, cb) => {
            setTimeout(function () {
                console.log("react", name);
                cb(null);
            }, 1000);
        });
    }
    start() {
        this.hooks.arch.callAsync('jw', function() {
            console.log('end');
        });
    }
}

let l = new Lesson();
l.tap();
l.start();