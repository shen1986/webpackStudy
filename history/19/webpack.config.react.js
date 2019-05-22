let path = require("path");
let webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: {
    react: ["react", "react-dom"]
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]" // _dll_react
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]", // name== library
      path: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
};
