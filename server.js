// ---------------------- way 1 added ----------------------------
const net = require('net')

const portList = [3000, 3001];

let portIndex = 0;
let userNumber = 0;
function changePort(){
    const num = userNumber / 2;
    if(num.toString().includes('.')){
        portIndex = 0;
    }else {
        portIndex = 1;
    }
    userNumber++;

}
const server = net.createServer( (socket) => {
    socket.once('data', (msg) => {
        changePort();
        console.log(msg.toString());

        const proxy = net.createConnection({host: '127.0.0.1', port: portList[portIndex]}, ()=> {
            console.log("proxy to server setup");
        })

        proxy.write(msg)
        socket.pipe(proxy);
        proxy.pipe(socket);
        
    })

}).on('error', (err) => {
    console.log(err);
    throw err
})

server.listen( 4100, "127.0.0.1" ,() => {
    console.log(server.address());
})


//------------  way 2 added ------------------------------------


// const net = require('net')

// const portList = [3000, 3001];

// let portIndex = 0;
// let userNumber = 0;
// function changePort(){
//     const num = userNumber / 2
//     if(num.toString().includes('.')){
//         portIndex = 0;
//     }else{
//         portIndex = 1;
//     }
//     userNumber++;
// }
// const server = net.createServer( (socket) => {
//     socket.once('data', (msg) => {
//         changePort()
//         var serviceSocket = new net.Socket();
//         serviceSocket.connect(parseInt(portList[portIndex]), '127.0.0.1', () => {
//             serviceSocket.write(msg);
//         })
//         socket.pipe(serviceSocket);
//         serviceSocket.pipe(socket);
        
//     })

// }).on('error', (err) => {
//     console.log(err);
//     throw err
// })

// server.listen( 4100, "127.0.0.1" ,() => {
//     console.log(server.address());
// })