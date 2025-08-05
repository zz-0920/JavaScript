const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www', req.url)) // xxx/http/www/index.html
    if (fs.existsSync(filePath)) { // 判断路径是否有对应的文件
        const stats = fs.statSync(filePath) // 同步获取文件信息
        const isDir = stats.isDirectory() // 判断是否是目录
        if (isDir) {
            filePath = path.join(filePath, 'index.html')
        }
        // 同步读取文件内容
        const content = fs.readFileSync(filePath)
        const { ext } = path.parse(filePath)
        // if (ext === '.png') {
        //     res.writeHead(200, { 'Content-Type': 'image/png' })
        // } else {
        //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        // }
        res.writeHead(200, { 'Content-Type': mime.getType(ext) })
        res.end(content)
    } else {
        res.writeHead(404, { 'Content-Type': mime.getType('html') })
        res.end('<h1>404 not found</h1>')
    }
})

server.listen(8080, () => {
    console.log('server is running at http://127.0.0.1:8080')
})