import str from './source';
console.log(str);

if (module.hot) {
    module.hot.accept('./source.js', () => {
        let str = require('./source');
        console.log(str);
    });
}