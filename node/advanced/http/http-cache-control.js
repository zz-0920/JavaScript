const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const { log } = require('console')

const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www', req.url)) // www/index.html
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            filePath = path.join(filePath, '/index.html')
        }
        if (fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath)
            const timeStamp = req.headers['if-modified-since']
            if (timeStamp && Number(timeStamp) === stat.mtimeMs) { // 协商缓存

                res.writeHead(304, {
                    'Content-Type': mime.getType(ext),
                    'Cache-Control': 'max-age=86400',
                    'Last-Modified': stat.mtimeMs
                });
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': mime.getType(ext),
                'Cache-Control': 'max-age=86400',
                'last-modified': stat.mtimeMs,
                'ETag': stat.size + '-' + stat.mtimeMs
            })
            const fileStream = fs.createReadStream(filePath)
            fileStream.pipe(res)
        }
    } else {
        res.writeHead(404, { 'Content-Type': mime.getType('html') })
        res.end('<h1>404 not found</h1>')
    }
})

server.listen(8080, () => {
    console.log('server is running at http://127.0.0.1:8080')
})