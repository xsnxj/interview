const http = require('http');
let server = http.createServer((request, response) => {
	console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:显示的内容
    response.end('<h1>Hello world!</h1>');
});
// 数据的解决
server.listen(8000);
console.log('this is runing');
// 解决数据

