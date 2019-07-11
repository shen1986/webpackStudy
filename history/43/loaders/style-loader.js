let loaderUtils = require('loader-utils');
function loader(source) {
    let str = `
        var style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return str;
}

// 在 style-loader 上 写了 pitch
// style-loader less-loader css-loader
loader.pitch = function(remainingRequest) {
    // 让style-loader 去处理less-loader!css-loader/ ./index.less
    // require路径 返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
    let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(
          this,
          "!!" + remainingRequest
        )});
        document.head.appendChild(style);
    `;
    console.log(str);
    return str;
}

module.exports = loader;
