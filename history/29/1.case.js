// AsyncParallelHook 的内部实现原理
class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
      let index = 0;
      let finalCallback = args.pop();
      let next = (err, data) => {
          let task = this.tasks[index];
          if (!task) return finalCallback();

          if (index === 0) {
              task(...args, next);
          } else {
              task(data, next);
          }

          index++
      }
      next();
  }
}

let hook = new AsyncSeriesWaterfallHook(["name"]);
let total = 0;
hook.tapAsync("react", function (name, cb) {
    setTimeout(function () {
        console.log("react", name);
        cb("err", "result");
    }, 1000);
});
hook.tapAsync("node", function(name, cb) {
    setTimeout(function () {
        console.log("node", name);
        cb(null);
    }, 1000);
});

hook.callAsync("jw", function() {
    console.log("end");
});