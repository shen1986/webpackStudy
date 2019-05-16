let express = require('express');
let app = express();
let webpack = require('webpack');

// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.my');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({name: '小沈架构1'})
});

app.listen(3000, function(){
    console.log('3000端口已经启动了！');
})