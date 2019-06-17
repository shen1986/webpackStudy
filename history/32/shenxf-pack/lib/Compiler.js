const fs = require('fs');
const path = require('path');
class Compiler {
  constructor(config) {
    // entry output
    this.config = config;
    // 需要保存入口文件的路径
    this.entryId; // './src/index.js'
    // 需要保存所有的模块依赖
    this.modules = {};
    this.entry = config.entry; // 入口路径
    // 工作路径
    this.root = process.cwd();
  }
  getSource(modulePath) {
      let content = fs.readFileSync(modulePath, 'utf8');
      return content;
  }
  parse(source, parentPath) {
    console.log(source, parentPath);
    // ast 解析语法树
  }
  // 构建模块
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);
    // 模块id modulePath = modulePath - this.root src/index.js
    let moduleName = './' + path.relative(this.root, modulePath);

    if (isEntry) {
        this.entryId = moduleName; // 保存入口的名字
    }
    // 解析需要把source源码进行改造 返回一个依赖列表
    let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)); // .src
    // 把相对路径和模块中的内容 对应起来
    this.modules[moduleName] = sourceCode;
  }
  emitFile() {
    // 发射文件
  }
  run() {
    // 执行 并且创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);

    // 发射一个文件 打包后的文件
    this.emitFile();
  }
}

module.exports = Compiler;