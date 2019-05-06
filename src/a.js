/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-05-06 12:02:18
 */
require('@babel/polyfill');
module.exports = 'zfpx';

class B{

}

function * gen(params) {
    yield 1;
}

console.log(gen().next());

'aaa'.includes('a');