import utils, { tools } from './utils.js'

process.stdin.on('data', (data) => {
    const req = JSON.parse(data)
    let result;
    if (req.method === 'tools/call') {  // 调用工具函数
        result = utils[req.params.name](req.params.arguments)
    } else if (req.method in utils) {  // 客户端指明要调用哪一个插件
        result = utils[req.method](req.params)
    } else {
        return
    }

    const res = {
        jsonrpc: '2.0',
        result,
        id: req.id
    }
    process.stdout.write(JSON.stringify(res) + '\n')

})