// 异步并发
let { AsyncParallelHook } = require("tapable");
// 异步的钩子 （串行） 并行 需要等待所有并发的异步事件执行后再执行回调方法。
// 注册方法分为三种 tap（同步注册） tapAsync（异步注册） Promise
class Lesson {
    constructor() {
        this.hooks = {
          arch: new AsyncParallelHook(["name"])
        };
    }
    tap() {
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    console.log("node", name);
                    resolve();
                }, 1000);
            });
        });
        this.hooks.arch.tapPromise("react", (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    console.log("react", name);
                    resolve();
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