// AsyncParallelHook 的内部实现原理
class AsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let promises = this.tasks.map(task => {
        return task(...args);
    });
    return Promise.all(promises);
  }
}

let hook = new AsyncParallelHook(["name"]);
let total = 0;
hook.tapPromise("react", function(name) {
    return new Promise((reslove, reject) => {
        setTimeout(function() {
            console.log("react", name);
            reslove();
        }, 1000);
    });
});
hook.tapPromise("node", function(name, cb) {
    return new Promise((reslove, reject) => {
        setTimeout(function() {
            console.log("node", name);
            reslove();
        }, 1000);
    });
});

hook.promise("jw").then(function() {
    console.log("end");
});