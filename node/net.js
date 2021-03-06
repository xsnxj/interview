// =>例子1
// const net = require('net');
// var server = net.createServer((socket) => {
//   socket.end('goodbye\n');
// }).on('error', (err) => {
//   // handle errors here
//   throw err;
// });
//
// // grab a random port.
// server.listen(() => {
//   address = server.address();
//   console.log('opened server on %j', address);
// });
// =>例子2
// const net = require('net');
// const server = net.createServer((socket) => {
//     console.log("服务器和客户端已经建立连接", socket);
// });
// server.listen(3000, 'localhost', (socket)=> {
//     let address = server.address();
//     console.log('address', address, socket);
// });
// server.on('error', (e, socket) => {
//     if(e.code === 'EADDRINUSE') {
//         console.log('服务器端口号已被占用', socket);
//     }
// });
// console.log('this is running');
// =>例子3
// const net = require('net');
// const server = net.createServer();
// server.on('connection', (socket) => {
// })
// server.listen(3001, 'localhost', (socket) => {
//     let address = socket.address();
//     console.log('address', address);
// });

// =>例子4, 结合命令telnet localhost 8431
// const net = require('net');
// const server = net.createServer();
// server.on('connection', (socket) => {
//     socket.setEncoding('utf8');
//     socket.on('data', (data) => {
//         console.log('data', data);
//         console.log('接受的数据', socket.bytesRead);
//     });
//     socket.on('end', () => {
//         console.log('客户端连接关闭');
//     })
// });
// server.listen(8431, 'localhost');
// =>例子5  es2015的语法深入人心
//const net = require('net');
// 创建一个写文件夹的文件流
// const file = require('fs').createWriteStream('./message.txt');
// const server = net.createServer();
// server.on('connection', (socket) => {
//     socket.setEncoding('utf8');
//     socket.on('data', (data) => {
//         console.log('data', data);
//         console.log('socket', socket);
//         console.log('接受的数据', socket.bytesRead);
//     });
//     socket.pipe(file, {end:false});
//     setTimeout(() => {
//         file.end('zaijian');
//         socket.unpipe(file);
//     }, 5000)
// });
// server.listen(8431, 'localhost');




const net = require('net');
const server = net.createServer();
const fs = require('fs');
server.on('connection', function(socket) {
    console.log('客服端与服务器建立连接');
    socket.setEncoding('utf8');
    const readStream = fs.createReadStream('./fs.js');
    readStream.on('data', function(data) {
        const flag = socket.write(data);
        console.log('socket', socket.bufferSize);
    });
    socket.on('data', function(data) {
        console.log('已经客户端发送数据');
    });
    socket.on('drain', function() {
        console.log('tcp缓存区中的数据已全部发送');
    });
});
server.listen(8431, '127.0.0.1');
