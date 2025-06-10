// 启动一个服务
const http = require('http')
const fs = require('fs')
const { console } = require('inspector')

const server = http.createServer(function(req, res) {
    if (req.url === '/home') { // 如果请求的是 /home 路径
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        })
        res.end('<h1>这是首页</h1>')
    }

    if (req.url === '/user') { // 如果请求的是 /user 路径
        // 读取 db.json 文件中的数据，将数据返回给前端
        const date = fs.readFileSync('./db.json', 'utf-8') 
        console.log(date)
    }
})

server.listen(3000, () => {
    console.log('服务启动成功')
})