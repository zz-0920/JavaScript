const http = require('http')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs-extra')

// 辅助函数：解析 POST 请求体
const resolvePost = (req) => {
    return new Promise((resolve, reject) => {
        let chunk = ''
        req.on('data', (data) => {
            chunk += data
        })
        req.on('end', () => {
            resolve(JSON.parse(chunk))
        })
    })
}

// 辅助函数：合并文件
const mergeChunks = async (filePath, fileName, size) => {
    let chunksPath = fs.readdirSync(filePath)
    chunksPath.sort((a, b) => {
        return a.split('-').pop() - b.split('-').pop()
    })

    const arr = chunksPath.map((chunkPath, index) => {
        console.log(path.resolve(filePath, chunkPath));

        return pipeStream(
            path.resolve(filePath, chunkPath),
            fs.createWriteStream(path.resolve(filePath, fileName), {
                start: index * size,
                end: (index + 1) * size
            })
        )
    })
    await Promise.all(arr)
}

// 管道流
const pipeStream = (path, writeStream) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path)
        readStream.pipe(writeStream)
        readStream.on('end', () => {  // 流式资源合并完成
            // 移除切片
            fs.unlinkSync(path)
            resolve()
        })
    })
}

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST",
        "access-control-allow-headers": "Content-Type"
    })
    if (req.method === 'OPTIONS') { // 预检请求
        res.status = 200
        res.end()
    }

    if (req.url === '/upload' && req.method === 'POST') {
        // 接受前端传过来的文件
        const form = new multiparty.Form()
        form.parse(req, (err, fields, files) => {
            console.log('Fields:', fields);
            console.log('Files:', files);

            // 检查文件字段是否存在
            if (!files || !files.file || !Array.isArray(files.file) || files.file.length === 0) {
                console.error('File field not found or empty');
                res.statusCode = 400;
                res.end(JSON.stringify({ code: 400, msg: '文件字段不存在或为空' }));
                return;
            }

            // 检查其他必要字段
            if (!fields || !fields.fileName || !fields.chunkName) {
                console.error('Required fields missing');
                res.statusCode = 400;
                res.end(JSON.stringify({ code: 400, msg: '缺少必要字段' }));
                return;
            }

            const [file] = files.file;
            const [fileName] = fields.fileName;
            const [chunkName] = fields.chunkName;

            const chunkDir = path.resolve(__dirname, 'chunks', `${fileName}-chunks`)
            if (!fs.existsSync(chunkDir)) {
                fs.mkdirsSync(chunkDir)
            }
            fs.moveSync(file.path, path.resolve(chunkDir, chunkName))

            res.end(
                JSON.stringify({
                    code: 200,
                    msg: '上传成功'
                })
            )
        })
    }

    if (req.url === '/merge' && req.method === 'POST') {
        const { fileName, size } = await resolvePost(req)
        const filePath = path.resolve(__dirname, 'chunks', `${fileName}-chunks`)
        console.log(filePath);

        await mergeChunks(filePath, fileName, size)
        res.end(
            JSON.stringify({
                code: 200,
                msg: '合并成功'
            })
        )

        //     // 合并文件
        //     let body = ''
        //     req.on('data', chunk => {
        //         body += chunk
        //     })
        //     req.on('end', () => {
        //         const { fileName, chunkNum } = JSON.parse(body)
        //         const chunkDir = path.resolve(__dirname, 'chunks', `${fileName}-chunks`)
        //         const chunkList = fs.readdirSync(chunkDir)
        //         chunkList.sort((a, b) => {
        //             return a.split('-')[1] - b.split('-')[1]
        //         })
        //         fs.writeFileSync(path.resolve(__dirname, fileName), Buffer.concat(chunkList.map(item => fs.readFileSync(path.resolve(chunkDir, item)))))
        //         fs.removeSync(chunkDir)
        //         res.end(
        //             JSON.stringify({
        //                 code: 200,
        //                 msg: '合并成功'
        //             })
        //         )
        //     })
        // }
    }
})

server.listen(3000, () => {
    console.log('server is running on port 3000');
})