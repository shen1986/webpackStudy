let xhr = new XMLHttpRequest();

// http://localhost:8080  webpack-dev-server的服务 -> 3000

// http-proxy
xhr.open('GET','/user', true);

xhr.onload = function() {
    console.log(xhr.response);
}

xhr.send();

// console.log('home11');

// class Log {
//     constructor() {
//         console.lo('出错了');
//     }
// }

// let log = new Log();