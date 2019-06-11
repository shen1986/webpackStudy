// AsyncParallelHook 的内部实现原理
class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const [first,...others] = this.tasks;
    return others.reduce((p,n) => {
        return p.then(() => n(...args))
    }, first(...args));
  }
}

let hook = new AsyncSeriesHook(["name"]);
let total = 0;
hook.tapPromise("react", function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log("react", name);
            resolve();
        }, 1000);
    })
});
hook.tapPromise("node", function(name) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log("node", name);
            resolve();
        }, 1000);
    })
});

hook.promise("jw").then(function() {
    console.log("end");
});