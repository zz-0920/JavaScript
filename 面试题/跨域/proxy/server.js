const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
    })
    // 向目标后端发送请求，拿到数据返回给我的前端
    http.request({
        host: '192.168.1.75',
        port: '3000',
        path: '/',
        method: 'GET',
        headers: {}
    }, (proxyRes) => {
        proxyRes.on('data', (data) => {
            console.log(data.toString())
            res.end(data.toString())
        })
    }).end()
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})