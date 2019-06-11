// 异步串行
let { AsyncSeriesHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
          arch: new AsyncSeriesHook(["name"])
        };
    }
    tap() {
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((reslove, reject) => {
                setTimeout(function () {
                    console.log("node", name);
                    reslove();
                }, 1000);
            });
        });
        this.hooks.arch.tapPromise("react", (name) => {
            return new Promise((reslove, reject) => {
                setTimeout(function () {
                    console.log("react", name);
                    reslove();
                }, 1000);
            });
        });
    }
    start() {
        this.hooks.arch.promise('jw').then(function() {
            console.log('end');
        });
    }
}

let l = new Lesson();
l.tap();
l.start();