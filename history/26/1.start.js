// 同步保险锁
// let { SyncBailHook } = require('tapable');

// class Lesson {
//     constructor() {
//         this.hooks = {
//           arch: new SyncBailHook(["name"])
//         };
//     }
//     tap() {
//         this.hooks.arch.tap('node', function(name) {
//             console.log('node', name);
//             // 当返回值不等于 undefined 下面的程序不继续执行。
//             return 'node 难学';
//         });
//         this.hooks.arch.tap('react', function(name) {
//             console.log("react", name);
//         });
//     }
//     start() {
//         this.hooks.arch.call('jw');
//     }
    
// }

// let l = new Lesson();
// l.tap();
// l.start();

// 同步瀑布锁，上一个执行的返回结果给下一个执行函数
// let { SyncWaterfallHook } = require('tapable');

// class Lesson {
//     constructor() {
//         this.hooks = {
//           arch: new SyncWaterfallHook(["name"])
//         };
//     }
//     tap() {
//         this.hooks.arch.tap('node', function(name) {
//             console.log('node', name);
//             // 当返回值不等于 undefined 下面的程序不继续执行。
//             return 'node 必须';
//         });
//         this.hooks.arch.tap('react', function(data) {
//             console.log("react", data);
//         });
//     }
//     start() {
//         this.hooks.arch.call('jw');
//     }
    
// }

// let l = new Lesson();
// l.tap();
// l.start();

// 同步循环锁，可以指定某个函数执行的次数 不返回undefined就会继续执行
let { SyncLoopHook } = require('tapable');

class Lesson {
    constructor() {
        this.index = 0; // 定一个标记
        this.hooks = {
          arch: new SyncLoopHook(["name"])
        };
    }
    tap() {
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : "继续学";
        });
        this.hooks.arch.tap('react', (data) => {
            console.log("react", data);
        });
    }
    start() {
        this.hooks.arch.call('jw');
    }
    
}

let l = new Lesson();
l.tap();
l.start();