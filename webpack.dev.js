let { smart } = require("webpack-merge");
let base = require("./webpack.base.js");

module.experts = smart(base, {
  mode: "development"
});
