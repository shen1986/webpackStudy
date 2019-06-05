// SyncBailHook 的内部实现原理
// class SyncBailHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//       var ret = undefined;
//       var index = 0;
//     do {
//         ret = this.tasks[index++](...args);
//     } while (ret === undefined && index < this.tasks.length);
//   }
// }

// let hook = new SyncBailHook(["name"]);
// hook.tap('react', function(name) {
//     console.log('react', name);
//     return 'react 难学';
// })
// hook.tap("node", function(name) {
//   console.log("node", name);
// });

// hook.call('jw');


// SyncWaterfallHook 的内部实现原理
// class SyncWaterfallHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//     let [first, ...others] = this.tasks;
//     let ret = first(...args);
//     others.reduce((a,b) => {
//         b(a);
//     }, ret);
//   }
// }

// let hook = new SyncWaterfallHook(["name"]);
// hook.tap('react', function(name) {
//     console.log('react', name);
//     return 'react 难学';
// })
// hook.tap("node", function(data) {
//   console.log("node", data);
// });

// hook.call('jw');

// SyncLoopHook 的内部实现原理
class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach(task => {
        var ret = undefined;
        do{
            ret = task(...args);
        }while(ret != undefined)
        
    })
  }
}

let hook = new SyncLoopHook(["name"]);
let total = 0;
hook.tap('react', function(name) {
    console.log('react', name);
    return ++total === 3? undefined : '继续学';
})
hook.tap("node", function(data) {
  console.log("node", data);
});

hook.call('jw');