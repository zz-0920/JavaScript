const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('mime')
const zlib = require('zlib')



const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www', req.url))
    if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html')
        }

        if (fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath)
            const stat = fs.statSync(filePath)
            const timeStamp = req.headers['if-modified-since']
            let status = 200

            if (timeStamp && Number(timeStamp) === stat.mtimeMs) {
                status = 304
            }
            const mineType = mime.getType(ext)
            const resHeaders = {
                'Content-Type': mineType,
                'cache-control': 'max-age=86400',
                'Last-Modified': stat.mtimeMs,
            }
            const acceptEncoding = req.headers['accept-encoding'] // 浏览器支持的压缩算法
            const compress = /^(text|application)\//.test(mineType)

            if (compress) {
                acceptEncoding.split(/\s*,\s*/).some((item) => {
                    if (item === 'gzip') {
                        res.setHeader('content-encoding', 'gzip')
                        return true
                    }
                    if (item === 'deflate') {
                        res.setHeader('content-encoding', 'deflate')
                        return true
                    }
                    if (item === 'br') {
                        res.setHeader('content-encoding', 'br')
                        return true
                    }
                    if (item === 'identity') {
                        res.setHeader('content-encoding', 'identity')
                        return true
                    }
                    return false
                })
            }

            res.writeHead(status, resHeaders)

            const compression = res.getHeader('content-encoding')


            if (status === 200) {
                const fileStream = fs.createReadStream(filePath)
                if (compress && compression === 'gzip') {
                    fileStream.pipe(zlib.createGzip()).pipe(res)
                } else if (compress && compression === 'deflate') {
                    fileStream.pipe(zlib.createDeflate()).pipe(res)
                } else if (compress && compression === 'br') {
                    fileStream.pipe(zlib.createBrotliCompress()).pipe(res)
                } else {
                    fileStream.pipe(res)
                }
            } else {
                res.end()
            }
        }
    }
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})