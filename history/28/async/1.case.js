// AsyncParallelHook 的内部实现原理
class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = () => {
            if (index === this.tasks.length) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        };
        next();
  }
}

let hook = new AsyncSeriesHook(["name"]);
let total = 0;
hook.tapAsync("react", function (name, cb) {
    setTimeout(function () {
        console.log("react", name);
        cb();
    }, 1000);
});
hook.tapAsync("node", function(name, cb) {
    setTimeout(function () {
        console.log("node", name);
        cb();
    }, 1000);
});

hook.callAsync("jw", function() {
    console.log("end");
});