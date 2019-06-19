const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const t = require('@babel/types');
const traverse = require("@babel/traverse").default;
const generator = require('@babel/generator').default;
const ejs = require('ejs')
// babylon 主要就是把源码 转换成ast
// @babel/traverse
// @babel/types
// @babel/generator
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
  parse(source, parentPath) { // ast 解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; // 依赖的数组
    traverse(ast, {
        CallExpression(p) { // a() require()
            let node = p.node; // 对应的节点
            if (node.callee.name === 'require') {
                node.callee.name = "__webpack_require__";
                let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字
                moduleName = moduleName + (path.extname(moduleName)?'':'.js'); // ./a.js
                moduleName = './' + path.join(parentPath, moduleName); // src/a.js
                dependencies.push(moduleName);
                node.arguments = [t.stringLiteral(moduleName)];
            }
        }
    });
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
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

    // 附模块递归加载
    dependencies.forEach(dep => {
        this.buildModule(path.join(this.root, dep), false);
    })
  }
  // 发射文件
  emitFile() {
    // 用数据 渲染我们的模板
    // 拿到输出到那个目录下
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    let code = ejs.render(templateStr,{entryId: this.entryId, modules: this.modules});
    this.assets = {};
    // 资源中 路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }
  run() {
    // 执行 并且创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);

    // 发射一个文件 打包后的文件
    this.emitFile();
  }
}

module.exports = Compiler;